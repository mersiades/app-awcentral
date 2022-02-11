import {
  BACKUP_WEAPONS_TEXT,
  BIG_GUNS_TEXT,
  GUNLUGGER_SPECIAL_NAME,
  SERIOUS_GUNS_TEXT,
  SET_TEXT,
  VEHICLES_TITLE,
} from '../../src/config/constants';
import game6 from '../fixtures/games/game6';
import { decapitalize } from '../../src/helpers/decapitalize';
import { UniqueTypes } from '../../src/@types/enums';

describe('Creating a new Gunlugger Character', () => {
  beforeEach(() => {
    cy.kcLogout();
    cy.kcLogin('marama');
    cy.visit(`character-creation/${game6.id}?step=6`);
  });

  it('should set Gunlugger Weapons and stop at MovesForm', () => {
    const gunluggerName = 'Batty';
    const gunluggerNameUC = gunluggerName.toUpperCase();
    const gunluggerArmor = 'homemade chainmail';

    // ------------------------------------------ WeaponsForm ------------------------------------------ //
    const bigOption1Text = 'silenced sniper rifle';
    const seriousOption1Text = 'hunting rifle';
    const seriousOption2Text = 'shotgun';
    const backupOption1Text = '9mm';

    // Check form content
    cy.contains(`${gunluggerNameUC}'S WEAPONS`).should('exist');
    cy.contains(BIG_GUNS_TEXT).should('exist');
    cy.contains(SERIOUS_GUNS_TEXT).should('exist');
    cy.contains(BACKUP_WEAPONS_TEXT).should('exist');
    cy.contains('choose 1').should('exist');
    cy.contains('choose 2').should('exist');
    cy.contains(SET_TEXT).as('setButton');

    cy.get(
      `div[data-testid="silenced sniper rifle (3-harm far hi-tech)-pill"]`
    ).as('bigOption1');
    cy.get(
      `div[data-testid="assault rifle (3-harm close/far loud autofire)-pill"]`
    ).as('bigOption2');
    cy.get(
      `div[data-testid="grenade launcher (4-harm close area messy)-pill"]`
    ).as('bigOption3');
    cy.get(`div[data-testid="hunting rifle (3-harm far loud)-pill"]`).as(
      'seriousOption1'
    );
    cy.get(`div[data-testid="shotgun (3-harm close messy)-pill"]`).as(
      'seriousOption2'
    );
    cy.get(`div[data-testid="smg (2-harm close autofire loud)-pill"]`).as(
      'seriousOption3'
    );
    cy.get(`div[data-testid="9mm (2-harm close loud)-pill"]`).as(
      'backupOption1'
    );
    cy.get(`div[data-testid="machete (3-harm hand messy)-pill"]`).as(
      'backupOption2'
    );
    cy.get(
      `div[data-testid="grenades (4-harm hand area reload messy)-pill"]`
    ).as('backupOption3');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="gear-box"]').should('contain', gunluggerArmor);
    cy.get('div[data-testid="weapons-box"]').should(
      'contain',
      decapitalize(UniqueTypes.weapons)
    );
    cy.get('div[data-testid="moves-box"]').should(
      'contain',
      decapitalize(GUNLUGGER_SPECIAL_NAME)
    );

    // Check form functionality
    cy.get('@bigOption1').click();
    cy.get('@seriousOption1').click();
    cy.get('@seriousOption2').click();
    cy.get('@setButton').should('be.disabled');
    cy.get('@backupOption1').click();

    // Submit form
    cy.contains(SET_TEXT).click();

    // ------------------------------------------ CharacterMovesForm ------------------------------------------ //
    // Check form content
    cy.contains(`WHAT ARE ${gunluggerNameUC}'S MOVES`).should('exist');
    cy.get('input[type="checkbox"]').should('have.length', 8);
    cy.contains('Select 3').should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="weapons-box"]')
      .should('contain', decapitalize(UniqueTypes.weapons))
      .should('contain', bigOption1Text)
      .should('contain', seriousOption1Text)
      .should('contain', seriousOption2Text)
      .should('contain', backupOption1Text);
    cy.get('div[data-testid="moves-box"]').should(
      'contain',
      decapitalize(GUNLUGGER_SPECIAL_NAME)
    );
    cy.get('div[data-testid="vehicles-box"]')
      .should('contain', VEHICLES_TITLE)
      .should('contain', '...');
  });
});
