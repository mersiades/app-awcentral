import React from 'react';
import userEvent from '@testing-library/user-event';
import { InMemoryCache } from '@apollo/client';
import { screen } from '@testing-library/react';

import CharacterLooksForm from '../CharacterLooksForm';
import { mockKeycloakStub } from '../../../../__mocks__/@react-keycloak/web';
import { blankCharacter, mockCharacter2, mockGame5, mockKeycloakUserInfo1 } from '../../../tests/mocks';
import { renderWithRouter } from '../../../tests/test-utils';
import {
  mockPlaybookCreator,
  mockSetCharacterLook1,
  mockSetCharacterLook2,
  mockSetCharacterLook3,
  mockSetCharacterLook4,
  mockSetCharacterLook5,
  mockSetCharacterLook6,
} from '../../../tests/mockQueries';
import { Game } from '../../../@types/dataInterfaces';
import {
  mockLookAngel1,
  mockLookAngel3,
  mockLookAngel5,
  mockLookAngel7,
  mockLookAngel9,
} from '../../../tests/fixtures/lookFixtures';

jest.mock('@react-keycloak/web', () => {
  const originalModule = jest.requireActual('@react-keycloak/web');
  return {
    ...originalModule,
    useKeycloak: () => ({ keycloak: mockKeycloakStub(true, mockKeycloakUserInfo1), initialized: true }),
  };
});

describe('Rendering CharacterLooksForm', () => {
  let cache = new InMemoryCache();
  const mockGame: Game = {
    ...mockGame5,
    gameRoles: [
      mockGame5.gameRoles[0],
      mockGame5.gameRoles[1],
      {
        id: mockGame5.gameRoles[2].id,
        role: mockGame5.gameRoles[2].role,
        userId: mockGame5.gameRoles[2].userId,
        gameName: mockGame5.gameRoles[2].gameName,
        gameId: mockGame5.gameRoles[2].gameId,
        npcs: mockGame5.gameRoles[2].npcs,
        threats: mockGame5.gameRoles[2].threats,
        characters: [
          {
            ...blankCharacter,
            id: mockCharacter2.id,
            playbook: mockCharacter2.playbook,
            name: mockCharacter2.name,
          },
        ],
      },
    ],
  };

  beforeEach(() => {
    cache = new InMemoryCache();
  });

  test('should render CharacterLooksForm in initial state', async () => {
    renderWithRouter(<CharacterLooksForm />, `/character-creation/${mockGame5.id}?step=3`, {
      isAuthenticated: true,
      injectedGame: mockGame,
      apolloMocks: [mockPlaybookCreator],
      injectedUserId: mockKeycloakUserInfo1.sub,
      cache,
    });

    await screen.findByTestId('character-looks-form');
    await screen.findByRole('heading', { name: `WHAT DOES ${mockCharacter2.name?.toUpperCase()} LOOK LIKE?` });
    screen.getByRole('heading', { name: 'GENDER' });
    screen.getByRole('heading', { name: 'CLOTHES' });
    screen.getByRole('heading', { name: 'FACE' });
    screen.getByRole('heading', { name: 'EYES' });
    screen.getByRole('heading', { name: 'BODY' });
    screen.getByRole('textbox', { name: 'gender-input' });
    screen.getByTestId(`${mockLookAngel1.look}-pill`);
  });

  test('should set all Looks by clicking on pills', async () => {
    renderWithRouter(<CharacterLooksForm />, `/character-creation/${mockGame5.id}?step=3`, {
      isAuthenticated: true,
      injectedGame: mockGame,
      apolloMocks: [
        mockPlaybookCreator,
        mockSetCharacterLook1,
        mockSetCharacterLook2,
        mockSetCharacterLook3,
        mockSetCharacterLook4,
        mockSetCharacterLook5,
      ],
      injectedUserId: mockKeycloakUserInfo1.sub,
      cache,
    });
    await screen.findByTestId('character-looks-form');
    let lookPill = screen.getByTestId(`${mockLookAngel1.look}-pill`);
    userEvent.click(lookPill);
    screen.getByRole('textbox', { name: 'clothes-input' });
    lookPill = screen.getByTestId(`${mockLookAngel3.look}-pill`);
    userEvent.click(lookPill);
    screen.getByRole('textbox', { name: 'face-input' });
    lookPill = screen.getByTestId(`${mockLookAngel5.look}-pill`);
    userEvent.click(lookPill);
    screen.getByRole('textbox', { name: 'eyes-input' });
    lookPill = screen.getByTestId(`${mockLookAngel7.look}-pill`);
    userEvent.click(lookPill);
    screen.getByRole('textbox', { name: 'body-input' });
    lookPill = screen.getByTestId(`${mockLookAngel9.look}-pill`);
    userEvent.click(lookPill);
  });

  test('should set Look using text input', async () => {
    renderWithRouter(<CharacterLooksForm />, `/character-creation/${mockGame5.id}?step=3`, {
      isAuthenticated: true,
      injectedGame: mockGame,
      apolloMocks: [mockPlaybookCreator, mockSetCharacterLook6],
      injectedUserId: mockKeycloakUserInfo1.sub,
      cache,
    });
    await screen.findByTestId('character-looks-form');
    const genderInput = screen.getByRole('textbox', { name: 'gender-input' }) as HTMLInputElement;
    userEvent.type(genderInput, mockLookAngel1.look);
    expect(genderInput.value).toEqual(mockLookAngel1.look);
    const setButton = screen.getByRole('button', { name: 'SET' });
    userEvent.click(setButton);
    screen.getByRole('textbox', { name: 'clothes-input' });
  });
});
