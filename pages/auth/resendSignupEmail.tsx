import { useState } from "react";

import Link from "next/link";
import * as api from "../../api/index";
import { toast } from "react-toastify";
import { EmailValidator } from "../../helpers/Validators/EmailValidator";

const ResendSignUpToken = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    EmailValidator(e.target.value, setEmailError);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.resendSignUpToken(email);
      setLoading(false);
      setMessageSent(true);
    } catch (error: any) {
      setLoading(false);
      let errMessage;
      if (error.response) {
        errMessage = error.response.data.message;
      } else if (error.message) errMessage = error.message;
      else errMessage = "Something went wrong, please try again later";
      toast.error(errMessage);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-[80%] lg:w-[30%] mx-auto">
        {messageSent ? (
          <div className="flex flex-col items-center gap-5 w-full">
            <div>
              <i className="fa-regular fa-envelope scale-150 rounded-full p-2 bg-blue-100 text-blue-500" />
            </div>
            <h2 className="text-2xl font-semibold text-center">
              Check your email
            </h2>
            <div>
              <p className="text-center">
                {" "}
                We sent a confirmation SignUp email to{" "}
              </p>
              <p className="text-center font-medium"> {email}</p>
            </div>
            <button className="px-4 py-2 w-[80%] text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600">
              <a
                href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox"
                target="_blank"
              >
                {" "}
                Open email app{" "}
              </a>
            </button>
            <Link href="/auth/login">
              <a className="text-blue-500">
                <i className="fa-solid fa-arrow-left scale-125 mr-2" />
                Back to Sign In
              </a>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-5">
            <div>
              <i className="fa-solid fa-key scale-150 text-blue-500 bg-blue-100 p-2 rounded-full"></i>
            </div>
            <h2 className="text-3xl">Resend Verification Email</h2>
            <form onSubmit={handleSubmit} className="w-full">
              <label className="block mt-4 font-medium"> Email </label>
              <input
                type="email"
                value={email}
                onChange={handleEmail}
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                required
              />
              {emailError && (
                <p className="text-red-500 text-sm"> {emailError} </p>
              )}
              <button
                disabled={emailError || loading ? true : false}
                className={`block w-full mt-4 text-white p-2 rounded-md ${
                  emailError || loading ? "bg-blue-200" : "bg-blue-500"
                }`}
              >
                Send Reset Link
              </button>
            </form>
            <Link href="/auth/login">
              <a className="text-blue-500">
                <i className="fa-solid fa-arrow-left scale-125 mr-2" />
                Back to Sign In
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResendSignUpToken;
