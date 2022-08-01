import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Grommet } from 'grommet';
import { Auth0Provider, Auth0ProviderOptions } from '@auth0/auth0-react';

import { FontsConsumer, FontsProvider } from './contexts/fontContext';
import { theme } from './config/grommetConfig';
import { GameProvider } from './contexts/gameContext';
import { McContentProvider } from './contexts/mcContentContext';
import { UserProvider } from './contexts/userContext';
import { AuthApolloProvider } from './contexts/authApolloContext';

interface RootProps {
  children: JSX.Element;
}

// @ts-ignore istanbul ignore else
const isCypress = window.Cypress ? true : false;

const auth0Options: Auth0ProviderOptions = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN || '',
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID || '',
  redirectUri: window.location.origin,
  audience: 'https://graphql.aw-central.com',
  cacheLocation: isCypress ? 'localstorage' : 'memory',
};

/**
 * This component wraps <App/> with all the Providers it needs.
 */
const Root: FC<RootProps> = ({ children }) => {
  return (
    <Auth0Provider {...auth0Options}>
      <BrowserRouter>
        <AuthApolloProvider>
          <FontsProvider>
            <FontsConsumer>
              {(context) => {
                console.log('auth0Options', auth0Options);
                console.log('window.location.origin', window.location.origin);
                console.log('window.location.origin', window.location.pathname);
                // The Grommet theme needs the font values,
                // so using the Consumer here immediately.
                return (
                  <Grommet theme={theme(context.vtksReady)} full>
                    <UserProvider>
                      <GameProvider>
                        <McContentProvider>{children}</McContentProvider>
                      </GameProvider>
                    </UserProvider>
                  </Grommet>
                );
              }}
            </FontsConsumer>
          </FontsProvider>
        </AuthApolloProvider>
      </BrowserRouter>
    </Auth0Provider>
  );
};

export default Root;
