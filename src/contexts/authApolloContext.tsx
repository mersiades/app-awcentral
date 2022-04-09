import React, { FC, PropsWithChildren } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  ApolloProvider,
  ApolloClient,
  from,
  InMemoryCache,
} from '@apollo/client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from '@apollo/link-context';

interface AuthApolloProviderProps {}

export const AuthApolloProvider: FC<
  PropsWithChildren<AuthApolloProviderProps>
> = ({ children }) => {
  const { getAccessTokenSilently, logout } = useAuth0();

  const httpLink = new HttpLink({
    uri: `${process.env.REACT_APP_GRAPHQL_HTTP_ROOT}/graphql`,
  });

  const authLink = setContext(async (_, { headers, ...rest }) => {
    let token: any | undefined = undefined;

    try {
      token = await getAccessTokenSilently();
    } catch (error) {
      console.error(error);
      logout();
    }

    if (!token) return { headers, ...rest };

    return {
      ...rest,
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    };
  });

  // @ts-ignore
  const apolloLink = from([authLink, httpLink]);

  const apolloClient = new ApolloClient({
    // @ts-ignore
    link: apolloLink,
    cache: new InMemoryCache({
      typePolicies: {
        Game: {
          fields: {
            players: {
              // @ts-ignore
              merge(existing = [], incoming: any[]) {
                return [...incoming];
              },
            },
            gameMessages: {
              // @ts-ignore
              merge(existing = [], incoming: any[]) {
                return [...incoming];
              },
            },
          },
        },
        Character: {
          fields: {
            looks: {
              // @ts-ignore
              merge(existing = [], incoming: any[]) {
                return [...incoming];
              },
            },
            characterMoves: {
              // @ts-ignore
              merge(existing = [], incoming: any[]) {
                return [...incoming];
              },
            },
            improvementMoves: {
              // @ts-ignore
              merge(existing = [], incoming: any[]) {
                return [...incoming];
              },
            },
            deathMoves: {
              // @ts-ignore
              merge(existing = [], incoming: any[]) {
                return [...incoming];
              },
            },
            vehicles: {
              // @ts-ignore
              merge(existing = [], incoming: any[]) {
                return [...incoming];
              },
            },
            holds: {
              // @ts-ignore
              merge(existing = [], incoming: any[]) {
                return [...incoming];
              },
            },
          },
        },
        Holding: {
          fields: {
            selectedWeaknesses: {
              // @ts-ignore
              merge(existing = [], incoming: any[]) {
                return [...incoming];
              },
            },
            selectedStrengths: {
              // @ts-ignore
              merge(existing = [], incoming: any[]) {
                return [...incoming];
              },
            },
          },
        },
      },
    }),
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
