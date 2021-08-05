import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Grommet } from 'grommet';
import { ApolloProvider } from '@apollo/client';
import { ReactKeycloakProvider } from '@react-keycloak/web';

import { FontsConsumer, FontsProvider } from './contexts/fontContext';
import { theme } from './config/grommetConfig';
import { apolloClient } from './config/apolloConfig';
import keycloak from './config/keycloakConfig';
import { KeycloakUserProvider } from './contexts/keycloakUserContext';
import { GameProvider } from './contexts/gameContext';
import { McContentProvider } from './contexts/mcContentContext';

interface RootProps {
  children: JSX.Element;
}

/**
 * This component wraps <App/> with all the Providers it needs.
 */
const Root: FC<RootProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <ApolloProvider client={apolloClient}>
        <FontsProvider>
          <FontsConsumer>
            {(context) => {
              // The Grommet theme needs the font values, so using the Consumer here immediately.
              return (
                <Grommet theme={theme(context.vtksReady)} full>
                  <ReactKeycloakProvider
                    authClient={keycloak}
                    initOptions={{
                      onLoad: 'login-required',
                      checkLoginIframe: false,
                    }}
                  >
                    <GameProvider>
                      <McContentProvider>
                        <KeycloakUserProvider>{children}</KeycloakUserProvider>
                      </McContentProvider>
                    </GameProvider>
                  </ReactKeycloakProvider>
                </Grommet>
              );
            }}
          </FontsConsumer>
        </FontsProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default Root;
