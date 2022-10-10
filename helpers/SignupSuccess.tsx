import React from "react";

const SignupSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-[80%] mx-auto">
      {/* add gradient green background */}
      <div
        className="flex flex-col gap-5 rounded-lg shadow-lg max-w-screen-sm p-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(0, 255, 0, 0.6) 0%, rgba(0, 255, 0, 0.5) 100%)",
        }}
      >
        <h1 className="font-logo text-4xl font-bold text-gray-800 dark:text-gray-50">
          <span className="text-green-500">Thank you</span> for signing up!
        </h1>
        <p className="text-gray-800 dark:text-gray-50">
          We have sent you an email to verify your account. Please check your
          inbox.
        </p>
      </div>
    </div>
  );
};

export default SignupSuccess;
