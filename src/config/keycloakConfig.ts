import Keycloak from 'keycloak-js';
import { KEYCLOAK_CLIENT, KEYCLOAK_REALM } from './constants';

const url = process.env.REACT_APP_KEYCLOAK_AUTH_SERVER;

const keycloakConfig: Keycloak.KeycloakConfig = {
  url,
  realm: KEYCLOAK_REALM,
  clientId: KEYCLOAK_CLIENT,
};

// @ts-ignore
const keycloak = new Keycloak(keycloakConfig) as Keycloak.KeycloakInstance;

export default keycloak;
