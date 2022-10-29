import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// https://fkhadra.github.io/react-toastify/introduction
import { EmailValidator } from "../../helpers/Validators/EmailValidator";
import { resetError, signIn } from "../../store/StatesContainer/auth/AuthSlice";
import { AppDispatch, RootState } from "../../store/store";

const login = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { authData, token, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

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
    if (emailError === "") {
      // redirect to the home page
      // Todo: google auto filling causing login successful
      const signInDetails = { email, password };
      // Note: createAsyncThunk accepts only one argument (payload) because it is a thunk function
      try {
        dispatch(signIn(signInDetails));
      } catch (error: any) {
        // This catch block will never be executed because the error is handled in the createAsyncThunk
        toast.error(error.message);
      }
    } else {
      // Frontend validation failed
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

  // useEffect(() => {
  //   if (!loading && authData) {
  //     router.push("/");
  //   }
  // }, [authData, loading, router]);

  useEffect(() => {
    if (token && authData?.photo) {
      router.push("/");
    } else if (token && !authData?.photo) {
      router.push("/user/edit-profile");
    }
  }, [token, loading, router]);

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
      dispatch(resetError());
    }
  }, [error]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-screen font-default">
        {/* Grid Block 1 */}
        <div className="flex flex-col justify-center w-[90%] md:w-[60%] mx-auto gap-5">
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
                data-cy="login-email"
              />
              <p className="text-red-500 text-sm" data-cy="login-email-error">
                {emailError}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <label>Password</label>
              <div className="relative">
                <input
                  required
                  placeholder="Enter your password"
                  value={password}
                  type={showPassword ? "text" : "password"}
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  onChange={handlePassword}
                  data-cy="login-password"
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
                      data-cy="login-password-show"
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
            <button
              data-cy="login-submit"
              disabled={
                loading || !email || !password || emailError ? true : false
              }
              className={`bg-blue-500 text-white p-2 rounded-md ${
                loading && "bg-blue-300"
              } ${!email || !password || emailError ? "bg-blue-300" : ""}`}
            >
              {loading ? "Loading..." : "Login"}
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
          <div>
            <Link href="/auth/resendSignupEmail">
              <a className="text-blue-500">Resend Sign up Email</a>
            </Link>
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
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl flex flex-col justify-center items-center gap-4 p-4 text-white/90">
            <h2 className="text-2xl font-bold">
              Here's a motivational quote for you to get started
            </h2>
            <p>
              If something is important enough, you do it even if the odds are
              not in your favor.{" "}
            </p>
            <p className="font-bold">- Elon Musk</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default login;
