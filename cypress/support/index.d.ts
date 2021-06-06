// in cypress/support/index.d.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

// import { PlaybookType } from '../../src/@types/enums';

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    // dataCy(value: string): Chainable<Element>
    kcFakeLogin(user: string, redirectUrl?: string): any;
    getToken(): Promise<any>; // Actually a response from Keycloak
    resetDb(): Promise<any>; // Actually a graphql response
    moveThroughNewGameIntro(): void;
    selectPlaybook(playbookType: PlaybookType): void;
    setCharacterName(name: string): void;
    completeLooksForm(
      nameUC: string,
      name: string,
      gender: string,
      clothes: string,
      face: string,
      eyes: string,
      body: string
    ): void;
    setCharacterStat(nameUC: string): void;
    completeGearForm(nameUC: string, clothes: string, items: string[]);
    setVehicleOptions(option1: string, option2: string, option3: string, targetBox: string);
    deleteKeycloakUser(email: string): void;
    openPlaybookPanel(): void;
    openBasicMovesPanel(): void;
    checkMoveMessage(messageTitle: string, snippet: string, stat?: StatType): void;
  }
}
