import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import { NextPage } from "next";
import { AxiosResponse } from "axios";
import * as api from "../../../api";
import SunEditorCore from "suneditor/src/lib/core";

import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { setPost } from "../../../store/StatesContainer/post/PostSlice";
import { setFilter } from "../../../store/StatesContainer/filters/FilterSlice";
import Loader from "../../../components/UI/Loader/Loader";
import { toast } from "react-toastify";
const Editor = dynamic(() => import("../../../components/Editor/Editor"));

const fetcher = (url: string, slug: string) =>
// res.data = {success: true, data: doc}
  api.getSpecificPost(url, slug).then((res: AxiosResponse) => res.data);

const EditBlog: NextPage = () => {
  const { title, description, featuredImage, content, featuredImageURL } = useSelector(
    (state: RootState) => state.post
  );
  const {branch, semester, subject} = useSelector((state: RootState) => state.filter);
  const {token} = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { slug } = router.query;

  const editor = useRef<SunEditorCore>(null);

  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // | Step 1: Fetch the blog from the database
  const { data, error } = useSWR(
    // here [slug] means that we're passing the slug as a parameter to fetcher function and it will be available as the second argument in fetcher function
    slug ? ['/api/v1/blogs/slug/', slug] : null,
    // fetcher url is passed as an argument to the fetcher function i.e., url = `api/v1/blogs/slug/${slug}`
    fetcher,
    {
      // data === {success: true, data: doc}
      onSuccess: (data) => {
        dispatch(setPost(data.data));
        setTags(data.data.tags);
        dispatch(setFilter(data.data));
      },
    }
  );
  // | Step 2: If there is an error, show the error message to the user through toast
  useEffect(() => {
    if (error) {
      let errMessage;
      if (error.response) {
        errMessage = error.response.data.message;
      } else errMessage = "Something went wrong, Please try again later";

      toast(errMessage, {
        type: "error",
      });
    }
  }, [error]);

  // | Step 3: If the data is not yet available, show the spinner
  if (!data) return <Loader />;

  const saveContent = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    // Todo: Check if the featured image is changed or not and then send the request accordingly
      

    const toSaveData = {
      title,
      description,
      featuredImage: featuredImageURL,
      branch,
      semester,
      subject,
      tags,
      content: content,
    };
    try {
      setLoading(true);
      await api.updatePost(data.data._id, toSaveData, config);
      setLoading(false);
      toast.success("Blog updated successfully");
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.message);
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
      // enqueueSnackbar(`Blog Deleted`, { variant: "success" });
      router.push(`/user/myBlogs`);
    } catch (error: any) {
      setLoading(false);
      handleDeleteDialogClose();
      // enqueueSnackbar(`${error.response.data.message}`, { variant: "error" });
    }
  };

  return (
    <>
      <Head>
        <title>Edit blog</title>
        <meta name="description" content="Edit blog page for Blog App" />
      </Head>
      <h1 style={{ margin: "1rem 0 2rem 0" }}>Edit Blog</h1>
      {loading ? <Loader /> : null}
      <Editor
        title={title}
        description={description}
        featuredImage={featuredImage}
        branch={branch}
        semester={semester}
        tags={tags}
        setTags={setTags}
        saveContent={saveContent}
        editor={editor}
        setDraft={setDraft}
        loading={loading}
        editorContent={content}
        editorForUpdate={true}
      />
      {/* Delete and Save Buttons */}
      {/* <Dialog
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
      </Dialog> */}
    </>
  );
};

export default EditBlog;

/*

The service worker navigation preload request was cancelled before 'preloadResponse' settled. If you intend to use 'preloadResponse', use waitUntil() or respondWith() to wait for the promise to settle.
*/
