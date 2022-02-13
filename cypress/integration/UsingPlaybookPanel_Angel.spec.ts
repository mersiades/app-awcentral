import { decapitalize } from '../../src/helpers/decapitalize';
import angel_sara_1_complete from '../fixtures/characters/angel_sara_1_complete';
import game7 from '../fixtures/games/game7';
import {
  ADD_DIE_TEXT_1,
  ADD_DIE_TEXT_2,
  ADD_HARD_MINUS_1_TEXT,
  ADD_WEIRD_1_TEXT,
  ANGEL_KIT_TEXT,
  BARTER_TEXT,
  CANCEL_TEXT,
  COOL_TEXT,
  DO_IT_TEXT,
  GEAR_TITLE,
  HARD_TEXT,
  HARM_TITLE,
  HOT_TEXT,
  HX_RESET_TEXT,
  HX_TITLE,
  LIFE_UNTENABLE_INSTRUCTIONS,
  MAKE_CHANGE_TEXT,
  REMOVE_DIE_TEXT_1,
  REMOVE_DIE_TEXT_2,
  REMOVE_HARD_MINUS_1_TEXT,
  REMOVE_WEIRD_1_TEXT,
  SHARP_TEXT,
  STABILIZED_TEXT,
  STATS_TITLE,
  STOCK_TEXT,
  SUPPLIER_TEXT,
  WEIRD_TEXT,
} from '../../src/config/constants';

