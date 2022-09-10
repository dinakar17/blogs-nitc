import React from "react";
import * as api from "../../api";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/StatesContainer/auth/AuthSlice";
import {
  ConfirmPasswordValidator,
  PasswordValidator,
} from "../../helpers/Validators/PasswordValidator";
import { EmailValidator } from "../../helpers/Validators/EmailValidator";
import { toast, ToastContainer } from "react-toastify";

const signup = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
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
      // send a post request to the backend to create a new user
      dispatch(
        signUp({ firstName, lastName, email, password, confirmPassword })
      );
    } else {
      // display the error message using toasitfy
      toast.error("Enter valid details", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    // create a register form
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <div className="flex flex-col gap-5 md:w-[60%] mx-auto">
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
          <div className="flex gap-5">
            <div className="flex flex-col gap-2">
              <label>First Name</label>
              <input
                type="text"
                required
                value={firstName}
                placeholder="Enter your name"
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Last Name</label>
              <input
                type="text"
                required
                value={lastName}
                placeholder="Enter your last name"
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Email</label>
            <input
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
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={handleConfirmPassword}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <p className="text-red-500 text-sm">{confirmPasswordError}</p>
          </div>
          <button className="bg-blue-500 text-white p-2 rounded-md">
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
      <div></div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default signup;
