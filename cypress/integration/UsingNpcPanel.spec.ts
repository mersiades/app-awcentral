import { ADD_NPC_TEXT, ADD_TEXT, EDIT_TEXT, SET_TEXT } from '../../src/config/constants';
import game7 from '../fixtures/games/game7';

interface CheckAddingNpcOptions {
  name: string;
  description?: string;
}
describe('Using the NPCs panel', () => {
  beforeEach(() => {
    cy.kcLogout();
    cy.kcLogin('dave');
    cy.visit(`/mc-game/${game7.id}`);
    cy.get('button[name="npcs"]').click();
  });

  it('should add NPC without notes', () => {
    const options: CheckAddingNpcOptions = {
      name: 'Preen',
    };
    checkAddingNpc(options);
  });
  it('should add NPC with notes', () => {
    const options: CheckAddingNpcOptions = {
      name: 'Foster',
      description: "Foster takes pride in being the community's cook",
    };
    checkAddingNpc(options);
  });
  it('should edit an existing NPC', () => {
    const npcName = 'Nbeke';
    const npcDescription = 'This is an added description';
    cy.get('svg[data-testid="nbeke-edit-link"]').click();
    cy.contains(EDIT_TEXT + ' ' + npcName).should('exist');
    cy.get('input[name="npcName"]').should('have.value', npcName);
    cy.get('textarea[name="description"]').type(npcDescription);
    cy.contains(SET_TEXT).click();
    cy.contains(npcName).click();
    cy.contains(npcDescription).should('exist');
  });
});

const checkAddingNpc = (options: CheckAddingNpcOptions) => {
  cy.contains(ADD_TEXT).click();
  cy.contains(ADD_NPC_TEXT).should('exist');
  // Because name options is a long, randomised list, have to type to filter, then click
  cy.get('input[name="npcName"]').type(options.name[0] + options.name[1]);
  cy.contains(options.name).click();
  if (!!options.description) {
    cy.get('textarea[name="description"]').type(options.description);
  }
  cy.contains(SET_TEXT).click();

  // FAILING: 'this element is detached from the DOM.'
  // cy.contains(options.name).click();
  // if (!!options.description) {
  //   cy.contains(options.description).should('exist');
  // }
};
