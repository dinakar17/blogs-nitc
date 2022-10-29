// [token].tsx is the file that is called when the user clicks on the link in the email sent to him/her.
// This file is used to confirm the user's email address.
// The user is redirected to the login page after confirming his/her email address.

import type { NextPage } from "next";
import { useEffect } from "react";
import Router from "next/router";
import { GetServerSideProps } from "next";
import { toast } from "react-toastify";

import * as api from "../../../api";

type Props = {
  error: string;
  success: string;
};

const ConfirmSignUp: NextPage<Props> = (props) => {
  // Note: router inside useEffect is not working as expected
  useEffect(() => {
    if (Router.isReady) {
      if (props.error) {
        console.log(props.error);
        toast.error(props.error, {
          position: "top-center",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        Router.push("/auth/login");
      } else if (props.success) {
        toast.success(
          "Hurray! Email Confirmation Successful 😊. Please Login to continue",
          {
            position: "top-center",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: "emailConfirmationSuccess",
          }
        );
        Router.push("/auth/login");
      }
    }
  }, [props.error, props.success, Router]);

  return null;
};

// Note: getServerSideProps is only called on the server side and runs before the page is rendered on the client side (browser)
// Basically, getServerSideProps function runs first and then the page component is rendered with the props returned by getServerSideProps

// Diff between getServerSideProps and getStaticProps: https://www.ohmycrawl.com/getstaticprops-vs-getserversideprops/
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { token } = query;

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

export default ConfirmSignUp;
