import React from "react";

const SignupSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-50">
        Thanks for signing up!
      </h1>
      <p className="text-sm">
        {" "}
        Please check your email to verify your account.
      </p>
    </div>
  );
};

export default SignupSuccess;
