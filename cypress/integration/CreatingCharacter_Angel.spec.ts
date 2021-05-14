import {
  CHOOSE_STAT_SET_TEXT,
  CHOOSE_YOUR_PLAYBOOK_TEXT,
  GEAR_FORM_INSTRUCTIONS,
  GEAR_TITLE,
  GET_STARTED_TEXT,
  LOOKS_TITLE,
  NAME_TITLE,
  NEW_GAME_TEXT,
  NEW_PLAYER_INTRO_TEXT,
  NEXT_TEXT,
  OPTIONS_TITLE,
  PLAYBOOK_TITLE,
  STATS_TITLE,
  WELCOME_JUNGLE_TEXT,
} from '../../src/config/constants';
import game6 from '../fixtures/games/game6';
import { decapitalize } from '../../src/helpers/decapitalize';
import { PlaybookType, UniqueTypes } from '../../src/@types/enums';

describe('Creating a new Angel Character', () => {
  beforeEach(() => {
    cy.kcLogout();
    cy.kcLogin('cristi');
    cy.visit(`character-creation/${game6.id}?step=0`);
  });

  it('should create an Angel and navigate to PreGamePage', () => {
    // ------------------------------------------ NewGameIntro ------------------------------------------ //
    // Check form content
    cy.contains(NEW_GAME_TEXT).should('exist');
    cy.contains(WELCOME_JUNGLE_TEXT).should('exist');
    cy.contains(GET_STARTED_TEXT).should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="playbook-box"]').should('contain', PLAYBOOK_TITLE).should('contain', '...');
    cy.get('div[data-testid="name-box"]').should('contain', NAME_TITLE).should('contain', '...');
    cy.get('div[data-testid="looks-box"]').should('contain', LOOKS_TITLE).should('contain', '...');
    cy.get('div[data-testid="stats-box"]').should('contain', STATS_TITLE).should('contain', '...');
    cy.get('div[data-testid="gear-box"]').should('contain', GEAR_TITLE).should('contain', '...');

    // Go to next
    cy.contains(NEXT_TEXT).click();

    // ------------------------------------------ CharacterPlaybookForm ------------------------------------------ //
    // Check form content
    cy.contains(CHOOSE_YOUR_PLAYBOOK_TEXT).should('exist');
    cy.contains(NEW_PLAYER_INTRO_TEXT).should('exist');

    // Check CharacterCreationStepper
    // Should be no change

    // Check form functionality
    cy.get('div[data-testid="angel-button"]').click();
    cy.contains('SELECT Angel').click(); // SELECT ANGEL

    // ------------------------------------------ CharacterNameForm ------------------------------------------ //
    // Check form content
    cy.contains('WHAT IS THE ANGEL CALLED?').should('exist');
    cy.get('input[aria-label="name-input"]').as('nameInput');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="playbook-box"]')
      .should('contain', PLAYBOOK_TITLE)
      .should('contain', decapitalize(PlaybookType.angel));

    // Check form functionality
    cy.contains('Dou').click();
    cy.get('@nameInput').then((input) => {
      // @ts-ignore
      expect(input[0].value).to.equal('Dou');
    });

    cy.contains('Di').click();
    cy.get('@nameInput')
      .then((input) => {
        // @ts-ignore
        expect(input[0].value).to.equal('Di');
      })
      .focus()
      .type('ana')
      .then((input) => {
        // @ts-ignore
        expect(input[0].value).to.equal('Diana');
      });

    // Submit form
    cy.contains('SET').click();

    // ------------------------------------------ CharacterLooksForm ------------------------------------------ //
    const customEyes = 'tired eyes';
    // Check form content
    cy.contains('WHAT DOES DIANA LOOK LIKE?').should('exist');
    cy.contains('GENDER').should('exist');
    cy.contains('CLOTHES').should('exist');
    cy.contains('FACE').should('exist');
    cy.contains('EYES').should('exist');
    cy.contains('BODY').should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="name-box"]').should('contain', NAME_TITLE).should('contain', 'Diana');

    // Check form functionality
    cy.contains('man').click();
    cy.get('div[data-testid="looks-box"]').should('contain', LOOKS_TITLE).should('contain', 'man');

    cy.contains('utility wear').click();
    cy.get('div[data-testid="looks-box"]')
      .should('contain', LOOKS_TITLE)
      .should('contain', 'man')
      .should('contain', 'utility wear');

    cy.contains('haggard face').click();
    cy.get('div[data-testid="looks-box"]')
      .should('contain', LOOKS_TITLE)
      .should('contain', 'man')
      .should('contain', 'utility wear')
      .should('contain', 'haggard face');

    cy.get('input[aria-label="eyes-input"]').type(customEyes); // Check that looks can also be typed
    cy.contains('SET').click();
    cy.get('div[data-testid="looks-box"]')
      .should('contain', LOOKS_TITLE)
      .should('contain', 'man')
      .should('contain', 'utility wear')
      .should('contain', 'haggard face')
      .should('contain', customEyes);

    cy.contains('big body').click();
    cy.get('div[data-testid="looks-box"]')
      .should('contain', LOOKS_TITLE)
      .should('contain', 'man')
      .should('contain', 'utility wear')
      .should('contain', 'haggard face')
      .should('contain', 'big body');

    // Should automatically progress
    // ------------------------------------------ CharacterStatsForm ------------------------------------------ //
    // Check form content
    cy.contains("WHAT ARE DIANA'S STRENGTHS AND WEAKNESSES").should('exist');
    cy.contains(CHOOSE_STAT_SET_TEXT).should('exist');

    // Check CharacterCreationStepper
    // Should be no change

    // Check form functionality
    cy.get('div[data-testid="stats-option-box-0"]').click();

    // Submit form
    cy.contains('SET').click();

    // ------------------------------------------ CharacterStatsForm ------------------------------------------ //
    // Check form content
    cy.contains("WHAT IS DIANA'S GEAR").should('exist');
    cy.contains(GEAR_FORM_INSTRUCTIONS).should('exist');
    cy.contains(GEAR_TITLE).should('exist');
    cy.contains(OPTIONS_TITLE).should('exist');
    cy.contains('ADD').should('exist');
    cy.contains('REMOVE').should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="stats-box"]')
      .should('contain', STATS_TITLE)
      .should('contain', 'COOL')
      .should('contain', 'HARD')
      .should('contain', 'HOT')
      .should('contain', 'SHARP')
      .should('contain', 'WEIRD');
    cy.get('div[data-testid="gear-box"]').should('contain', GEAR_TITLE).should('contain', '...');
    cy.get('div[data-testid="angel-kit-box"]')
      .should('contain', decapitalize(UniqueTypes.angelKit))
      .should('contain', 'Stock: 6')
      .should('contain', 'No supplier yet');
  });
});
