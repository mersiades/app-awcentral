import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import McHarmBox from '../McHarmBox';
import { mockMcContentQuery } from '../../../tests/mockQueries';
import { mockMcContent } from '../../../tests/mocks';
import { customRenderForComponent } from '../../../tests/test-utils';

describe('Rendering McHarmBox', () => {
  const boxTitle = 'Harm rules';
  beforeEach(() => {
    customRenderForComponent(<McHarmBox />, {
      isAuthenticated: true,
      apolloMocks: [mockMcContentQuery],
    });
  });

  test('should render McHarmBox in initial state', () => {
    screen.getByRole('heading', { name: boxTitle });
    screen.getByTestId(`${boxTitle.toLowerCase()}-down-chevron`);
  });

  test('should reveal and hide sub-components', async () => {
    const openButton = await screen.findByTestId(
      `${boxTitle.toLowerCase()}-down-chevron`
    );
    await screen.findByRole('heading', { name: boxTitle });
    userEvent.click(openButton);
    screen.getByRole('heading', { name: mockMcContent.harm[0].title });
    screen.getByRole('heading', { name: mockMcContent.harm[1].title });
    screen.getByTestId(`${boxTitle.toLowerCase()}-up-chevron`);
  });
});
