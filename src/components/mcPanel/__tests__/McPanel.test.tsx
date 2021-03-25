import { screen } from '@testing-library/react';

import McPanel from '../McPanel';
import { customRenderForComponent } from '../../../tests/test-utils';

describe('Rendering McPanel', () => {
  const coreTitle = 'The master of ceremonies';
  const harmTitle = 'Harm rules';
  const firstSessionTitle = 'First session';
  const selectedTitle = 'Selected MC rules';

  beforeEach(() => {
    customRenderForComponent(<McPanel />);
  });

  test('should render McPanel in initial state', () => {
    screen.getByRole('heading', { name: selectedTitle });
    screen.getByTestId(`${selectedTitle.toLowerCase()}-down-chevron`);
    screen.getByRole('heading', { name: coreTitle });
    screen.getByTestId(`${coreTitle.toLowerCase()}-down-chevron`);
    screen.getByRole('heading', { name: harmTitle });
    screen.getByTestId(`${harmTitle.toLowerCase()}-down-chevron`);
    screen.getByRole('heading', { name: firstSessionTitle });
    screen.getByTestId(`${firstSessionTitle.toLowerCase()}-down-chevron`);
  });
});
