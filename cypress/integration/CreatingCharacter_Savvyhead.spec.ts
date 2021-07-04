import {
  BONEFEEL_NAME,
  ITEMS_INSTRUCTIONS,
  PROJECTS_TITLE,
  SAVVYHEAD_SPECIAL_NAME,
  SET_TEXT,
  THINGS_SPEAK_NAME,
  VEHICLES_TITLE,
} from '../../src/config/constants';
import game6 from '../fixtures/games/game6';
import { decapitalize } from '../../src/helpers/decapitalize';
import { UniqueTypes } from '../../src/@types/enums';

describe('Creating a new Savvyhead Character', () => {
  beforeEach(() => {
    cy.kcLogout();
    cy.kcLogin('sergio');
    cy.visit(`character-creation/${game6.id}?step=6`);
  });

  it('should set a Workspace and stop at MovesForm', () => {
    const savvyheadName = 'Leah';
    const savvyheadNameUC = savvyheadName.toUpperCase();
    const savvyheadGearItem = 'homemade crossbow';

    // ------------------------------------------ WorkspaceForm ------------------------------------------ //
    const option1 = 'a garage';
    const option2 = 'a darkroom';
    const option3 = 'a controlled growing environment';
    const option4 = 'a truck or van';

    // Check form content
    cy.contains(`${savvyheadNameUC}'S WORKSPACE`).should('exist');
    cy.contains(ITEMS_INSTRUCTIONS).should('exist');
    cy.contains('Choose 3').should('exist');
    cy.contains(PROJECTS_TITLE).should('exist');
    cy.contains(SET_TEXT).should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="gear-box"]').should('contain', savvyheadGearItem);
    cy.get('div[data-testid="workspace-box"]').should(
      'contain',
      decapitalize(UniqueTypes.workspace)
    );
    cy.get('div[data-testid="moves-box"]').should(
      'contain',
      decapitalize(SAVVYHEAD_SPECIAL_NAME)
    );

    // Check form functionality
    cy.get(`div[data-testid="${option1}-pill"]`).click();
    cy.get(`div[data-testid="${option2}-pill"]`).click();
    cy.get(`div[data-testid="${option3}-pill"]`).click();
    cy.get(`div[data-testid="${option1}-pill"]`).click();
    cy.get(`div[data-testid="${option4}-pill"]`).click();

    // Submit form
    cy.contains(SET_TEXT).click();

    // ------------------------------------------ CharacterMovesForm ------------------------------------------ //

    const bonefeelMoveName = decapitalize(BONEFEEL_NAME);
    const thingsSpeakMoveName = decapitalize(THINGS_SPEAK_NAME);

    // Check form content
    cy.contains(`WHAT ARE ${savvyheadNameUC}'S MOVES`).should('exist');
    cy.get('input[type="checkbox"]').should('have.length', 7);
    cy.contains('Default moves').should('exist');
    cy.contains('Select 2').should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="workspace-box"]')
      .should('contain', decapitalize(UniqueTypes.workspace))
      .should('contain', option2)
      .should('contain', option3)
      .should('contain', option4);
    cy.get('div[data-testid="moves-box"]').should(
      'contain',
      decapitalize(SAVVYHEAD_SPECIAL_NAME)
    );
    cy.get('div[data-testid="vehicles-box"]')
      .should('contain', VEHICLES_TITLE)
      .should('contain', '...');

    cy.get(`input[aria-label="${bonefeelMoveName}-checkbox"]`).check({
      force: true,
    });
    cy.get(`input[aria-label="${bonefeelMoveName}-checkbox"]`).should(
      'be.checked'
    );
    cy.get(`input[aria-label="${thingsSpeakMoveName}-checkbox"]`).check({
      force: true,
    });
    cy.get(`input[aria-label="${bonefeelMoveName}-checkbox"]`).should(
      'be.checked'
    );
    cy.get(`input[aria-label="${thingsSpeakMoveName}-checkbox"]`).should(
      'be.checked'
    );
  });
});
