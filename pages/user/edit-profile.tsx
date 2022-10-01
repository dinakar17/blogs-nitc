import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useSWR from "swr";
import {
  deleteImage,
  getEditProfile,
  updateProfile,
  uploadImage,
} from "../../api";
import Loader from "../../components/UI/Loader/Loader";
import { AppDispatch, RootState } from "../../store/store";
import Button from "@material-ui/core/Button";
import { MdPhotoCamera } from "react-icons/md";
import { AxiosResponse } from "axios";
import { updateAuthData } from "../../store/StatesContainer/auth/AuthSlice";

// Todo: @material-tailwind/react is too heavy, find a better alternative
import Input from "@material-tailwind/react/components/Input";
import TextArea from "@material-tailwind/react/components/Textarea";

const fetchWithToken = (url: string, token: string) =>
  getEditProfile(url, token).then((res) => res.data);

const Edit = () => {
  const { token } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [email, setEmail] = React.useState("");

  // here blob means binary large object similar to File object. It is used to store binary data.
  const [photo, setPhoto] = React.useState<File | null | Blob>(null);
  const [preview, setPreview] = React.useState<string | ArrayBuffer | null>(
    null
  );
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (!photo) {
      setPreview(null);
      return;
    }

    // URL.createObjectURL() creates a DOMString containing a URL representing the object given in the parameter
    const objectUrl = URL.createObjectURL(photo);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  const { data, error } = useSWR(
    token ? [`api/v1/users/editProfile`, token] : null,
    fetchWithToken,
    {
      onSuccess: (data) => {
        setName(data.data.user.name);
        setBio(data.data.user.bio);
        setEmail(data.data.user.email);
      },
    }
  );
  // ? Error: Rendered more hooks than during the previous render. This may be caused by an accidental early return statement.

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      let modified_url: string = "";
      if (photo) {
        const formData = new FormData();
        formData.append("profile-file", photo as Blob);
        const photoUrl = data.data.user.photo.replace(
          process.env.NEXT_PUBLIC_IMAGE_API_URL,
          ""
        );
        await deleteImage(`filePath=${photoUrl}`);

        const res: AxiosResponse = await uploadImage(formData);
        const url = res.data.result[0].url;
        modified_url =
          process.env.NEXT_PUBLIC_IMAGE_API_URL + url.replace(/\\/g, "/");
      }
      let dataToUpdate = {
        name,
        bio,
      };
      if (modified_url) {
        // @ts-ignore
        dataToUpdate = { ...dataToUpdate, photo: modified_url };
      }
      const updatedResponse = await updateProfile(dataToUpdate, token);
      // Note: updatedResponse.data is AxiosResponse and remaining is the data from the response
      dispatch(updateAuthData(updatedResponse.data.data.user));

      setLoading(false);
      toast.success("Profile updated successfully");
    } catch (err: any) {
      setLoading(false);
      toast.error(err.message);
      console.log(err);
    }
  };

  if (!data) return <Loader />;
  if (error) {
    toast("Something went wrong, Please try again later", {
      type: "error",
    });
  }

  //   console.log(data);

  return (
    <div className="w-[90%] mx-auto min-h-screen flex flex-col my-10">
      <h1 className="text-4xl font-bold text-center my-10">Edit Profile</h1>
      {/* User's Image */}
      <div className="grid grid-cols-2">
        <div className="flex flex-col justify-center items-center gap-5">
          <img
            src={
              preview
                ? preview
                : data.data.user.photo
                ? data.data.user.photo
                : null
            }
            alt="profile"
            className="w-40 h-40 rounded-full object-cover"
          />
          <input
            accept="image/*"
            className="hidden"
            id="profile-upload"
            type="file"
            onChange={(e) => {
              if (e.target.files) setPhoto(e.target.files[0]);
            }}
          />
          <label htmlFor="profile-upload">
            <Button
              variant="contained"
              color="primary"
              component="span"
              startIcon={<MdPhotoCamera />}
            >
              Upload Photo
            </Button>
          </label>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            label="Username"
            variant="standard"
            value={name}
            style={{ fontFamily: "Inter" }}
            onChange={(e) => setName(e.target.value)}
          />
          <p>{email}</p>
          <TextArea
            label="Your Bio"
            style={{ fontFamily: "Inter" }}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <div className="flex justify-center gap-10">
            <Button
              variant="contained"
              color="primary"
              style={{ fontFamily: "Inter" }}
              onClick={() => router.push("/user/my-profile")}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              // set shadow to blue on hover
              className="hover:shadow-lg"
              type="submit"
              disabled={name === "" || loading}
              // disabled={name === "" || loading}
            >
              {" "}
              {loading ? "Saving changes..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
