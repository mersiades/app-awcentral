import { screen } from '@testing-library/react';

import CharacterPreview from '../CharacterPreview';
import { mockCharacter2 } from '../../tests/mocks';
import { customRenderForComponent } from '../../tests/test-utils';
import { decapitalize } from '../../helpers/decapitalize';
import { CharacterStat } from '../../@types/dataInterfaces';

describe('Rendering CharacterPreview', () => {
  test('should render CharacterPreview for player', async () => {
    customRenderForComponent(
      <CharacterPreview character={mockCharacter2} isMc={false} />
    );

    screen.getByTestId('harm-clock');
    const name = screen.getByTestId('character-preview-name');
    expect(name.textContent).toEqual(
      `${mockCharacter2.name} the ${decapitalize(mockCharacter2.playbook)}`
    );
    const looks = screen.getByTestId('character-preview-looks');
    mockCharacter2.looks.forEach((look) =>
      expect(looks.textContent).toContain(look.look)
    );
  });

  test('should render CharacterPreview for MC', async () => {
    customRenderForComponent(
      <CharacterPreview character={mockCharacter2} isMc={true} />
    );

    screen.getByTestId('harm-clock');
    const highlightedStats = mockCharacter2.statsBlock?.stats.filter(
      (stat) => stat.isHighlighted
    ) as CharacterStat[];
    screen.getByRole('heading', { name: 'Highlighted stats' });
    screen.getByRole('heading', {
      name: `${highlightedStats[0].stat.toLowerCase()}-value`,
    });
    screen.getByRole('heading', { name: highlightedStats[0].stat });
    screen.getByRole('heading', {
      name: `${highlightedStats[1].stat.toLowerCase()}-value`,
    });
    screen.getByRole('heading', { name: highlightedStats[1].stat });
    screen.getByRole('heading', { name: 'Barter' });
    screen.getByRole('heading', { name: mockCharacter2.barter?.toString() });
    screen.getByRole('heading', { name: 'Moves' });
    screen.getByRole('heading', { name: 'Gear' });
    expect(screen.getAllByRole('list')).toHaveLength(2);
  });
});
