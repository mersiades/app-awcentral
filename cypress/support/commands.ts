import cypress from 'cypress';
import { PlaybookType, StatType } from '../../src/@types/enums';
import { decapitalize } from '../../src/helpers/decapitalize';
import {
  ADD_TEXT,
  LOOKS_TITLE,
  NAME_TITLE,
  NEW_GAME_TEXT,
  PLAYBOOK_TITLE,
  RETURN_TO_GAME_TEXT,
} from '../../src/config/constants';
import {
  generateWaitAlias, ONM_PERFORM_PRINT,
  ONM_SET_PLAYBOOK,
  ONQ_DEATH_MOVES,
  ONQ_GAME,
  ONQ_PLAYBOOK,
  ONQ_PLAYBOOKS,
  waitMutationWithGame
} from '../utils/graphql-test-utils';

const query = `
mutation ResetDb {
  resetDb {
    id
    successMessage
    errorMessage
  }
}
`;

Cypress.Commands.add('getToken', () => {
  cy.request({
    method: 'POST',
    url: Cypress.env('AUTH0_TOKEN_ENDPOINT'),
    form: true,
    body: {
      grant_type: 'password',
      client_id: Cypress.env('AUTH0_CLIENT_ID'),
      client_secret: Cypress.env('AUTH0_CLIENT_SECRET'),
      username: 'cypress-test',
      password: Cypress.env('AUTH0_E2E_USER_PW'),
      audience: Cypress.env('AUTH0_AUDIENCE'),
      scope: 'openid profile email',
    },
  }).then((response) => {
    Cypress.env('access_token', response?.body.access_token);
  });
});

Cypress.Commands.add('login', (username: string) => {
  const client_id = Cypress.env('AUTH0_CLIENT_ID');
  const audience = Cypress.env('AUTH0_AUDIENCE');
  cy.request({
    method: 'POST',
    url: Cypress.env('AUTH0_TOKEN_ENDPOINT'),
    form: true,
    body: {
      grant_type: 'password',
      client_id,
      client_secret: Cypress.env('AUTH0_CLIENT_SECRET'),
      username,
      password: Cypress.env('AUTH0_MOCK_USER_PW'),
      audience,
      scope: 'openid profile email',
    },
  }).then(({ body }) => {
    const { access_token, expires_in, id_token, scope, token_type } = body;

    const [header, payload, signature] = id_token.split('.');

    const tokenData = JSON.parse(
      Buffer.from(id_token.split('.')[1], 'base64').toString('ascii')
    );

    window.localStorage.setItem(
      `@@auth0spajs@@::${client_id}::${audience}::${scope}`,
      JSON.stringify({
        body: {
          access_token,
          id_token,
          scope,
          expires_in,
          token_type,
          decodedToken: {
            encoded: { header, payload, signature },
            header: {
              alg: 'RS256',
              typ: 'JWT',
            },
            claims: {
              __raw: id_token,
              ...tokenData,
            },
            user: tokenData,
          },
          audience,
          client_id,
        },
        expiresAt: Math.floor(Date.now() / 1000) + expires_in,
      })
    );
  });
});

