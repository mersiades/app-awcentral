import { ApolloClient, ApolloLink, from, InMemoryCache } from '@apollo/client';
import { HttpLink } from 'apollo-link-http';
import keycloak from './keycloakConfig';

const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_GRAPHQL_HTTP_ROOT}/graphql`,
});

const authLink = new ApolloLink((operation, forward) => {
  let token = keycloak.token;
  keycloak
    .updateToken(5)
    .then(() => (token = keycloak.token))
    .catch(() => keycloak.logout());

  operation.setContext(({ headers }: Record<string, any>) => ({
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }));
  return forward(operation);
});

// @ts-ignore
const apolloLink = from([authLink, httpLink]);

export const apolloClient = new ApolloClient({
  // @ts-ignore
  link: apolloLink,
  cache: new InMemoryCache({
    typePolicies: {
      // Game: {
      //   fields: {
      //     players: {
      //       // @ts-ignore
      //       merge(existing = [], incoming: any[]) {
      //         return [...incoming];
      //       },
      //     },
      //     gameMessages: {
      //       // @ts-ignore
      //       merge(existing = [], incoming: any[]) {
      //         return [...incoming];
      //       },
      //     },
      //   },
      // },
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
