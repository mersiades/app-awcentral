import React from 'react';
import { InMemoryCache } from '@apollo/client';
import userEvent from '@testing-library/user-event';

import {
  mockGame1,
  mockGame7,
  mockKeycloakUser1,
  mockKeycloakUser2,
  mockKeycloakUserInfo1,
  mockKeycloakUserInfo2,
  mockPlaybookCreatorAngel,
} from './mocks';
import App from '../components/App';
import { RenderResult, renderWithRouter, waitOneTick } from './test-utils';
import { mockKeycloakStub } from '../../__mocks__/@react-keycloak/web';
import { MockedResponse } from '@apollo/client/testing';
import GAME, { GameData } from '../queries/game';
import SPEND_EXPERIENCE, { SpendExperienceData } from '../mutations/spendExperience';
import PLAYBOOK_CREATOR, { PlaybookCreatorData } from '../queries/playbookCreator';
import { mockAddAngelMove1, mockCoolMax2 } from './mockData/mockMoves';
import ADJUST_IMPROVEMENTS, { AdjustImprovementsData } from '../mutations/adjustImprovements';
import { mockSharpMax2AsCM } from './mockData/mockCharacterMoves';

jest.mock('@react-keycloak/web', () => {
  const originalModule = jest.requireActual('@react-keycloak/web');
  return {
    ...originalModule,
    useKeycloak: () => ({ keycloak: mockKeycloakStub(true, mockKeycloakUserInfo1), initialized: true }),
  };
});

const mockGameQuery1: MockedResponse<GameData> = {
  request: {
    query: GAME,
    variables: { gameId: mockGame7.id },
  },
  result: {
    data: {
      game: {
        ...mockGame7,
        gameRoles: [
          {
            ...mockGame7.gameRoles[2],
            characters: [
              {
                ...mockGame7.gameRoles[2].characters[0],
                experience: 8,
              },
            ],
          },
        ],
      },
    },
  },
};

const mockGameQuery2: MockedResponse<GameData> = {
  request: {
    query: GAME,
    variables: { gameId: mockGame7.id },
  },
  result: {
    data: {
      game: {
        ...mockGame7,
        gameRoles: [
          {
            ...mockGame7.gameRoles[2],
            characters: [
              {
                ...mockGame7.gameRoles[2].characters[0],
                experience: 3,
                improvementMoves: [mockSharpMax2AsCM],
              },
            ],
          },
        ],
      },
    },
  },
};

const mockSendExperienceMutation: MockedResponse<SpendExperienceData> = {
  request: {
    query: SPEND_EXPERIENCE,
    variables: { gameRoleId: mockGame7.gameRoles[2].id, characterId: mockGame7.gameRoles[2].characters[0].id },
  },
  result: () => {
    // console.log('mockSendExperienceMutation');
    return {
      data: {
        spendExperience: {
          id: mockGame7.gameRoles[2].characters[0].id,
          name: mockGame7.gameRoles[2].characters[0].name as string,
          playbook: mockGame7.gameRoles[2].characters[0].playbook,
          experience: 3,
          allowedImprovements: 1,
          allowedPlaybookMoves: mockGame7.gameRoles[2].characters[0].allowedPlaybookMoves,
          allowedOtherPlaybookMoves: mockGame7.gameRoles[2].characters[0].allowedOtherPlaybookMoves,
          __typename: 'Character',
        },
      },
    };
  },
};

const mockPlaybookCreatorQuery: MockedResponse<PlaybookCreatorData> = {
  request: {
    query: PLAYBOOK_CREATOR,
    variables: { playbookType: mockGame7.gameRoles[2].characters[0].playbook },
  },
  result: () => {
    // console.log('mockPlaybookCreatorQuery');
    return {
      data: {
        playbookCreator: mockPlaybookCreatorAngel,
      },
    };
  },
};

const mockAdjustImprovementsMutation2: MockedResponse<AdjustImprovementsData> = {
  request: {
    query: ADJUST_IMPROVEMENTS,
    variables: {
      gameRoleId: mockGame7.gameRoles[2].id,
      characterId: mockGame7.gameRoles[2].characters[0].id,
      improvementIds: [mockAddAngelMove1.id],
      futureImprovementIds: [],
    },
  },
  result: () => {
    // console.log('mockAdjustImprovementsMutation');
    return {
      data: {
        adjustImprovements: {
          id: mockGame7.gameRoles[2].characters[0].id,
          name: mockGame7.gameRoles[2].characters[0].name as string,
          playbook: mockGame7.gameRoles[2].characters[0].playbook,
          allowedImprovements: 1,
          allowedOtherPlaybookMoves: mockGame7.gameRoles[2].characters[0].allowedOtherPlaybookMoves,
          characterMoves: mockGame7.gameRoles[2].characters[0].characterMoves.map((cm) => ({
            id: cm.id,
            name: cm.name,
            __typename: 'CharacterMove',
          })),
          improvementMoves: [{ id: 'mock-id', name: mockAddAngelMove1.name, __typename: 'CharacterMove' }],
          futureImprovementMoves: [],
          __typename: 'Character',
        },
      },
    };
  },
};

describe.skip('Testing navigation after selecting character improvement', () => {
  let screen: RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement>;
  let cache = new InMemoryCache();
  const originalScrollIntoView = window.HTMLElement.prototype.scrollIntoView;
  const mockScrollIntoView = jest.fn();

  beforeEach(async () => {
    window.HTMLElement.prototype.scrollIntoView = mockScrollIntoView;
    cache = new InMemoryCache();
    screen = renderWithRouter(<App />, `/player-game/${mockGame7.id}`, {
      isAuthenticated: true,
      apolloMocks: [
        mockGameQuery1,
        mockSendExperienceMutation,
        mockPlaybookCreatorQuery,
        mockAdjustImprovementsMutation2,
        mockGameQuery2,
      ],
      keycloakUser: mockKeycloakUser1,
      injectedUserId: mockKeycloakUser1.id,
      cache,
    });

    await waitOneTick(); // wait for game query
    userEvent.click(screen.getByRole('tab', { name: 'Playbook' }));
    userEvent.click(screen.getByRole('button', { name: 'IMPROVE' }));
    await waitOneTick(); // wait for spendExperience mutation
  });

  afterEach(() => {
    window.HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
  });

  describe('when ADD_CHARACTER_MOVE improvement is selected', () => {
    test('should close dialog and stay on PlayerPage', async () => {
      expect(screen.getByRole('heading', { name: 'Improvements' })).toBeInTheDocument();
      const addCharMoveCheckbox = screen.getAllByRole('checkbox', {
        name: mockAddAngelMove1.description,
      })[0] as HTMLInputElement;
      userEvent.click(addCharMoveCheckbox);
      userEvent.click(screen.getByRole('button', { name: 'SET' }));
      await waitOneTick(); // wait for adjustImprovement mutation
      expect(screen.queryByRole('heading', { name: 'Improvements' })).not.toBeInTheDocument();
      screen.getByRole('heading', { name: "WHAT ARE MOCK CHARACTER 2'S MOVES?" });
    });
  });
});