Cypress.Commands.add('resetDb', () => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('GRAPHQL_HOST')}/graphql`,
    body: { query },
    headers: {
      Authorization: `Bearer ${Cypress.env('access_token')}`,
    },
  }).then(({ body }) => {
    if (body.data.resetDb.errorMessage) {
      throw new Error(body.data.resetDb.errorMessage);
    }

    if (body.data.resetDb.successMessage) {
      console.info('Test database has been reset');
    }
    // cy.wait(1000);
  });
});

Cypress.Commands.add('returnToGame', (gameName: string) => {
  cy.contains(RETURN_TO_GAME_TEXT).click();
  cy.contains(gameName).click();
  cy.wait(generateWaitAlias(ONQ_GAME))
});

Cypress.Commands.add(
  'navToCharacterCreationViaPlaybookPanel',
  (editButtonId: string) => {
    // Close go-to-pregame dialog
    cy.contains('NO').click();

    // Open PlaybookPanel
    cy.contains('Playbook').click();
    cy.wait(generateWaitAlias(ONQ_PLAYBOOK))
    cy.wait(generateWaitAlias(ONQ_DEATH_MOVES))
    cy.get(`[data-testid="${editButtonId}"]`).scrollIntoView().click();
    cy.wait(generateWaitAlias(ONQ_PLAYBOOKS))
  }
);

Cypress.Commands.add('moveThroughNewGameIntro', () => {
  // Check form content
  cy.contains(NEW_GAME_TEXT).should('exist');

  // Check CharacterCreationStepper
  cy.get('div[data-testid="playbook-box"]')
    .should('contain', PLAYBOOK_TITLE)
    .should('contain', '...');

  cy.url().then((url) => cy.log(url));
  // Go to next
  cy.get('button[data-testid="next-button"]', { timeout: 10000 }).click();
});

Cypress.Commands.add('selectPlaybook', (playbookType: PlaybookType) => {
  // Check form content
  cy.get(`button[name="${playbookType}"]`, { timeout: 20000 }).click();
  cy.contains(`SELECT ${decapitalize(playbookType)}`).click();
  waitMutationWithGame(ONM_SET_PLAYBOOK)
});

Cypress.Commands.add('setCharacterName', (name: string) => {
  // Check form content
  cy.get('input[aria-label="name-input"]').as('nameInput');

  // Check form functionality
  cy.contains(name).click();

  // Submit form
  cy.get('button[data-testid="set-name-button"]', { timeout: 10000 }).click();
});

Cypress.Commands.add(
  'completeLooksForm',
  (
    nameUC: string,
    name: string,
    gender: string,
    clothes: string,
    face: string,
    eyes: string,
    body: string
  ) => {
    // Check form content
    cy.contains(`WHAT DOES ${nameUC} LOOK LIKE?`).should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="name-box"]')
      .should('contain', NAME_TITLE)
      .should('contain', name);

    // Check form functionality
    cy.contains(gender).click();
    cy.get('div[data-testid="looks-box"]', { timeout: 8000 })
      .should('contain', LOOKS_TITLE)
      .should('contain', gender);

    cy.contains(clothes).click();
    cy.get('div[data-testid="looks-box"]', { timeout: 8000 }).should(
      'contain',
      clothes
    );

    cy.contains(face).click();
    cy.get('div[data-testid="looks-box"]', { timeout: 8000 }).should(
      'contain',
      face
    );

    cy.contains(eyes).click();
    cy.get('div[data-testid="looks-box"]', { timeout: 8000 }).should(
      'contain',
      eyes
    );

    cy.contains(body).click();
    cy.get('div[data-testid="looks-box"]', { timeout: 8000 }).should(
      'contain',
      body
    );

    // Should automatically progress
  }
);

Cypress.Commands.add('setCharacterStat', (nameUC: string) => {
  // Check form content
  cy.contains(`WHAT ARE ${nameUC}'S STRENGTHS AND WEAKNESSES`).should('exist');

  // Check form functionality
  cy.get('div[data-testid="stats-option-box-1"]').click();

  // Submit form
  cy.get('button[data-testid="set-stats-button"]', { timeout: 10000 }).click();
});

Cypress.Commands.add(
  'completeGearForm',
  (nameUC: string, clothes: string, items: string[]) => {
    // Check form content
    cy.contains(`WHAT IS ${nameUC}'S GEAR`).should('exist');
    cy.contains(ADD_TEXT).as('addButton');
    cy.get('ul[aria-label="interim-gear-list"]').as('interimGearList');
    cy.get('textarea[aria-label="item-input"]').as('itemInput');

    // Check form functionality
    cy.get('@itemInput').type(clothes);

    cy.get('@addButton').click();
    cy.get('@interimGearList').should('contain', clothes);

    items.forEach((item) => {
      cy.contains(item).click();
      cy.get('@addButton').click();
      cy.get('@interimGearList').should('contain', item);
    });

    // Submit form
    cy.get('button[data-testid="set-gear-button"]', { timeout: 10000 }).click();
  }
);

