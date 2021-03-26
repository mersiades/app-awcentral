import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SelectedBox from '../SelectedBox';
import { mockMcContentQuery } from '../../../tests/mockQueries';
import { mockMcContent } from '../../../tests/mocks';
import { customRenderForComponent } from '../../../tests/test-utils';

describe('Rendering SelectedBox', () => {
  const boxTitle = 'Selected MC rules';
  beforeEach(() => {
    customRenderForComponent(<SelectedBox />, {
      isAuthenticated: true,
      apolloMocks: [mockMcContentQuery],
    });
  });

  test('should render SelectedBox in initial state', () => {
    screen.getByRole('heading', { name: boxTitle });
    screen.getByTestId(`${boxTitle.toLowerCase()}-down-chevron`);
  });

  test('should reveal and hide sub-components', async () => {
    const openButton = await screen.findByTestId(`${boxTitle.toLowerCase()}-down-chevron`);
    await screen.findByRole('heading', { name: boxTitle });
    userEvent.click(openButton);
    screen.getByRole('heading', { name: mockMcContent.selected[0].title });
    screen.getByRole('heading', { name: mockMcContent.selected[1].title });
    screen.getByTestId(`${boxTitle.toLowerCase()}-up-chevron`);
  });
});
