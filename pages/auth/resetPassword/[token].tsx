import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import * as api from "../../../api";
import { GetServerSideProps, NextPage } from "next";
import { toast } from "react-toastify";
import Loader from "../../../components/UI/Loader/Loader";
import { PasswordValidator } from "../../../helpers/Validators/PasswordValidator";

// Todo: Password Validation on the client side
type Props = {
  token: string;
  error: string;
};

const ResetPassword: NextPage<Props> = (props) => {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // The reason why 'useEffect()' is used here since 'useRouter()' is not available on the server side and will throw an error
  useEffect(() => {
    if (props.error) {
      toast.error(props.error);
      router.push("/auth/login");
    } else if (props.token) {
      setLoading(false);
    }
  }, [props.error, props.token, router]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (password !== passwordConfirm)
        throw new Error(`Passwords do not match`);
      PasswordValidator(password, setPasswordError);
      if (passwordError) throw new Error(passwordError);
      await api.resetPassword(props.token, password, passwordConfirm);
      setLoading(false);
      setPassword("");
      setPasswordConfirm("");
      setResetSuccess(true);
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

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    PasswordValidator(e.target.value, setPasswordError);
  };

  return (
    <div className="flex flex-col items-center min-h-screen justify-center">
      <div className="w-[80%] lg:w-[30%] p-5 flex flex-col gap-5">
        {resetSuccess ? (
          <>
            <div className="text-center my-1">
              <i className="fa-regular fa-circle-check scale-150 text-green-500 bg-green-100 p-2 rounded-full"></i>
            </div>
            <h1 className="text-2xl font-semibold text-center">
              Password reset
            </h1>
            <div className="text-center">
              <p className="text-gray-600">
                You password has been successfully reset.
              </p>
              <p className="text-gray-600">Click below to log in magically.</p>
            </div>
            <button
              type="submit"
              className="block w-full mt-4 bg-blue-500 text-white p-2 rounded-md"
              onClick={() => router.push("/auth/login")}
            >
              Continue
            </button>
          </>
        ) : loading ? (
          <Loader />
        ) : (
          <>
            <div className="text-center my-1">
              <i className="fa-solid fa-key scale-150 text-blue-500 bg-blue-100 p-2 rounded-full"></i>
            </div>
            <h1 className="text-2xl font-semibold text-center">
              Reset Password
            </h1>
            <p className="text-gray-600">
              You new password must be different to previously used passwords
            </p>
            <form
              noValidate
              onSubmit={submitHandler}
              className="flex flex-col gap-2"
            >
              <label htmlFor="password" className="font-medium text-gray-600">
                New Password
              </label>
              <input
                required
                placeholder="Enter your new password"
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                onChange={handlePassword}
              />
              {passwordError && (
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}
              <label
                htmlFor="passwordConfirm"
                className="font-medium text-gray-600"
              >
                Confirm Password
              </label>
              <input
                required
                placeholder="Confirm your new password"
                name="passwordConfirm"
                type="password"
                id="passwordConfirm"
                value={passwordConfirm}
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              <button
                type="submit"
                className="block w-full mt-4 bg-blue-500 text-white p-2 rounded-md"
              >
                Reset Password
              </button>
            </form>
          </>
        )}
        <Link href="/auth/login">
          <a className="text-center text-blue-500">
            <i className="fa-solid fa-arrow-left scale-125 mr-2" />
            Back to Sign In
          </a>
        </Link>
      </div>
    </div>
  );
};

// Note: One should export 'getServerSideProps' from the page that is being rendered on the server side
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { token } = query;
  if (!token) {
    return {
      props: { error: "Invalid token, please try again with a valid token" },
    };
  }

  return { props: { token } };
};

export default ResetPassword;
