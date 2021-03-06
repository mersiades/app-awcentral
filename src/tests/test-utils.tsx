import React from 'react';
import { act, render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { Grommet } from 'grommet';

import { KeycloakUser } from '../@types';
import { mockKeycloakStub } from '../../__mocks__/@react-keycloak/web';
import { FontsProvider } from '../contexts/fontContext';
import { KeycloakUserProvider } from '../contexts/keycloakUserContext';
import { theme } from '../config/grommetConfig';
import { mockKeycloakUser1 } from './mocks';
import { GameProvider } from '../contexts/gameContext';
import { Character, Game } from '../@types/dataInterfaces';
import { InMemoryCache } from '@apollo/client';
import { McContent } from '../@types/staticDataInterfaces';
import { McContentProvider } from '../contexts/mcContentContext';
import wait from 'waait';

interface CustomRenderOptions {
  isAuthenticated?: boolean;
  vtksReady?: boolean;
  crustReady?: boolean;
  apolloMocks?: MockedResponse[];
  keycloakUser?: KeycloakUser;
  injectedGame?: Game;
  injectedGameId?: string;
  injectedUserId?: string;
  injectedCharacter?: Character;
  cache?: InMemoryCache;
  injectedMcContent?: McContent;
}

// All the providers for unit tests
const ComponentProviders = ({
  children,
  isAuthenticated = true,
  vtksReady = true,
  crustReady = true,
  apolloMocks = [],
  keycloakUser = mockKeycloakUser1,
  injectedGame,
  injectedGameId,
  injectedUserId,
  injectedCharacter,
  injectedMcContent,
  cache,
}: any) => {
  return (
    <BrowserRouter>
      <MockedProvider mocks={apolloMocks} addTypename={false} cache={cache}>
        <FontsProvider isVtksReady={vtksReady} isCrustReady={crustReady}>
          <Grommet theme={theme(vtksReady)} full>
            <ReactKeycloakProvider
              authClient={mockKeycloakStub(isAuthenticated)}
              initOptions={{
                onLoad: 'login-required',
              }}
            >
              <GameProvider
                injectedGame={injectedGame}
                injectedGameId={injectedGameId}
                injectedUserId={injectedUserId}
                injectedCharacter={injectedCharacter}
              >
                <McContentProvider injectedMcContent={injectedMcContent}>
                  <KeycloakUserProvider keycloakUser={{ ...keycloakUser }}>
                    {children}
                  </KeycloakUserProvider>
                </McContentProvider>
              </GameProvider>
            </ReactKeycloakProvider>
          </Grommet>
        </FontsProvider>
      </MockedProvider>
    </BrowserRouter>
  );
};

// All the providers for App, for integration tests
const AppProviders = ({
  children,
  isAuthenticated = true,
  vtksReady = true,
  crustReady = true,
  apolloMocks = [],
  keycloakUser = mockKeycloakUser1,
  injectedGame,
  injectedUserId,
  injectedCharacter,
  injectedMcContent,
}: any) => {
  return (
    <BrowserRouter>
      <MockedProvider mocks={apolloMocks}>
        <FontsProvider isVtksReady={vtksReady} isCrustReady={crustReady}>
          <Grommet theme={theme(vtksReady)} full>
            <ReactKeycloakProvider
              authClient={mockKeycloakStub(isAuthenticated)}
              initOptions={{
                onLoad: 'login-required',
              }}
            >
              <GameProvider
                injectedGame={injectedGame}
                injectedUserId={injectedUserId}
                injectedCharacter={injectedCharacter}
              >
                <McContentProvider injectedMcContent={injectedMcContent}>
                  <KeycloakUserProvider keycloakUser={{ ...keycloakUser }}>
                    {children}
                  </KeycloakUserProvider>
                </McContentProvider>
              </GameProvider>
            </ReactKeycloakProvider>
          </Grommet>
        </FontsProvider>
      </MockedProvider>
    </BrowserRouter>
  );
};

/**
 * Wraps all the providers around the test render method, except for KeycloakUserContext.Provider
 * To be used for integration tests, where <App/> is the ui param
 * @param ui
 * @param options
 */
const customRenderForApp = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'> & CustomRenderOptions
) =>
  render(ui, {
    wrapper: (props: any) => <AppProviders {...props} {...options} />,
    ...options,
  });

// Re-export everything
export * from '@testing-library/react';

export { customRenderForApp as render };

/**
 * Wraps all the providers around the test render method,
 * To be used for unit tests, where the ui param is a standalone component
 * @param ui
 * @param options
 */
export const customRenderForComponent = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'> & CustomRenderOptions
) =>
  render(ui, {
    wrapper: (props: any) => <ComponentProviders {...props} {...options} />,
    ...options,
  });

/**
 * Adds a route option to customRenderforApp
 * This shoud be the default renderer for integration tests
 * @param ui
 * @param route
 * @param options
 */
export const renderWithRouter = (
  ui: React.ReactElement,
  route: string = '/',
  options?: Omit<RenderOptions, 'queries'> & CustomRenderOptions
) => {
  window.history.pushState({}, 'Menu Page', route);
  return customRenderForApp(ui, options);
};

export const waitOneTick = async () => await act(async () => await wait());
