import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// https://fkhadra.github.io/react-toastify/introduction
import * as api from "../../api";
import { EmailValidator } from "../../helpers/Validators/EmailValidator";
import { signIn } from "../../store/StatesContainer/auth/AuthSlice";
import { AppDispatch, RootState } from "../../store/store";

const login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const userInfo = useSelector((state: RootState) => state.user);
  const { authData, loading, error } = userInfo;

  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

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
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // verify whether the email and password are valid or not
    // if valid, then redirect to the home page
    // if invalid, then show the error message
    if (emailError === "" && passwordError === "") {
      // redirect to the home page
      // Todo: google auto filling causing login successful
      const signInDetails = { email, password };
      // Note: createAsyncThunk accepts only one argument (payload) because it is a thunk function
      dispatch(signIn(signInDetails));
    } else {
      // show the error message
      toast.error("email or password is invalid 😓", {
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
    if (!loading && authData) {
    router.push("/");
    }
  }, [authData, loading, router]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [error]);

  return (
    // create two columns using grid and make them responsive as well
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-screen font-default">
          {/* Grid Block 1 */}
          <div className="flex flex-col justify-center w-[60%] mx-auto gap-5">
            <h1 className="text-4xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-600">
              Welcome Back! Please enter your details
            </p>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label>Email</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={handleEmail}
                  placeholder="Enter your email"
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <p className="text-red-500 text-sm">
                  {emailError && emailError}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <label>Password</label>
                <input
                  required
                  placeholder="Enter your password"
                  value={password}
                  type="password"
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  onChange={handlePassword}
                />
                <p className="text-red-500 text-sm">
                  {passwordError && passwordError}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex">
                  <input type="checkbox" className="mr-2" />
                  <p>Remember me</p>
                </div>
                <p className="text-blue-500">
                  <Link href="/auth/forgotPassword">Forgot Password?</Link>
                </p>
              </div>
              <button className="bg-blue-500 text-white p-2 rounded-md">
                Login
              </button>
            </form>
            {/* Don't have an account? Sign up for free */}
            <div className="flex justify-center items-center gap-2">
              <p>Don't have an account?</p>
              {/* bottom decorator for "sign up for free" Link */}

              <a href="/auth/signup" className="text-blue-500">
                Sign up for free
              </a>
            </div>
          </div>
          {/* Grid Block 2 */}
          <div className="hidden md:flex flex-col justify-center items-center w-full h-full relative">
            <Image
              src="/static/login-intro.jpg"
              layout="fill"
              className="object-cover"
            />
            {/* Create a Glassmorphic card of width 300px and height 300px with some content in it*/}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gray-50/30 rounded-2xl flex flex-col justify-center items-center gap-4 p-4">
              <h1 className="text-2xl font-bold text-gray-800">Welcome to</h1>
              <h1 className="text-2xl font-bold text-gray-800">DevSpace</h1>
              <p className="text-gray-600">
                A place where you can share your knowledge with the world
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default login;