Cypress.Commands.add(
  'setVehicleOptions',
  (option1: string, option2: string, option3: string, targetBox: string) => {
    cy.get(`div[data-testid="${targetBox}-tags-box"]`).as(`${targetBox}Box`);
    cy.get(`div[data-testid="${option1}-option-pill"]`).as(`${option1}Option`);
    cy.get(`div[data-testid="${option2}-option-pill"]`).as(`${option2}Option`);
    cy.get(`div[data-testid="${option3}-option-pill"]`).as(`${option3}Option`);

    cy.get(`@${option1}Option`).click();
    cy.get(`@${targetBox}Box`).should('contain', option1);

    cy.get(`@${option2}Option`).click();
    cy.get(`@${targetBox}Box`).should('contain', option1);
    cy.get(`@${targetBox}Box`).should('contain', option2);

    cy.get(`@${option3}Option`).click();
    cy.get(`@${targetBox}Box`).should('contain', option1);
    cy.get(`@${targetBox}Box`).should('contain', option2);
    cy.get(`@${targetBox}Box`).should('not.contain', option3);

    cy.get(`@${option2}Option`).click();
    cy.get(`@${targetBox}Box`).should('contain', option1);
    cy.get(`@${targetBox}Box`).should('not.contain', option2);
    cy.get(`@${targetBox}Box`).should('not.contain', option3);

    cy.get(`@${option3}Option`).click();
    cy.get(`@${targetBox}Box`).should('contain', option1);
    cy.get(`@${targetBox}Box`).should('not.contain', option2);
    cy.get(`@${targetBox}Box`).should('contain', option3);
  }
);

Cypress.Commands.add('openMovesPanelBox', (boxTitle: string) => {
  cy.get('div[role="tablist"]').within(() => {
    cy.contains('Playbook', { timeout: 8000 }).should('be.visible'); // Wait for character to load
    cy.contains('Moves').click();
  });

  cy.contains(boxTitle).click();
});

Cypress.Commands.add('openPlaybookPanel', () => {
  cy.get('div[role="tablist"]').within(() => {
    cy.contains('Playbook', { timeout: 8000 }).click();
  });
  cy.wait(generateWaitAlias(ONQ_DEATH_MOVES))
  cy.wait(generateWaitAlias(ONQ_PLAYBOOK))
});

Cypress.Commands.add(
  'checkMoveMessage',
  (messageTitle: string, snippet: string, stat?: StatType) => {
    cy.get('div[data-testid="messages-panel"]').within(() => {
      cy.contains(messageTitle, { timeout: 6000 })
        .scrollIntoView()
        .should('be.visible');
      cy.contains(snippet);
      !!stat && cy.contains(stat);
    });
  }
);

Cypress.Commands.add(
  'checkPrintMove',
  (characterName: string, moveName: string, moveSnippet: string) => {
    const messageTitle = `${characterName?.toUpperCase()}: ${moveName}`;
    cy.contains(decapitalize(moveName)).click();
    waitMutationWithGame(ONM_PERFORM_PRINT)
    cy.checkMoveMessage(messageTitle, moveSnippet);
  }
);

Cypress.Commands.add(
  'checkRollMove',
  (
    characterName: string,
    moveName: string,
    moveSnippet: string,
    rollStat: StatType,
    operationName?: string
  ) => {
    const messageTitle = `${characterName?.toUpperCase()}: ${moveName}`;
    cy.contains(decapitalize(moveName)).click();
    operationName && waitMutationWithGame(operationName)
    cy.checkMoveMessage(messageTitle, moveSnippet, rollStat);
  }
);
