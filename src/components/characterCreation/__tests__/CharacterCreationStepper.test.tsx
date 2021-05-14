import react from 'react';
import { InMemoryCache } from '@apollo/client';
import { screen } from '@testing-library/react';
import { Character, Game } from '../../../@types/dataInterfaces';
import { UniqueTypes } from '../../../@types/enums';
import { decapitalize } from '../../../helpers/decapitalize';
import { mockAngel_fresh, mockAngel_readyToAddMoves } from '../../../tests/fixtures/characterFixtures';
import { mockGame5, mockKeycloakUserInfo1 } from '../../../tests/mocks';
import { renderWithRouter } from '../../../tests/test-utils';
import CharacterCreationStepper from '../CharacterCreationStepper';
import {
  BATTLE_VEHICLES_TITLE,
  GEAR_TITLE,
  LOOKS_TITLE,
  MOVES_TITLE,
  NAME_TITLE,
  PLAYBOOK_TITLE,
  STATS_TITLE,
  VEHICLES_TITLE,
} from '../../../config/constants';

const generateGame = (character: Character): Game => ({
  ...mockGame5,
  gameRoles: [
    mockGame5.gameRoles[0],
    mockGame5.gameRoles[1],
    {
      ...mockGame5.gameRoles[2],
      characters: [character],
    },
  ],
});
describe('Rendering CharacterCreationStepper', () => {
  let cache: InMemoryCache;
  const uniqueType = mockAngel_fresh.playbookUniques?.angelKit?.uniqueType;

  beforeEach(() => {
    cache = new InMemoryCache();
  });

  describe('with Angel setting name', () => {
    beforeEach(async () => {
      renderWithRouter(<CharacterCreationStepper />, `/character-creation/${mockGame5.id}?step=2`, {
        isAuthenticated: true,
        injectedGame: generateGame(mockAngel_fresh),
        apolloMocks: [],
        injectedUserId: mockKeycloakUserInfo1.sub,
        cache,
      });
      // await waitOneTick();
    });

    test('should render playbook, name title, looks title, stats title and gear title', () => {
      expect(screen.getByText(PLAYBOOK_TITLE)).toBeInTheDocument();
      expect(screen.getByText(decapitalize(mockAngel_fresh.playbook))).toBeInTheDocument();
      expect(screen.getByText(NAME_TITLE)).toBeInTheDocument();
      expect(screen.getByText(LOOKS_TITLE)).toBeInTheDocument();
      expect(screen.getByText(STATS_TITLE)).toBeInTheDocument();
      expect(screen.getByText(GEAR_TITLE)).toBeInTheDocument();

      // The following stpper boxes are not on screen yet (off the the right)
      expect(screen.queryByText(decapitalize(MOVES_TITLE))).not.toBeInTheDocument();
      expect(screen.queryByText(decapitalize(uniqueType as UniqueTypes))).not.toBeInTheDocument();
    });
  });

  describe('with Angel on Moves screen', () => {
    beforeEach(async () => {
      renderWithRouter(<CharacterCreationStepper />, `/character-creation/${mockGame5.id}?step=7`, {
        isAuthenticated: true,
        injectedGame: generateGame(mockAngel_readyToAddMoves),
        apolloMocks: [],
        injectedUserId: mockKeycloakUserInfo1.sub,
        cache,
      });

      // await waitOneTick();
    });

    test('should render stepper with gear, angel kit, moves and vehicles (title only)', () => {
      expect(screen.queryByText(STATS_TITLE)).not.toBeInTheDocument();
      expect(screen.getByText(GEAR_TITLE)).toBeInTheDocument();
      expect(screen.getByText(mockAngel_readyToAddMoves.gear[0])).toBeInTheDocument();
      expect(screen.getByText(mockAngel_readyToAddMoves.gear[1])).toBeInTheDocument();
      expect(screen.getByText(decapitalize(uniqueType as UniqueTypes))).toBeInTheDocument();
      expect(screen.getByText(MOVES_TITLE)).toBeInTheDocument();
      expect(screen.getByText(decapitalize(mockAngel_readyToAddMoves.characterMoves[0].name))).toBeInTheDocument();
      expect(screen.getByText(VEHICLES_TITLE)).toBeInTheDocument();
      expect(screen.queryByText(BATTLE_VEHICLES_TITLE)).not.toBeInTheDocument();
    });
  });

  describe('with complete Angel on Hx screen', () => {});

  describe('with Angel changing playbooks on Playbooks screen', () => {});
});
