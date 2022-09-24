import { useRouter } from 'next/router';
import React, {useEffect, FC} from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Loader from '../Loader/Loader';

type Props = {
    children: React.ReactNode;
    protectedRoutes: string[];
}

const PrivateRoute: FC<Props> = (props) => {
  const { children, protectedRoutes } = props;
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.user);

  const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;

  useEffect(() => {
    if (!token && pathIsProtected) {
      router.push('/auth/login');
    }
  }, [token, pathIsProtected]);

  // if (!token && pathIsProtected) {
  //   return <Loader />;
  // }

  return (
    <>
      {children}
    </>
  )
}

export default PrivateRoute;