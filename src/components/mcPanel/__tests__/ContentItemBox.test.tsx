import { screen } from '@testing-library/react';
import { mockContentItem1 } from '../../../tests/mocks';
import { customRenderForComponent } from '../../../tests/test-utils';
import ContentItemBox from '../ContentItemBox';
import userEvent from '@testing-library/user-event';

describe('Rendering ContentItemBox', () => {
  beforeEach(() => {
    customRenderForComponent(<ContentItemBox contentItem={mockContentItem1} />);
  });

  test('should render ContentItemBox in initial state', () => {
    screen.getByRole('heading', { name: mockContentItem1.title });
    screen.getByTestId(`${mockContentItem1.title}-down-icon`);
  });

  test('should reveal and hide content when clicking chevron', async () => {
    await userEvent.click(screen.getByTestId(`${mockContentItem1.title}-down-icon`));
    screen.getByTestId(`${mockContentItem1.title}-up-icon`);
    screen.getByText(mockContentItem1.content);
    await userEvent.click(screen.getByTestId(`${mockContentItem1.title}-up-icon`));
    screen.getByTestId(`${mockContentItem1.title}-down-icon`);
  });

  test('should reveal and hide content when clicking title', async () => {
    await userEvent.click(
      screen.getByRole('heading', { name: mockContentItem1.title })
    );
    screen.getByTestId(`${mockContentItem1.title}-up-icon`);
    screen.getByText(mockContentItem1.content);
    await userEvent.click(
      screen.getByRole('heading', { name: mockContentItem1.title })
    );
    screen.getByTestId(`${mockContentItem1.title}-down-icon`);
  });
});
