import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockMcContentQuery } from '../../../tests/mockQueries';
import { mockMcContent } from '../../../tests/mocks';
import { customRenderForComponent } from '../../../tests/test-utils';
import CoreBox from '../CoreBox';

describe('Rendering CoreBox', () => {
  const boxTitle = 'The master of ceremonies';
  beforeEach(() => {
    customRenderForComponent(<CoreBox />, {
      isAuthenticated: true,
      apolloMocks: [mockMcContentQuery],
      injectedMcContent: mockMcContent,
    });
  });

  test('should render CoreBox in initial state', () => {
    screen.getByRole('heading', { name: boxTitle });
    screen.getByTestId(`${boxTitle.toLowerCase()}-down-chevron`);
  });

  test('should reveal and hide sub-components', async () => {
    const openButton = await screen.findByTestId(
      `${boxTitle.toLowerCase()}-down-chevron`
    );
    await userEvent.click(openButton);
    screen.getByRole('heading', { name: mockMcContent.core[0].title });
    screen.getByRole('heading', { name: mockMcContent.core[1].title });
    screen.getByRole('heading', { name: mockMcContent.core[2].title });
    screen.getByRole('heading', { name: mockMcContent.core[3].title });
    screen.getByTestId(`${boxTitle.toLowerCase()}-up-chevron`);
  });
});
