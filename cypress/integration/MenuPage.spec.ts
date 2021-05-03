import react from 'react';

const mockGameRolesByUserIdQueryResponse = [
  {
    id: 'a different id',
    role: 'MC',
    gameId: 'Hello World',
    gameName: 'Hello World',
    characters: [
      { id: '5506f006-a0f1-4797-ba6b-d60079a8d103', __typename: 'Character' },
      { id: '2e28a1fc-4674-435c-ad51-b5b81e176d10', __typename: 'Character' },
    ],
    __typename: 'GameRole',
  },
  {
    id: '9a5da220-2a53-47e1-8728-8640101f3bbe',
    role: 'MC',
    gameId: 'Hello World',
    gameName: 'Hello World',
    characters: [
      { id: '3ae41e8e-63b6-4a2a-adab-27990d455c8c', __typename: 'Character' },
      { id: 'f4c7239c-1a2e-4f4c-a012-a235b2c361d3', __typename: 'Character' },
    ],
    __typename: 'GameRole',
  },
];

const mockMcContentQueryResponse = {
  id: 'ca55164f-4aac-4026-b8db-7de12db770c6',
  firstSessionContent: {
    id: 'dcc0ccec-53c8-4fe5-88ef-4986e6bb92f4',
    intro: 'Hello World',
    duringCharacterCreation: {
      id: '46c306d1-a991-4c61-bc55-65e2987d36d8',
      title: 'Hello World',
      content: 'Hello World',
      __typename: 'ContentItem',
    },
    duringFirstSession: {
      id: 'ec68c150-86af-45e6-b439-3cdeeac58177',
      title: 'Hello World',
      items: ['Hello World', 'Hello World'],
      __typename: 'TickerList',
    },
    threatMapInstructions: {
      id: '0262a13b-028f-4a59-909d-1aa068619557',
      title: 'Hello World',
      content: 'Hello World',
      __typename: 'ContentItem',
    },
    afterFirstSession: {
      id: '11785d67-1e44-4643-9fc3-b7e59d917b6f',
      title: 'Hello World',
      items: ['Hello World', 'Hello World'],
      __typename: 'TickerList',
    },
    __typename: 'FirstSessionContent',
  },
  decisionMaking: {
    id: 'a3a1dbc8-c219-4311-afcf-f78cf37addf1',
    title: 'Hello World',
    content: 'Hello World',
    __typename: 'ContentItem',
  },
  core: [
    {
      id: 'bab3e1fb-a8a0-4ba6-b0af-5927931402c7',
      title: 'Hello World',
      items: ['Hello World', 'Hello World'],
      __typename: 'TickerList',
    },
    {
      id: 'd1bdb735-ba7e-48d5-9a3d-10acb9a23182',
      title: 'Hello World',
      items: ['Hello World', 'Hello World'],
      __typename: 'TickerList',
    },
  ],
  harm: [
    {
      id: 'b463785d-af91-4f33-a324-8ad4d927a138',
      title: 'Hello World',
      content: 'Hello World',
      __typename: 'ContentItem',
    },
    {
      id: '01254f4a-1367-47dc-9e77-be0bec0b6ddb',
      title: 'Hello World',
      content: 'Hello World',
      __typename: 'ContentItem',
    },
  ],
  selected: [
    {
      id: 'f25d4a2f-5c65-462b-a843-680154bde11b',
      title: 'Hello World',
      content: 'Hello World',
      __typename: 'ContentItem',
    },
    {
      id: '7a60f1ea-200e-44ba-81df-8b2ec674a56b',
      title: 'Hello World',
      content: 'Hello World',
      __typename: 'ContentItem',
    },
  ],
  __typename: 'McContent',
};
describe('My First Test', () => {
  it('finds the content "type"', () => {
    cy.readFile('./introspection.schema.graphql').then((schema) => {
      cy.mockNetwork({ schema });
    });
    cy.kcLogout();
    cy.kcLogin('dave');
    cy.visit('/');
    cy.mockNetworkAdd({
      Query: () => ({
        mcContent: () => mockMcContentQueryResponse,
        gameRolesByUserId: () => mockGameRolesByUserIdQueryResponse,
      }),
    });
  });
});
