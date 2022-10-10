import React, { useEffect } from "react";
import { AppDispatch,  RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { resetError, signUp } from "../../store/StatesContainer/auth/AuthSlice";
import {
  ConfirmPasswordValidator,
  PasswordValidator,
} from "../../helpers/Validators/PasswordValidator";
import { EmailValidator } from "../../helpers/Validators/EmailValidator";
import { toast} from "react-toastify";
import SignupSuccess from "../../helpers/SignupSuccess";
import Loader from "../../components/UI/Loader/Loader";
import Image from "next/image";

const signup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userStatus = useSelector((state: RootState) => state.user);
  const { signUpSuccess, loading, error } = userStatus;

  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [password, setPassword] = React.useState("");
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
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(resetError());
    }
  }, [error]);

  return (
    <>
      {signUpSuccess ? (
        <SignupSuccess />
      ) : loading ? (
        <Loader />
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
                <input
                  required
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePassword}
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <p className="text-red-500 text-sm">{passwordError}</p>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password">Confirm Password</label>
                <input
                  required
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={handleConfirmPassword}
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <p className="text-red-500 text-sm">{confirmPasswordError}</p>
              </div>
              <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                Register
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
