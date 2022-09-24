import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useSWR from "swr";
import { getEditProfile, updateProfile, uploadImage } from "../../api";
import Loader from "../../components/Loader/Loader";
import { RootState } from "../../store/store";
import Button from "@material-ui/core/Button";
import { MdPhotoCamera } from "react-icons/md";
import { AxiosResponse } from "axios";

const fetchWithToken = (url: string, token: string) =>
  getEditProfile(url, token).then((res) => res.data);

const Edit = () => {
  const { token } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  const [name, setName] = React.useState("");
  const [bio, setBio] = React.useState("");
  // photo is a file
  const [photo, setPhoto] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const [shouldEdit, setShouldEdit] = React.useState(false);

  const { data, error } = useSWR(
    token ? [`api/v1/users/editProfile`, token] : null,
    fetchWithToken,
    {
      onSuccess: (data) => {
        setName(data.data.user.name);
        setBio(data.data.user.bio);
      },
    }
  );
  // ? Error: Rendered more hooks than during the previous render. This may be caused by an accidental early return statement.

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profile-file", photo);
    try{
    const res: AxiosResponse = await uploadImage(formData);
    const url = res.data.result[0].url;
      const modified_url =
        process.env.NEXT_PUBLIC_IMAGE_API_URL + url.replace(/\\/g, "/");
      // console.log(modified_url);
    
      // upload the name, bio and modified_url to the server
      const response = await updateProfile({name, bio, modified_url}, token);
    }catch(err: any){
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
  console.log(name, bio, photo);

  return (
    <div>
      <h1>Edit Profile</h1>
      <div>
        <img
          src={data.data.user.photo}
          alt="profile"
          className="w-20 h-20 rounded-full object-cover"
        />
        <input
          accept="image/*"
          className="hidden"
          id="profile-upload"
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])}
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p></p>
        <input
          type="text"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <button onClick={() => router.push("/user/my-profile")}>Cancel</button>
        <button disabled={name === ""}> Save Changes </button>
      </form>
    </div>
  );
};

export default Edit;
