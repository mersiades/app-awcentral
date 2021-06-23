import {
  ATTRACTIONS_INSTRUCTIONS,
  CAST_CREW_INSTRUCTIONS,
  MAESTROD_SPECIAL_NAME,
  SELECT_SIDE_ATTRACTIONS,
  SET_TEXT,
  VEHICLES_TITLE,
} from '../../src/config/constants';
import game6 from '../fixtures/games/game6';
import { decapitalize } from '../../src/helpers/decapitalize';
import { UniqueTypes } from '../../src/@types/enums';

describe("Creating a new Maestro D' Character", () => {
  beforeEach(() => {
    cy.kcLogout();
    cy.kcLogin('ivette');
    cy.visit(`character-creation/${game6.id}?step=6`);
  });

  it('should set an Establishment and stop at MovesForm', () => {
    const maestroDName = 'Emmy';
    const maestroDNameUC = maestroDName.toUpperCase();
    const maestroDGearItem = 'rusty iron mic';

    // ------------------------------------------ EstablishmentForm ------------------------------------------ //
    const attraction1 = 'fashion';
    const attraction2 = 'luxury food';
    const attraction3 = 'spectacle';
    const attraction4 = 'coffee';
    const atmosphere1 = 'bustle';
    const atmosphere2 = 'intimacy';
    const atmosphere3 = 'smoke';
    const atmosphere4 = 'shadows';
    const atmosphere5 = 'perfume';
    const regular1 = 'Lamprey';
    const regular2 = 'Ba';
    const regular3 = 'Camo';
    const regular4 = 'Toyota';
    const regular5 = 'Lits';
    const regular6 = 'Additional Reg';
    const interestedNPC1 = 'Been';
    const interestedNPC2 = 'Rolfball';
    const interestedNPC3 = 'Gams';
    const interestedNPC4 = 'Additional interested NPC';
    const security1 = 'a real gang';
    const security2 = 'a convenient shotgun';
    const security3 = 'a bouncer';
    const security4 = 'plywood & chickenwire';
    const security5 = 'secrecy, passwords';
    const security6 = "everybody's packing";
    const security7 = 'a warren of dead-ends';
    const security8 = 'no fixed location';
    const crew1Name = 'Crew 1 name';
    const crew1Desc = 'Crew 1 description';

    // Check form content
    cy.contains(`${maestroDNameUC}'S ESTABLISHMENT`).should('exist');
    cy.contains(ATTRACTIONS_INSTRUCTIONS).should('exist');
    cy.contains(SELECT_SIDE_ATTRACTIONS).should('exist');
    cy.contains("For your establishment's atmosphere").should('exist');
    cy.contains('Your regulars include these 5 NPCs').should('exist');
    cy.contains('These 3 NPCs (at least) have an interest in your establishment').should('exist');
    cy.contains('For security, choose 2').should('exist');
    cy.contains(CAST_CREW_INSTRUCTIONS).should('exist');
    cy.contains(SET_TEXT).should('exist');
    cy.get('input[type="checkbox"]').should('have.length', 23);

    // Check CharacterCreationStepper
    cy.get('div[data-testid="gear-box"]').should('contain', maestroDGearItem);
    cy.get('div[data-testid="establishment-box"]').should('contain', decapitalize(UniqueTypes.establishment));
    cy.get('div[data-testid="moves-box"]').should('contain', decapitalize(MAESTROD_SPECIAL_NAME));

    // Check form functionality
    // Attractions
    cy.get('input[aria-label="main-attraction-input"]').click();
    cy.get('div[role="menubar"]').within(() => cy.contains(attraction1).click());
    cy.get('div[data-testid="attractions-box"]').should('contain', attraction1);
    selectItem(attraction2, [{ box: 'attractions', expectedResult: attraction2 }]);
    selectItem(attraction3, [{ box: 'attractions', expectedResult: attraction3 }]);
    checkSelectionLimit(attraction4, [{ box: 'attractions', notExpectedResult: attraction4 }]);
    deSelectItem(attraction2, [{ box: 'attractions', notExpectedResult: attraction2 }]);
    selectItem(attraction4, [{ box: 'attractions', expectedResult: attraction4 }]);

    // Atmospheres
    selectItem(atmosphere1, [{ box: 'atmosphere', expectedResult: atmosphere1 }]);
    selectItem(atmosphere2, [{ box: 'atmosphere', expectedResult: atmosphere2 }]);
    selectItem(atmosphere3, [{ box: 'atmosphere', expectedResult: atmosphere3 }]);
    selectItem(atmosphere4, [{ box: 'atmosphere', expectedResult: atmosphere4 }]);
    checkSelectionLimit(atmosphere5, [{ box: 'atmosphere', notExpectedResult: atmosphere5 }]);
    deSelectItem(atmosphere1, [{ box: 'atmosphere', notExpectedResult: atmosphere1 }]);
    selectItem(atmosphere5, [{ box: 'atmosphere', expectedResult: atmosphere5 }]);

    // Regulars
    cy.get('div[data-testid="regulars-box"]')
      .should('contain', regular1)
      .should('contain', regular2)
      .should('contain', regular3)
      .should('contain', regular4)
      .should('contain', regular5);
    cy.get('input[aria-label="additional-regular-input"]').type(regular6);
    cy.get('button[id="add-additional-regular-button"]').click();
    cy.get('div[data-testid="regulars-box"]').should('contain', regular6);
    cy.get('input[aria-label="best-regular-input"]').click();
    cy.get('div[role="menubar"]').within(() => cy.contains(regular1).click());
    cy.get('div[data-testid="regulars-box"]').should('contain', `${regular1} is your best regular`);
    cy.get('input[aria-label="worst-regular-input"]').click();
    cy.get('div[role="menubar"]').within(() => cy.contains(regular2).click());
    cy.get('div[data-testid="regulars-box"]').should('contain', `${regular2} is your worst regular`);

    // Interested NPCs
    cy.get('div[data-testid="interested npcs-box"]')
      .should('contain', interestedNPC1)
      .should('contain', interestedNPC2)
      .should('contain', interestedNPC3);
    cy.get('input[aria-label="additional-interested-npc-input"]').type(interestedNPC4);
    cy.get('button[id="add-additional-interest-npc-button"]').click();
    cy.get('div[data-testid="interested npcs-box"]').should('contain', interestedNPC4);

    cy.get('input[aria-label="wants-in-on-it-input"]').click();
    cy.get('div[role="menubar"]').within(() => cy.contains(interestedNPC1).click());
    cy.get('div[data-testid="interested npcs-box"]').should('contain', `${interestedNPC1} wants in on it`);

    cy.get('input[aria-label="owes-for-it-input"]').click();
    cy.get('div[role="menubar"]').within(() => cy.contains(interestedNPC2).click());
    cy.get('div[data-testid="interested npcs-box"]').should('contain', `You owe ${interestedNPC2} for it`);

    cy.get('input[aria-label="wants-it-gone-input"]').click();
    cy.get('div[role="menubar"]').within(() => cy.contains(interestedNPC4).click());
    cy.get('div[data-testid="interested npcs-box"]').should('contain', `${interestedNPC4} wants it gone`);

    // Security
    selectItem(security1, [{ box: 'security', expectedResult: security1 }]);
    checkSelectionLimit(security2, [{ box: 'security', notExpectedResult: security2 }]);
    deSelectItem(security1, [{ box: 'atmosphere', notExpectedResult: security1 }]);
    selectItem(security2, [{ box: 'security', expectedResult: security2 }]);
    selectItem(security3, [{ box: 'security', expectedResult: security3 }]);
    checkSelectionLimit(security4, [{ box: 'security', notExpectedResult: security4 }]);
    deSelectItem(security2, [{ box: 'atmosphere', notExpectedResult: security2 }]);
    selectItem(security4, [{ box: 'security', expectedResult: security4 }]);
    deSelectItem(security3, [{ box: 'atmosphere', notExpectedResult: security3 }]);
    selectItem(security5, [{ box: 'security', expectedResult: security5 }]);
    deSelectItem(security4, [{ box: 'atmosphere', notExpectedResult: security4 }]);
    selectItem(security6, [{ box: 'security', expectedResult: security6 }]);
    deSelectItem(security5, [{ box: 'atmosphere', notExpectedResult: security5 }]);
    selectItem(security7, [{ box: 'security', expectedResult: security7 }]);
    deSelectItem(security6, [{ box: 'atmosphere', notExpectedResult: security6 }]);
    selectItem(security8, [{ box: 'security', expectedResult: security8 }]);

    // Cast & crew
    cy.get('input[aria-label="crew-name-input"]').type(crew1Name);
    cy.get('input[aria-label="crew-description-input"]').type(crew1Desc);
    cy.get('button[id="add-crew-member-button"]').click();
    cy.get('div[data-testid="cast & crew-box"]').should('contain', crew1Name);

    // Submit form
    cy.contains(SET_TEXT).click();

    // ------------------------------------------ CharacterMovesForm ------------------------------------------ //

    // Check form content
    cy.contains(`WHAT ARE ${maestroDNameUC}'S MOVES`).should('exist');
    cy.get('input[type="checkbox"]').should('have.length', 6);
    cy.contains('Default moves').should('exist');
    cy.contains('Select 2').should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="establishment-box"]')
      .should('contain', decapitalize(UniqueTypes.establishment))
      .should('contain', attraction1)
      .should('contain', attraction3)
      .should('contain', attraction4);
    cy.get('div[data-testid="moves-box"]').should('contain', decapitalize(MAESTROD_SPECIAL_NAME));
    cy.get('div[data-testid="vehicles-box"]').should('contain', VEHICLES_TITLE).should('contain', '...');
  });
});

const selectItem = (item: string, checks: { box: string; expectedResult: string }[]) => {
  cy.contains(item).click();
  checks.forEach((check) => cy.get(`div[data-testid="${check.box}-box"]`).should('include.text', check.expectedResult));
};

const deSelectItem = (item: string, checks: { box: string; notExpectedResult: string }[]) => {
  cy.contains(item).click();
  checks.forEach((check) =>
    cy.get(`div[data-testid="${check.box}-box"]`).should('not.include.text', check.notExpectedResult)
  );
};

const checkSelectionLimit = (item: string, checks: { box: string; notExpectedResult: string }[]) => {
  cy.contains(item).click();
  checks.forEach((check) =>
    cy.get(`div[data-testid="${check.box}-box"]`).should('not.include.text', check.notExpectedResult)
  );
};
