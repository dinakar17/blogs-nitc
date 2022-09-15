import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Spinner from '../../../components/UI/Spinner';

import * as api from '../../../api';
import { GetServerSideProps, NextPage } from 'next';

// Todo: Password Validation on the client side
type Props = {
  token: string;
  error: string;
}

const ResetPassword: NextPage<Props> = (props) => {
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(true);

  const { enqueueSnackbar } = useSnackbar();

  // The reason why 'useEffect()' is used here since 'useRouter()' is not available on the server side and will throw an error 
  useEffect(() => {
    if (props.error) {
      enqueueSnackbar(props.error, { variant: 'error' });
      router.push('/auth/login');
    } else if (props.token) {
      setLoading(false);
    }
  }, [enqueueSnackbar, props.error, props.token, router]);

  const submitHandler = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if(password!==passwordConfirm) throw new Error(`Passwords don't match`)
      // If this request fails, the error will be caught in the catch block
      // If the request is successful, the user will be redirected to the login page
      await api.resetPassword(props.token, password, passwordConfirm);
      enqueueSnackbar('Password reset successful. Please login to continue', {
        variant: 'success',
      });
      router.push('/auth/login');
    } catch (error: any) {
      setLoading(false);
      let errMessage;
      if (error.response) {
        errMessage = error.response.data.message;
      } else if (error.message) errMessage = error.message;
      else errMessage = 'Something went wrong, please try again later';
      enqueueSnackbar(errMessage, { variant: 'error' });
    }
  };

  return (
    <div >
      <div>
        <h1>
          Reset Password
        </h1>
        {loading ? (
          <Spinner />
        ) : (
          <form  noValidate onSubmit={submitHandler}>
            <div>
              <div>
                <input
                  required
                  name='password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <input
                  required
                  name='passwordConfirm'
                  type='password'
                  id='passwordConfirm'
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </div>
            </div>
            <button
              type='submit'
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
const getServerSideProps: GetServerSideProps = async ({query}) => {

  const { token } = query;
  if (!token) {
    return {
      props: { error: 'Invalid token, please try again with a valid token' },
    };
  }

  return { props: { token } };
}

export default ResetPassword;