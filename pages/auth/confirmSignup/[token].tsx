// [token].tsx is the file that is called when the user clicks on the link in the email sent to him/her.
// This file is used to confirm the user's email address.
// The user is redirected to the login page after confirming his/her email address.
// Note: Ran into a problem due to folder name of confirmSignup.tsx

import { useEffect } from "react";
import { useRouter } from "next/router";
import * as api from "../../../api";

import { GetServerSideProps } from "next";
import type { NextPage } from "next";
import { ToastContainer, toast } from "react-toastify";

type Props = {
  error: string;
  success: string;
};

const ConfirmSignup: NextPage<Props> = (props) => {
  const router = useRouter();

  useEffect(() => {
    if (props.error) {
      toast.error(props.error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      router.push("/auth/login");
    } else if (props.success) {
      toast.success(
        "Hurray! Email Confirmation Successful 😊. Please Login to continue",
        {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      router.push("/auth/login");
    }
  }, [props.error, props.success, router]);

  return null;
};

// Note: getServerSideProps is only called on the server side and runs before the page is rendered on the client side (browser)
// Basically, getServerSideProps function runs first and then the page component is rendered with the props returned by getServerSideProps

// Diff between getServerSideProps and getStaticProps: https://www.ohmycrawl.com/getstaticprops-vs-getserversideprops/
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { token } = query;
  console.log(token);

  try {
    if (!token) {
      throw new Error("Invalid token, please try again with a valid token");
    }

    // response - {  data: { success: true, message: "Email confirmed successfully" }, status: 200, statusText: "OK", headers: {…}, config: {…}, request: {…} }
    await api.confirmSignup(token as string);

    return { props: { success: true } };
  } catch (error: any) {
    let errMessage;
    if (error.response) {
      errMessage = error.response.data.message;
    } else if (error.message) errMessage = error.message;
    else errMessage = "Something went wrong, please try again later";

    return {
      props: { error: errMessage },
    };
  }
};

export default ConfirmSignup;