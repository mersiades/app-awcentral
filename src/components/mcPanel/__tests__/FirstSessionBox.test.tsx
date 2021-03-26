import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FirstSessionBox from '../FirstSessionBox';
import { mockMcContentQuery } from '../../../tests/mockQueries';
import { mockMcContent } from '../../../tests/mocks';
import { customRenderForComponent } from '../../../tests/test-utils';

describe('Rendering FirstSessionBox', () => {
  const boxTitle = 'First session';
  beforeEach(() => {
    customRenderForComponent(<FirstSessionBox />, {
      isAuthenticated: true,
      apolloMocks: [mockMcContentQuery],
    });
  });

  test('should render FirstSessionBox in initial state', () => {
    screen.getByRole('heading', { name: boxTitle });
    screen.getByTestId(`${boxTitle.toLowerCase()}-down-chevron`);
  });

  test('should reveal and hide sub-components', async () => {
    const openButton = await screen.findByTestId(`${boxTitle.toLowerCase()}-down-chevron`);
    await screen.findByRole('heading', { name: boxTitle });
    userEvent.click(openButton);
    screen.getByText(mockMcContent.firstSessionContent.intro);
    screen.getByRole('heading', { name: mockMcContent.firstSessionContent.duringCharacterCreation.title });
    screen.getByRole('heading', { name: mockMcContent.firstSessionContent.duringFirstSession.title });
    screen.getByRole('heading', { name: mockMcContent.firstSessionContent.threatMapInstructions.title });
    screen.getByRole('heading', { name: mockMcContent.firstSessionContent.afterFirstSession.title });
    screen.getByTestId(`${boxTitle.toLowerCase()}-up-chevron`);
  });
});