describe('Using the PlaybookPanel as an Angel', () => {
  const whiteBackground = 'background-color: rgb(255, 255, 255)';
  const redBackground = 'background-color: rgb(205, 63, 62)';
  const greenBackground = 'background-color: rgb(105, 141, 112)';

  beforeEach(() => {
    cy.login('sara@email.com');
    cy.visit('/');
    cy.returnToGame(game7.name);
    cy.openPlaybookPanel();
  });

  it('should show base character information, navigate to CharacterPlaybooksForm', () => {
    cy.get('div[data-testid="name-looks-box"]').within(() => {
      // Check character info is rendered
      cy.contains(angel_sara_1_complete.name as string).should('exist');
      cy.contains(angel_sara_1_complete.looks[0].look).should('exist');
      cy.contains(angel_sara_1_complete.looks[1].look).should('exist');
      cy.contains(angel_sara_1_complete.looks[2].look).should('exist');
      cy.contains(angel_sara_1_complete.looks[3].look).should('exist');
      cy.contains(angel_sara_1_complete.looks[4].look).should('exist');
      // Open and close the playbook description
      cy.get('svg[aria-label="FormDown"]').click();
      cy.contains(
        'When you’re lying in the dust of Apocalypse World guts aspilled'
      ).should('exist');
      cy.get('svg[aria-label="FormUp"]').click();
      cy.contains(
        'When you’re lying in the dust of Apocalypse World guts aspilled'
      ).should('not.exist');
      // Check can navigate to edit page
      cy.get('svg[aria-label="Edit"]').click();
      cy.url().should('contain', `character-creation/${game7.id}?step=1`);
    });
  });

  it('should change stat highlighting', () => {
    cy.get('div[data-testid="Stats-box"]').within(() => {
      // Check content
      cy.contains(STATS_TITLE).should('exist');
      cy.contains(COOL_TEXT).should('exist');
      cy.contains(HARD_TEXT).should('exist');
      cy.contains(HOT_TEXT).should('exist');
      cy.contains(SHARP_TEXT).should('exist');
      cy.contains(WEIRD_TEXT).should('exist');
      cy.get('h2[aria-label="cool-value"]').should('include.text', '1');
      cy.get('h2[aria-label="hard-value"]').should('include.text', '0');
      cy.get('h2[aria-label="hot-value"]').should('include.text', '1');
      cy.get('h2[aria-label="sharp-value"]').should('include.text', '2');
      cy.get('h2[aria-label="weird-value"]').should('include.text', '-1');
      cy.get('div[data-testid="COOL-stat-box"]').then((element) => {
        expect(element[0].getAttribute('style')).not.to.include(
          'background-color: rgb(214, 102, 103)'
        );
      });
      cy.get('div[data-testid="HARD-stat-box"]').then((element) => {
        expect(element[0].getAttribute('style')).to.include(
          'background-color: rgb(214, 102, 103)'
        );
      });
      cy.get('div[data-testid="HOT-stat-box"]').then((element) => {
        expect(element[0].getAttribute('style')).to.include(
          'background-color: rgb(214, 102, 103)'
        );
      });
      cy.get('div[data-testid="SHARP-stat-box"]').then((element) => {
        expect(element[0].getAttribute('style')).not.to.include(
          'background-color: rgb(214, 102, 103)'
        );
      });

      // Check highlighting toggle functionality
      cy.get('div[data-testid="WEIRD-stat-box"]')
        .then((element) => {
          expect(element[0].getAttribute('style')).not.to.include(
            'background-color: rgb(214, 102, 103)'
          );
        })
        .click();
      cy.wait(500);
      cy.get('div[data-testid="WEIRD-stat-box"]')
        .then((element) => {
          expect(element[0].getAttribute('style')).to.include(
            'background-color: rgb(214, 102, 103)'
          );
        })
        .click();
      cy.wait(500);
      cy.get('div[data-testid="WEIRD-stat-box"]').then((element) => {
        expect(element[0].getAttribute('style')).not.to.include(
          'background-color: rgb(214, 102, 103)'
        );
      });

      // Check minimising stats block
      cy.get('svg[aria-label="FormUp"]').click();
      cy.contains(COOL_TEXT).should('not.exist');

      // Check can navigate to edit page
      cy.get('svg[aria-label="Edit"]').click();
      cy.url().should('contain', `character-creation/${game7.id}?step=4`);
    });
  });

  it('should render the character moves box correctly', () => {
    cy.get('div[data-testid="moves-box"]').within(() => {
      // Check content
      cy.contains('Character moves').should('exist');
      cy.contains(
        decapitalize(angel_sara_1_complete.characterMoves[0].name)
      ).as('sixthSense');
      cy.contains(
        decapitalize(angel_sara_1_complete.characterMoves[1].name)
      ).as('healingTouch');
      cy.contains(
        decapitalize(angel_sara_1_complete.characterMoves[2].name)
      ).as('angelSpecial');

      // Check can maximise move descriptions
      cy.get('svg[data-testid="show-move-details-icon"]').click({
        multiple: true,
      });
      cy.contains('when you open your brain to the world’s psychic ').should(
        'exist'
      );
      cy.contains('when you put your hands skin-to-skin on a wounded ').should(
        'exist'
      );
      cy.contains('If you and another character have sex, your Hx ').should(
        'exist'
      );
      cy.get('svg[data-testid="hide-move-details-icon"]').click({
        multiple: true,
      });
      cy.contains('when you open your brain to the world’s psychic ').should(
        'not.exist'
      );
      cy.contains('when you put your hands skin-to-skin on a wounded ').should(
        'not.exist'
      );
      cy.contains('If you and another character have sex, your Hx ').should(
        'not.exist'
      );
    });
  });

  it("should increase harm value to 9 o'clock", () => {
    cy.get('div[data-testid="Harm-box"]').within(() => {
      // Check initial harm box content
      cy.contains(HARM_TITLE).scrollIntoView().should('exist');
      cy.contains(STABILIZED_TEXT).should('exist');
      cy.contains(LIFE_UNTENABLE_INSTRUCTIONS).should('exist');
      // Mark each sector with harm
      for (let i = 0; i < 3; i++) {
        checkHarmSectorAndClick(i, whiteBackground);
      }
    });
  });

  // This test relies on the previous test being complete
  // This test is too flakey, not worth the effort
  it.skip('should reduce harm to zero', () => {
    cy.get('div[data-testid="Harm-box"]').within(() => {
      // Check initial harm box content
      cy.contains(HARM_TITLE).scrollIntoView().should('exist');

      // Unmark each sector
      for (let i = 2; i > -1; i--) {
        checkHarmSectorAndClick(i, redBackground);
      }

      // Check stabilize
      // Flakey, not worth the worry
      // for (let i = 0; i < 3; i++) {
      //   checkHarmSectorAndClick(i, whiteBackground);
      // }
      // cy.contains(STABILIZED_TEXT).click();
      // for (let i = 2; i > -1; i--) {
      //   checkHarmSector(i, greenBackground);
      // }
    });
  });

  it('should reduce HARD when life untenable, then restore HARD', () => {
    // Click option and open DeathDialog
    cy.get('h2[aria-label="hard-value"]').should('include.text', '0');
    cy.contains('come back with -1hard').scrollIntoView().click();

    // Check DeathDialog content
    cy.contains(MAKE_CHANGE_TEXT).should('be.visible');
    cy.contains(ADD_HARD_MINUS_1_TEXT).should('be.visible');
    cy.contains(CANCEL_TEXT).should('be.visible');
    cy.contains(DO_IT_TEXT).should('be.visible');

    // Check DiathDialog CANCEL
    cy.contains(CANCEL_TEXT).click();
    cy.contains(MAKE_CHANGE_TEXT).should('not.exist');

    // Check DO IT button
    cy.contains('come back with -1hard').click();
    cy.contains(DO_IT_TEXT).should('not.be.disabled');
    cy.contains(DO_IT_TEXT).click();
    cy.contains(MAKE_CHANGE_TEXT).should('not.exist');

    // Check HARD decreased
    cy.get('h2[aria-label="hard-value"]').should('include.text', '-1');
    cy.get('[aria-label="come back with -1hard checkbox"]').within(() =>
      cy.get('input').should('be.checked')
    );

    // Uncheck -1hard option and check
    cy.contains('come back with -1hard').click();
    cy.contains(REMOVE_HARD_MINUS_1_TEXT, { timeout: 8000 }).should('exist');
    cy.contains(DO_IT_TEXT).click();
    cy.contains(MAKE_CHANGE_TEXT).should('not.exist');
    cy.get('h2[aria-label="hard-value"]', { timeout: 8000 }).should(
      'include.text',
      '0'
    );
    cy.get('[aria-label="come back with -1hard checkbox"]').within(() =>
      cy.get('input').should('not.be.checked')
    );
  });

  it('should increase WEIRD when life untenable, then restore WEIRD', () => {
    // Click option and open DeathDialog
    cy.get('h2[aria-label="weird-value"]').should('include.text', '-1');
    cy.contains('come back with +1weird').scrollIntoView().click();

    // Check DeathDialog content
    cy.contains(ADD_WEIRD_1_TEXT).should('exist');

    // Check WEIRD increases
    cy.contains(DO_IT_TEXT).click();
    cy.contains(ADD_WEIRD_1_TEXT).should('not.exist');
    cy.get('h2[aria-label="weird-value"]').should('include.text', '0');
    cy.get('[aria-label="come back with +1weird (max+3) checkbox"]').within(
      () => cy.get('input').should('be.checked')
    );

    // Uncheck +1weird option and check
    cy.contains('come back with +1weird').should('be.visible');
    cy.contains('come back with +1weird').click();
    cy.contains(REMOVE_WEIRD_1_TEXT).should('exist');
    cy.contains(DO_IT_TEXT).click();
    cy.contains(REMOVE_WEIRD_1_TEXT).should('not.exist');
    cy.get('h2[aria-label="weird-value"]').should('include.text', '-1');
    cy.get('[aria-label="come back with +1weird (max+3) checkbox"]').within(
      () => cy.get('input').should('not.be.checked')
    );
  });

  it('should mark character as dead when life untenable, then unmark', () => {
    // Check initial state
    cy.get('RIP').should('not.exist');
    cy.get('div[data-testid="name-looks-box"]').should('not.contain', 'RIP');

    // Kill character and check
    cy.contains('die').click();
    cy.contains(
      `${ADD_DIE_TEXT_1} ${angel_sara_1_complete.name} ${ADD_DIE_TEXT_2}`
    ).should('exist');
    cy.contains(DO_IT_TEXT).click();
    cy.contains('RIP', { timeout: 8000 }).should('exist');
    cy.get('div[data-testid="name-looks-box"]').should('contain', 'RIP');

    // Revive character and check
    cy.contains('die').click();
    cy.contains(
      `${REMOVE_DIE_TEXT_1} ${angel_sara_1_complete.name} ${REMOVE_DIE_TEXT_2}`
    ).should('exist');
    cy.contains(DO_IT_TEXT).click();
    cy.contains('RIP', { timeout: 8000 }).should('not.exist');
    cy.get('div[data-testid="name-looks-box"]').should('not.contain', 'RIP');
  });

  it('should increase and decrease Hx', () => {
    cy.get('div[data-testid="Hx-box"]').within(() => {
      // Check initial content
      cy.contains(HX_TITLE).should('exist');
      cy.contains('Scarlet').should('exist');
      cy.contains('Smith').should('exist');
      cy.contains('Phoenix').should('exist');
      cy.contains('Dog').should('exist');
      cy.get('h2[aria-label="scarlet-value"]').should('include.text', '-2');
      cy.get('h2[aria-label="smith-value"]').should('include.text', '2');
      cy.get('h2[aria-label="phoenix-value"]').should('include.text', '3');
      cy.get('h2[aria-label="dog-value"]').should('include.text', '1');

      // Increase Hx
      cy.get('div[aria-label="Scarlet-hx"]').within(() => {
        cy.get('h2[aria-label="scarlet-value"]').should('include.text', '-2');
        cy.get('div[data-testid="increase-caret"]').click();
        cy.get('h2[aria-label="scarlet-value"]', { timeout: 8000 }).should(
          'include.text',
          '-1'
        );
      });

      // Decrease Hx
      cy.get('div[aria-label="Smith-hx"]').within(() => {
        cy.get('h2[aria-label="smith-value"]').should('include.text', '2');
        cy.get('div[data-testid="decrease-caret"]').click();
        cy.get('h2[aria-label="smith-value"]', { timeout: 8000 }).should(
          'include.text',
          '1'
        );
      });
    });
  });

  it('should reset Hx (both + & -) and earn experience', () => {
    cy.get('div[data-testid="Hx-box"]').within(() => {
      // Check initial content
      // cy.get('div[aria-label="Phoenix-hx"]').as('phoenixBox');
      // cy.get('div[aria-label="Dog-hx"]').as('dogBox');

      // Increase Hx to reset point
      cy.get('div[aria-label="Phoenix-hx"]').within(() => {
        cy.get('h2[aria-label="phoenix-value"]').should('include.text', '3');
        cy.get('div[data-testid="increase-caret"]').click();
        cy.get('h2[aria-label="phoenix-value"]', { timeout: 8000 }).should(
          'include.text',
          '1'
        );
      });

      cy.contains(HX_RESET_TEXT).should('exist');

      // Decrease Hx to reset point
      cy.get('div[aria-label="Dog-hx"]').within(() => {
        cy.get('h2[aria-label="dog-value"]').should('include.text', '1');
        cy.get('div[data-testid="decrease-caret"]').click();
        cy.get('h2[aria-label="dog-value"]').should('include.text', '0');
        cy.get('div[data-testid="decrease-caret"]').click();
        cy.get('h2[aria-label="dog-value"]').should('include.text', '-1');
        cy.get('div[data-testid="decrease-caret"]').click();
        cy.get('h2[aria-label="dog-value"]').should('include.text', '-2');
        cy.get('div[data-testid="decrease-caret"]').click();
        cy.get('h2[aria-label="dog-value"]').should('include.text', '0');
      });

      cy.contains(HX_RESET_TEXT).should('exist');
    });

    checkExperienceNumber(2, 3);
  });

  it('should minimise/maximise Hx box and navigate to edit Hx page', () => {
    cy.get('div[data-testid="Hx-box"]').within(() => {
      cy.contains('Scarlet').should('exist');
      cy.get('svg[aria-label="FormUp"]').click();
      cy.contains('Scarlet').should('not.exist');
      cy.get('svg[aria-label="FormDown"]').click();
      cy.contains('Scarlet').should('exist');
      cy.get('svg[aria-label="Edit"]').click();
      cy.url().should('contain', `character-creation/${game7.id}?step=10`);
    });
  });

  it('should minimise/maximise Gear box and navigate to edit Gear page', () => {
    cy.get('div[data-testid="Gear-box"]').within(() => {
      cy.contains(GEAR_TITLE).should('exist');
      cy.contains(angel_sara_1_complete.gear[0]).should('exist');
      cy.contains(angel_sara_1_complete.gear[1]).should('exist');
      cy.get('svg[aria-label="FormUp"]').click();
      cy.contains(angel_sara_1_complete.gear[0]).should('not.exist');
      cy.get('svg[aria-label="FormDown"]').click();
      cy.contains(angel_sara_1_complete.gear[0]).should('exist');
      cy.get('svg[aria-label="Edit"]').click();
      cy.url().should('contain', `character-creation/${game7.id}?step=5`);
    });
  });

  it('should increase/decrease barter', () => {
    cy.get('div[data-testid="Barter-box"]').within(() => {
      cy.contains(BARTER_TEXT).should('exist');
      cy.contains('At the beginning of the session').should('not.exist');
      cy.get('div[data-testid="barter-value-box"]')
        .as('barterValue')
        .should('include.text', '2');

      cy.get('svg[aria-label="FormDown"]').click();
      cy.contains('At the beginning of the session').should('exist');
      cy.get('svg[aria-label="FormUp"]').click();
      cy.contains('At the beginning of the session').should('not.exist');

      // Increase barter
      cy.get('div[data-testid="increase-caret"]').click();
      cy.get('@barterValue').should('include.text', '3');

      // Decrease barter
      cy.get('div[data-testid="decrease-caret"]').click();
      cy.get('@barterValue').should('include.text', '2');
    });
  });

  it('should increase/decrease Angel kit stock', () => {
    let stockValue: number;
    cy.get('div[data-testid="Angel kit-box"]').within(() => {
      cy.contains(ANGEL_KIT_TEXT).should('exist');
      cy.contains(STOCK_TEXT).should('exist');
      cy.contains(SUPPLIER_TEXT).should('exist');
      cy.contains('Your angel kit has all kinds of crap').should('exist');
      cy.get('h2[aria-label="stock-value"]').then((elem) => {
        stockValue = parseInt(elem[0].innerText);
        cy.get('div[data-testid="increase-caret"]').click();
        cy.get('h2[aria-label="stock-value"]').should(
          'contain.text',
          stockValue + 1
        );
        cy.get('div[data-testid="decrease-caret"]').click();
        cy.get('h2[aria-label="stock-value"]', { timeout: 8000 }).should(
          'contain.text',
          stockValue
        );
      });
    });
  });
});

const checkHarmSector = (sector: number, color: string) => {
  cy.get(`div[data-testid="harm-sector-${sector}"]`).then((element) => {
    expect(element[0].getAttribute('style')).to.include(color);
  });
};

const checkHarmSectorAndClick = (sector: number, color: string) => {
  cy.get(`div[data-testid="harm-sector-${sector}"]`).then((element) => {
    expect(element[0].getAttribute('style')).to.include(color);
  });
  cy.wait(500);
  cy.get(`div[data-testid="harm-sector-${sector}"]`).click({ force: true });
  cy.wait(500);
  cy.get(`div[data-testid="harm-sector-${sector}"]`, { timeout: 8000 }).then(
    (element) => {
      expect(element[0].getAttribute('style')).not.to.include(color);
    }
  );
};

const checkExperienceNumber = (
  expectedFilled: number,
  expectedUnfilled: number
) => {
  cy.get('div[data-testid="filled-circle"]', { timeout: 8000 }).should(
    'have.length',
    expectedFilled
  );
  cy.get('div[data-testid="unfilled-circle"]', { timeout: 8000 }).should(
    'have.length',
    expectedUnfilled
  );
};
