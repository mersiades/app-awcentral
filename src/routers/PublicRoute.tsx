import { FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Route, Redirect } from 'react-router-dom';

interface PublicRootProps {
  component: any;
  path: string;
  exact?: boolean;
}

const PublicRoute: FC<PublicRootProps> = ({
  component: Component,
  ...rest
}) => {
  const { isAuthenticated } = useAuth0();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Redirect to="/menu" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
