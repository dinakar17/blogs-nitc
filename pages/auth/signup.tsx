import React, { useEffect } from "react";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { resetError, resetSignUpSuccess, signUp } from "../../store/StatesContainer/auth/AuthSlice";
import {
  ConfirmPasswordValidator,
  PasswordValidator,
} from "../../helpers/Validators/PasswordValidator";
import { EmailValidator } from "../../helpers/Validators/EmailValidator";
import { toast } from "react-toastify";
import SignupSuccess from "../../helpers/SignupSuccess";
import Image from "next/image";

const signup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userStatus = useSelector((state: RootState) => state.user);
  const { signUpSuccess, loading, error } = userStatus;

  useEffect(() => {
    dispatch(resetSignUpSuccess());
  }, []);

  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState("");

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // verify whether the email is valid or not
    // email should end with @nitc.ac.in
    EmailValidator(e.target.value, setEmailError);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    // verify whether the password is valid or not
    // password should be at least 6 characters long and should contain at least one number and one special character and one uppercase letter and one lowercase letter and no spaces
    PasswordValidator(e.target.value, setPasswordError);
  };

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    // verify whether the confirm password is valid or not
    // confirm password should be equal to password
    ConfirmPasswordValidator(password, e.target.value, setConfirmPasswordError);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // verify whether the email, password and confirm password are valid or not
    // if valid, then send a post request to the backend to create a new user
    // if invalid, then display the error message
    // Note: In the case where Google auto fills the email field, we need to verify the email again
    // And also, during the initial render, emailError, passwordError and confirmPasswordError are empty strings. So, we need to verify them again
    // because the email field is not updated when the email is auto filled
    EmailValidator(email, setEmailError);
    PasswordValidator(password, setPasswordError);
    ConfirmPasswordValidator(
      password,
      confirmPassword,
      setConfirmPasswordError
    );
    if (
      emailError === "" &&
      passwordError === "" &&
      confirmPasswordError === ""
    ) {
      dispatch(
        signUp({
          name: userName,
          email,
          password,
          passwordConfirm: confirmPassword,
        })
      );
      // send a post request to the backend to create a new user
    } else {
      // display the error message using toasitfy
      toast.error("Please enter valid details", {
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

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetError());
    }
  }, [error]);

  return (
    <>
      {signUpSuccess ? (
        <SignupSuccess email={email} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen m-0">
          <div className="hidden md:block relative w-full h-full">
            <Image src="/static/signup.jpg" layout="fill" objectFit="cover" />
          </div>
          <div className="flex flex-col justify-center gap-5 w-[80%] md:w-[60%] mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-50">
              Create account
            </h1>
            <div>
              <p className="text-sm">
                {" "}
                Thanks for taking the first step to contribute to the community.
              </p>
              <p className="text-sm">
                {" "}
                Please fill in the form below to create your account.
              </p>
            </div>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                {/* UserName */}
                <label>Username</label>
                <input
                  type="text"
                  // length of the username should be at least 3 characters long
                  minLength={4}
                  required
                  value={userName}
                  placeholder="Enter your name"
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="password">Email</label>
                <input
                  required
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmail}
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <p className="text-red-500 text-sm">{emailError}</p>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password">Password</label>
                <div className="relative">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePassword}
                    className="border w-full border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer">
                    <svg
                      className={`h-6 text-gray-700 ${
                        showPassword ? "hidden" : ""
                      }`}
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <path
                        fill="currentColor"
                        d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                      ></path>
                    </svg>
                    <svg
                      className={`h-6 text-gray-700 ${
                        showPassword ? "" : "hidden"
                      }`}
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <path
                        fill="currentColor"
                        d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <p className="text-red-500 text-sm">{passwordError}</p>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password">Confirm Password</label>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={handleConfirmPassword}
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <p className="text-red-500 text-sm">{confirmPasswordError}</p>
              </div>
              <button
                type="submit"
                className={`bg-blue-500 text-white p-2 rounded-md ${
                  loading ? "bg-blue-200 animate-pulse" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
              <div>
                Already have an account?{" "}
                <a href="/auth/login" className="text-blue-500">
                  Login
                </a>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default signup;
