import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// ? https://mui.com/material-ui/guides/minimizing-bundle-size/
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Icon from "@mui/material/Icon";
import useSWR from "swr";

import dayjs from "dayjs";

import {
  deleteImage,
  getEditProfile,
  updateProfile,
  uploadImage,
} from "../../api";
import Loader from "../../components/UI/Loader/Loader";
import { AppDispatch, RootState } from "../../store/store";
import { updateAuthData } from "../../store/StatesContainer/auth/AuthSlice";

const fetchWithToken = (url: string, token: string) =>
  getEditProfile(url, token).then((res) => res.data);

const Edit = () => {
  const { authData, token } = useSelector((state: RootState) => state.user);
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
    if (token && !authData?.photo) {
      toast("Please update your profile", {
        type: "info",
        toastId: "updatePhoto",
      });
    }
  }, [token, authData]);

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
      revalidateOnFocus: false,
    }
  );
  // ? Error: Rendered more hooks than during the previous render. This may be caused by an accidental early return statement.

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const axiosConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_IMAGE_SERVER_KEY}`,
      },
    };

    try {
      let modified_url: string = "";
      if (photo) {
        const formData = new FormData();
        formData.append("profile-file", photo as Blob);
        // Delete old image only if user has already uploaded a photo before
        if (data.data.user.photo) {
          const photoUrl = data.data.user.photo.split("/").pop();
          await deleteImage(photoUrl, axiosConfig);
        }
        const res: any = await uploadImage(formData, axiosConfig);
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

      router.push("/user/my-profile");

      setLoading(false);
      toast.success("Profile updated successfully");
    } catch (err: any) {
      setLoading(false);
      let errMessage = "Something went wrong, Please try again later";
      if (error) {
        if (error.response.data) {
          errMessage = error.response.data.message;
        }
      }
      toast.error(errMessage);
    }
  };

  useEffect(() => {
    let errMessage;
    if (error) {
      if (error.response.data) {
        errMessage = error.response.data.message;
      } else errMessage = "Something went wrong, Please try again later";
    }
    toast.error(errMessage);
  }, [error]);

  // Todo: Change return type to skeleton loader
  if (error) return null;
  if (!data) return <Loader />;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const modifiedFileName = `${authData?._id}-${dayjs().format(
        "DD-MM-YYYY-HH-mm-ss"
      )}-${file.name}`;

      const modifiedFile = new File([file], modifiedFileName, {
        type: file.type,
      });

      setPhoto(modifiedFile);
    }
  };

  return (
    <div className="w-[90%] mx-auto min-h-screen flex flex-col my-10">
      <h1 className="text-4xl font-bold text-center my-10">Edit Profile</h1>
      {/* User's Image */}
      <div className="grid lg:grid-cols-2 space-y-10">
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
            onChange={handleImageChange}
          />
          <label htmlFor="profile-upload">
            <Button
              variant="contained"
              color="primary"
              component="span"
              startIcon={<Icon className="fas fa-upload" />}
            >
              Upload Photo
            </Button>
          </label>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <TextField
            required
            id="standard-basic"
            label="User Name"
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p>{email}</p>
          <TextField
            id="outlined-multiline-static"
            label="Your Bio"
            multiline
            rows={2}
            value={bio}
            className="dark:text-white"
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
              className="hover:shadow-lg"
              type="submit"
              disabled={name === "" || loading}
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

// Todo: Fix dark mode issues
// Todo: disabled button on loading
// Todo: Add Material UI Buttons (optional)
