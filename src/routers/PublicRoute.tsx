import { FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, Outlet } from 'react-router-dom';

interface PublicRootProps {
}

const PublicRoute: FC<PublicRootProps> = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <Navigate to="/menu" /> : <Outlet/>

};

export default PublicRoute;
