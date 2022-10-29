import React from "react";

type Props = {
  email: string;
};

const SignupSuccess = ({ email }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-[90%] mx-auto">
      <div className="flex flex-col gap-5">
        <div className="text-center my-1">
          <i className="fa-regular fa-circle-check scale-150 text-green-500 bg-green-100 p-2 rounded-full"></i>
        </div>
        <h1 data-cy="success-msg" className="text-3xl font-bold text-center text-gray-800">
          Thanks for signing up!
        </h1>
        <p className="text-center text-gray-500">
          We have sent you an email to <b data-cy="success-email">{email}</b> to verify your account.
          Please check your inbox.
        </p>
        <button className="px-4 py-2 mx-auto w-[80%] text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600">
          <a
            href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox"
            target="_blank"
          >
            Open email app
          </a>
        </button>
      </div>
    </div>
  );
};

export default SignupSuccess;
