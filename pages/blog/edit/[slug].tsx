import { useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import Spinner from "../../../components/UI/Spinner";
import { NextPage } from "next";
import { AxiosResponse } from "axios";
import * as api from "../../../api";
import SunEditorCore from "suneditor/src/lib/core";

import dynamic from "next/dynamic";
const Editor = dynamic(() => import("../../../components/Editor/Editor"));


const fetcher = (url: string) =>
  api.getSpecificPost(url).then((res: AxiosResponse) => res.data);

const EditBlog: NextPage = () => {
  const editor = useRef<SunEditorCore>(null);
  const router = useRouter();
  const { slug } = router.query;

  const { enqueueSnackbar } = useSnackbar();

  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editFeaturedImage, setEditFeaturedImage] = useState("");
  const [editBranch, setEditBranch] = useState("");
  const [editTags, setEditTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // | Step 1: Fetch the blog from the database
  const { data, error } = useSWR(
    // Doubt: is '/api' and 'api' same? 
    slug ? `/api/v1/blogs/slug/${slug}` : null,
    // fetcher url is passed as an argument to the fetcher function i.e., url = `api/v1/blogs/slug/${slug}`
    fetcher
  );
  // | Step 2: If there is an error, show the error message to the user through toast
  if (error) {
    let errMessage;
    if (error.response) {
      errMessage = error.response.data.message;
    } else errMessage = "Something went wrong, Please try again later";

    enqueueSnackbar(errMessage, { variant: "error" });
    return null;
  }

  // | Step 3: If the data is not yet available, show the spinner
  if (!data) return <Spinner />;

  const updateData = () => {
    const { title, description, featuredImage, branch, tags, content } =
      data.data; // ? Not sure if this is the right way to do it
    setEditTitle(title);
    setEditDescription(description);
    setEditFeaturedImage(featuredImage);
    setEditBranch(branch);
    setEditTags(tags);
    // Todo: Set the content of the editor
  };

  updateData();

  const handleTags = (tags: string[]) => {
    setEditTags(tags);
  };

  const handleSelection = (branch: any) => {
    setEditBranch(branch);
  };

  const saveContent = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const toSaveData = {
      title : editTitle,
      description: editDescription,
      branch: editBranch,
      featuredImage: editFeaturedImage,
      tags: editTags,
      content: content,
    };
    try {
      setLoading(true);
      await api.updatePost(data.data._id, toSaveData, config);
      setLoading(false);
      enqueueSnackbar(`Blog Updated`, { variant: "success" });
    } catch (error: any) {
      setLoading(false);
      enqueueSnackbar(`${error.response.data.message}`, { variant: "error" });
    }
  };

  const handleDeleteDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDialogOpen(false);
  };

  const onDeleteHandler = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      setLoading(true);
      await api.deletePost(data.data._id, config);
      setLoading(false);
      handleDeleteDialogClose();
      enqueueSnackbar(`Blog Deleted`, { variant: "success" });
      router.push(`/user/myBlogs`);
    } catch (error: any) {
      setLoading(false);
      handleDeleteDialogClose();
      enqueueSnackbar(`${error.response.data.message}`, { variant: "error" });
    }
  };

  return (
    <>
      <Head>
        <title>Edit blog</title>
        <meta name="description" content="Edit blog page for Blog App" />
      </Head>
      <h1 style={{ margin: "1rem 0 2rem 0" }}>Edit Blog</h1>
      {loading ? <Spinner /> : null}
      <Editor
        title={editTitle}
        setTitle={setEditTitle}
        description={editDescription}
        setDescription={setEditDescription}
        featuredImage={editFeaturedImage}
        setFeaturedImage={setEditFeaturedImage}
        branch={editBranch}
        tags={editTags}
        handleTags={handleTags}
        handleSelection={handleSelection}
        saveContent={saveContent}
        editor={editor}
      />
      {/* Delete and Save Buttons */}
      <Dialog
        open={dialogOpen}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to delete this blog?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting a blog is an irreversible operation. Please perform this
            action with caution.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onDeleteHandler} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditBlog;
