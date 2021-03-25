import { screen } from '@testing-library/react';
import { mockTickerList1 } from '../../../tests/mocks';
import { customRenderForComponent } from '../../../tests/test-utils';
import TickerListBox from '../TickerListBox';
import userEvent from '@testing-library/user-event';

describe('Rendering TickerListBox', () => {
  beforeEach(() => {
    customRenderForComponent(<TickerListBox tickerList={mockTickerList1} />);
  });

  test('should render TickerListBox in initial state', () => {
    screen.getByRole('heading', { name: mockTickerList1.title });
    screen.getByTestId(`${mockTickerList1.title}-down-icon`);
  });

  test('should reveal and hide content when clicking on chevron', () => {
    userEvent.click(screen.getByTestId(`${mockTickerList1.title}-down-icon`));
    screen.getByTestId(`${mockTickerList1.title}-up-icon`);
    screen.getByText(mockTickerList1.items[0]);
    screen.getByText(mockTickerList1.items[1]);
    userEvent.click(screen.getByTestId(`${mockTickerList1.title}-up-icon`));
    screen.getByTestId(`${mockTickerList1.title}-down-icon`);
  });

  test('should reveal and hide content when clicking on title', () => {
    userEvent.click(screen.getByRole('heading', { name: mockTickerList1.title }));
    screen.getByTestId(`${mockTickerList1.title}-up-icon`);
    screen.getByText(mockTickerList1.items[0]);
    screen.getByText(mockTickerList1.items[1]);
    userEvent.click(screen.getByRole('heading', { name: mockTickerList1.title }));
    screen.getByTestId(`${mockTickerList1.title}-down-icon`);
  });
});
