import React, { useState } from "react";
import { toast } from "react-toastify";
import * as api from "../../api";

import Spinner from "../../components/UI/Spinner";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.forgotPassword(email);
      setLoading(false);
      setEmail("");
      setMessageSent(true);
    } catch (error: any) {
      setLoading(false);
      let errMessage;
      if (error.response) {
        errMessage = error.response.data.message;
      } else if (error.message) errMessage = error.message;
      else errMessage = "Something went wrong, please try again later";
      toast(errMessage, {
        type: "error",
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    // center the entire content using flex
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="dark:bg-gray-700 bg-gray-100 p-10 w-[40%]">
        <h1 className="text-3xl font-bold text-center">Forgot Password</h1>
        {messageSent ? (
          <div className="text-center">
            <p className="text-xl font-semibold">
              A reset password link has been sent to your email
            </p>
            <p className="text-xl font-semibold">
              Please check your email and follow the instructions
            </p>
          </div>
        ) : loading ? (
          <Spinner />
        ) : (
          <form onSubmit={handleSubmit}>
            <label className="block mt-4"> Email </label>
            <input type="email" value={email} onChange={handleEmail} className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
            <button className="block w-full mt-4 bg-blue-500 text-white p-2 rounded-md">Send Reset Link</button>
          </form>
        )}
        </div>
      </div>
  );
};

export default ForgetPassword;
