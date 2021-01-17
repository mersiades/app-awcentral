import React from 'react';
// import wait from 'waait';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { customRenderForComponent } from '../../../tests/test-utils';
import { mockCharacter2, mockPlaybookAngel } from '../../../tests/mocks';
import { mockPlaybook } from '../../../tests/mockQueries';
import { decapitalize } from '../../../helpers/decapitalize';
import PlaybookPanel from '../PlaybookPanel';
import { MoveKinds } from '../../../@types/enums';

describe('Rendering PlaybookPanel', () => {
  test('should render NameAndLooksBox properly', async () => {
    customRenderForComponent(
      <PlaybookPanel
        character={mockCharacter2}
        settingBarter={false}
        adjustingHx={false}
        settingHarm={false}
        togglingHighlight={false}
        handleSetBarter={jest.fn()}
        handleAdjustHx={jest.fn()}
        handleSetHarm={jest.fn()}
        handleToggleHighlight={jest.fn()}
        navigateToCharacterCreation={jest.fn()}
      />,
      {
        isAuthenticated: true,
        apolloMocks: [mockPlaybook],
      }
    );

    // Check Name, Playbook and Looks have been rendered
    const box = await screen.findByTestId('name-looks-box');
    await screen.findByRole('heading', { name: `${mockCharacter2.name} the ${decapitalize(mockCharacter2.playbook)}` });
    // "Mock Character 2 the Angelman, utility wear, kind face, hard eyes, compact body"
    const looks = mockCharacter2.looks.map((look) => look.look);
    expect(box.textContent).toContain(looks.join(', '));
    expect(box.textContent).not.toContain(mockPlaybookAngel.intro);

    // Check that playbook description can be opened and closed
    const downChevron = screen.getByTestId('name-down-chevron');
    userEvent.click(downChevron);
    expect(box.textContent).toContain(mockPlaybookAngel.intro);
    const upChevron = screen.getByTestId('name-up-chevron');
    userEvent.click(upChevron);
    expect(box.textContent).not.toContain(mockPlaybookAngel.intro);
  });

  test('should render BarterBox properly', async () => {
    const mockHandleSetBarter = jest.fn();
    customRenderForComponent(
      <PlaybookPanel
        character={mockCharacter2}
        settingBarter={false}
        adjustingHx={false}
        settingHarm={false}
        togglingHighlight={false}
        handleSetBarter={mockHandleSetBarter}
        handleAdjustHx={jest.fn()}
        handleSetHarm={jest.fn()}
        handleToggleHighlight={jest.fn()}
        navigateToCharacterCreation={jest.fn()}
      />,
      {
        isAuthenticated: true,
        apolloMocks: [mockPlaybook],
      }
    );

    // Check Barter has been rendered with correct value
    await screen.findByRole('heading', { name: /Barter/ });
    expect(screen.getByTestId('barter-value-box').textContent).toEqual(mockCharacter2.barter.toString());

    // Check can increase barter
    const increaseCaret = screen.getByTestId('increase-barter-caret');
    userEvent.click(increaseCaret);
    expect(mockHandleSetBarter).toHaveBeenCalledWith(mockCharacter2.barter + 1);
    mockHandleSetBarter.mockClear();

    // Check can decrease barter
    const decreaseCaret = screen.getByTestId('decrease-barter-caret');
    userEvent.click(decreaseCaret);
    expect(mockHandleSetBarter).toHaveBeenCalledWith(mockCharacter2.barter - 1);
  });

  test('should render HarmBox properly', async () => {
    const mockHandleSetHarm = jest.fn();

    let harm = mockCharacter2.harm;
    customRenderForComponent(
      <PlaybookPanel
        character={mockCharacter2}
        settingBarter={false}
        adjustingHx={false}
        settingHarm={false}
        togglingHighlight={false}
        handleSetBarter={jest.fn()}
        handleAdjustHx={jest.fn()}
        handleSetHarm={mockHandleSetHarm}
        handleToggleHighlight={jest.fn()}
        navigateToCharacterCreation={jest.fn()}
      />,
      {
        isAuthenticated: true,
        apolloMocks: [mockPlaybook],
      }
    );

    // Check HarmBox has been rendered initially
    await screen.findByRole('heading', { name: /Harm/ });
    expect(screen.getByTestId('harm-clock').textContent).toEqual('12369');
    screen.getByRole('checkbox', { name: 'Stabilized' });
    screen.getByRole('checkbox', { name: 'Come back with -1hard' });
    screen.getByRole('checkbox', { name: 'Come back with +1weird (max+3)' });
    screen.getByRole('checkbox', { name: 'Change to a new playbook' });
    screen.getByRole('checkbox', { name: 'Die' });

    // Check can add 1 harm
    const sector0 = screen.getByTestId('harm-sector-0');
    userEvent.click(sector0);
    expect(mockHandleSetHarm).toHaveBeenCalledWith({ ...harm, value: 1 });
    mockHandleSetHarm.mockClear();

    // Check can set stabilised
    userEvent.click(screen.getByRole('checkbox', { name: 'Stabilized' }));
    expect(mockHandleSetHarm).toHaveBeenCalledWith({ ...harm, isStabilized: true });
    mockHandleSetHarm.mockClear();

    // Check can set the four untenable life options
    userEvent.click(screen.getByRole('checkbox', { name: 'Come back with -1hard' }));
    expect(mockHandleSetHarm).toHaveBeenCalledWith({ ...harm, hasComeBackHard: true });
    mockHandleSetHarm.mockClear();
    userEvent.click(screen.getByRole('checkbox', { name: 'Come back with +1weird (max+3)' }));
    expect(mockHandleSetHarm).toHaveBeenCalledWith({ ...harm, hasComeBackWeird: true });
    mockHandleSetHarm.mockClear();
    userEvent.click(screen.getByRole('checkbox', { name: 'Change to a new playbook' }));
    expect(mockHandleSetHarm).toHaveBeenCalledWith({ ...harm, hasChangedPlaybook: true });
    mockHandleSetHarm.mockClear();
    userEvent.click(screen.getByRole('checkbox', { name: 'Die' }));
    expect(mockHandleSetHarm).toHaveBeenCalledWith({ ...harm, hasDied: true });
    mockHandleSetHarm.mockClear();

    // Check can collapse and open HarmBox using Harm title
    screen.getByTestId('harm-up-chevron');
    userEvent.click(screen.getByRole('heading', { name: /Harm/ }));
    screen.getByTestId('harm-down-chevron');
    userEvent.click(screen.getByRole('heading', { name: /Harm/ }));
    screen.getByTestId('harm-up-chevron');
  });

  test('should render HxBox properly', async () => {
    const mockHandleAdjustHx = jest.fn();
    customRenderForComponent(
      <PlaybookPanel
        character={mockCharacter2}
        settingBarter={false}
        adjustingHx={false}
        settingHarm={false}
        togglingHighlight={false}
        handleSetBarter={jest.fn()}
        handleAdjustHx={mockHandleAdjustHx}
        handleSetHarm={jest.fn()}
        handleToggleHighlight={jest.fn()}
        navigateToCharacterCreation={jest.fn()}
      />,
      {
        isAuthenticated: true,
        apolloMocks: [mockPlaybook],
      }
    );

    // Check HxBox has rendered initially
    await screen.findByRole('heading', { name: /Hx/ });
    expect(screen.getByTestId('hx-box').textContent).toContain(mockCharacter2.hxBlock[0].characterName);
    expect(screen.getByTestId('hx-box').textContent).toContain(mockCharacter2.hxBlock[0].hxValue);

    // Check can increase Hx
    userEvent.click(screen.getByTestId('increase-hx-caret'));
    expect(mockHandleAdjustHx).toHaveBeenCalledWith(
      mockCharacter2.hxBlock[0].characterId,
      mockCharacter2.hxBlock[0].hxValue + 1
    );
    mockHandleAdjustHx.mockClear();

    // Check can decrease Hx
    userEvent.click(screen.getByTestId('decrease-hx-caret'));
    expect(mockHandleAdjustHx).toHaveBeenCalledWith(
      mockCharacter2.hxBlock[0].characterId,
      mockCharacter2.hxBlock[0].hxValue - 1
    );
    mockHandleAdjustHx.mockClear();
  });

  test('should render MovesBox properly', async () => {
    customRenderForComponent(
      <PlaybookPanel
        character={mockCharacter2}
        settingBarter={false}
        adjustingHx={false}
        settingHarm={false}
        togglingHighlight={false}
        handleSetBarter={jest.fn()}
        handleAdjustHx={jest.fn()}
        handleSetHarm={jest.fn()}
        handleToggleHighlight={jest.fn()}
        navigateToCharacterCreation={jest.fn()}
      />,
      {
        isAuthenticated: true,
        apolloMocks: [mockPlaybook],
      }
    );

    // Check MovesBox has rendered initially
    await screen.findByRole('heading', { name: `${decapitalize(MoveKinds.character)} moves` });
    expect(screen.getByTestId('moves-box').textContent).toContain(decapitalize(mockCharacter2.characterMoves[0].name));
    expect(screen.getByTestId('moves-box').textContent).toContain(decapitalize(mockCharacter2.characterMoves[1].name));
    expect(screen.getByTestId('moves-box').textContent).toContain(decapitalize(mockCharacter2.characterMoves[2].name));

    // Check can collapse moves list
    userEvent.click(screen.getByTestId('hide-moves-icon'));
    expect(screen.getByTestId('moves-box').textContent).not.toContain(decapitalize(mockCharacter2.characterMoves[0].name));
    expect(screen.getByTestId('moves-box').textContent).not.toContain(decapitalize(mockCharacter2.characterMoves[1].name));
    expect(screen.getByTestId('moves-box').textContent).not.toContain(decapitalize(mockCharacter2.characterMoves[2].name));

    // Check can re-open moves list
    userEvent.click(screen.getByTestId('show-moves-icon'));
    expect(screen.getByTestId('moves-box').textContent).toContain(decapitalize(mockCharacter2.characterMoves[0].name));
    expect(screen.getByTestId('moves-box').textContent).toContain(decapitalize(mockCharacter2.characterMoves[1].name));
    expect(screen.getByTestId('moves-box').textContent).toContain(decapitalize(mockCharacter2.characterMoves[2].name));

    // Check can show move details
    userEvent.click(screen.getAllByTestId('show-move-details-icon')[0]);
    expect(screen.getByTestId('moves-box').textContent).toContain(mockCharacter2.characterMoves[0].description);

    // Check can close move details
    userEvent.click(screen.getAllByTestId('hide-move-details-icon')[0]);
    expect(screen.getByTestId('moves-box').textContent).not.toContain(mockCharacter2.characterMoves[0].description);

    // Check can show move details using move name
    userEvent.click(screen.getByRole('heading', { name: decapitalize(mockCharacter2.characterMoves[1].name) }));
    expect(screen.getByTestId('moves-box').textContent).toContain(mockCharacter2.characterMoves[1].description);

    // Check can hide move details using move name
    userEvent.click(screen.getByRole('heading', { name: decapitalize(mockCharacter2.characterMoves[1].name) }));
    expect(screen.getByTestId('moves-box').textContent).not.toContain(mockCharacter2.characterMoves[1].description);
  });
});

/**
 *     Here are the accessible roles:

      banner:

      Name "":
      <header
        class="StyledBox-sc-13pk1d4-0 hMrGAP"
        style="border-bottom: 1px solid #698D70;"
      />

      --------------------------------------------------
      button:

      Name "Open Menu":
      <button
        aria-label="Open Menu"
        class="StyledButtonKind-sc-1vhfpnt-0 fCMWuo"
        kind="default"
        style="background-color: transparent;"
        type="button"
      />

      Name "ROLL":
      <button
        class="StyledButtonKind-sc-1vhfpnt-0 gAcwzn"
        kind="secondary"
        type="button"
      />

      Name "ROLL":
      <button
        class="StyledButtonKind-sc-1vhfpnt-0 gAcwzn"
        kind="secondary"
        type="button"
      />

      Name "ROLL":
      <button
        class="StyledButtonKind-sc-1vhfpnt-0 gAcwzn"
        kind="secondary"
        type="button"
      />

      --------------------------------------------------
      heading:

      Name "Mock Character 2 the Angel":
      <h2
        class="StyledHeading-sc-1rdh4aw-0 cpzFJB sc-gsTCUz kNvypE"
      />

      Name "Stats":
      <h3
        class="StyledHeading-sc-1rdh4aw-0 dusibY sc-gsTCUz kNvypE"
        style="cursor: pointer;"
      />

      Name "1":
      <h2
        class="StyledHeading-sc-1rdh4aw-0 iVnYdh"
      />

      Name "COOL":
      <h3
        class="StyledHeading-sc-1rdh4aw-0 elnAjr"
      />

      Name "1":
      <h2
        class="StyledHeading-sc-1rdh4aw-0 iVnYdh"
      />

      Name "HARD":
      <h3
        class="StyledHeading-sc-1rdh4aw-0 elnAjr"
      />

      Name "1":
      <h2
        class="StyledHeading-sc-1rdh4aw-0 iVnYdh"
      />

      Name "HOT":
      <h3
        class="StyledHeading-sc-1rdh4aw-0 elnAjr"
      />

      Name "1":
      <h2
        class="StyledHeading-sc-1rdh4aw-0 iVnYdh"
      />

      Name "SHARP":
      <h3
        class="StyledHeading-sc-1rdh4aw-0 elnAjr"
      />

      Name "1":
      <h2
        class="StyledHeading-sc-1rdh4aw-0 iVnYdh"
      />

      Name "WEIRD":
      <h3
        class="StyledHeading-sc-1rdh4aw-0 elnAjr"
      />

      Name "Character moves":
      <h3
        class="StyledHeading-sc-1rdh4aw-0 dusibY sc-gsTCUz kNvypE"
        style="cursor: pointer;"
      />

      Name "Angel special":
      <h3
        class="StyledHeading-sc-1rdh4aw-0 wDGUT sc-gsTCUz kNvypE"
        style="cursor: pointer;"
      />

      Name "Sixth sense":
      <h3
        class="StyledHeading-sc-1rdh4aw-0 wDGUT sc-gsTCUz kNvypE"
        style="cursor: pointer;"
      />

      Name "Infirmary":
      <h3
        class="StyledHeading-sc-1rdh4aw-0 wDGUT sc-gsTCUz kNvypE"
        style="cursor: pointer;"
      />

      Name "Harm":
      <h3
        class="StyledHeading-sc-1rdh4aw-0 dusibY sc-gsTCUz kNvypE"
        style="cursor: pointer;"
      />

      Name "Hx":
      <h3
        class="StyledHeading-sc-1rdh4aw-0 dusibY sc-gsTCUz kNvypE"
        style="cursor: pointer;"
      />

      Name "1":
      <h2
        class="StyledHeading-sc-1rdh4aw-0 hkQSvF sc-gsTCUz kNvypE"
      />

      Name "Mock Character 1":
      <h4
        class="StyledHeading-sc-1rdh4aw-0 jJvscA sc-gsTCUz kNvypE"
      />

      Name "Gear":
      <h3
        class="StyledHeading-sc-1rdh4aw-0 dusibY sc-gsTCUz kNvypE"
        style="cursor: pointer;"
      />

      --------------------------------------------------
      checkbox:

      Name "Stabilized":
      <input
        class="StyledCheckBox__StyledCheckBoxInput-sc-1dbk5ju-2 kNDCfW"
        type="checkbox"
      />

      Name "Come back with -1hard":
      <input
        class="StyledCheckBox__StyledCheckBoxInput-sc-1dbk5ju-2 kNDCfW"
        type="checkbox"
      />

      Name "Come back with +1weird (max+3)":
      <input
        class="StyledCheckBox__StyledCheckBoxInput-sc-1dbk5ju-2 kNDCfW"
        type="checkbox"
      />

      Name "Change to a new playbook":
      <input
        class="StyledCheckBox__StyledCheckBoxInput-sc-1dbk5ju-2 kNDCfW"
        type="checkbox"
      />

      Name "die":
      <input
        class="StyledCheckBox__StyledCheckBoxInput-sc-1dbk5ju-2 kNDCfW"
        type="checkbox"
      />

      --------------------------------------------------
      list:

      Name "":
      <ul
        style="margin: 0px; padding-inline-start: 28px;"
      />

      --------------------------------------------------
      listitem:

      Name "":
      <li />

      Name "":
      <li />

      --------------------------------------------------
      tablist:

      Name "":
      <div
        class="StyledBox-sc-13pk1d4-0 dYebPD StyledTabs-a4fwxl-2 jQLYpX"
        role="tablist"
      />

      --------------------------------------------------
      tab:

      Name "Playbook":
      <button
        aria-expanded="true"
        aria-selected="true"
        class="StyledButtonKind-sc-1vhfpnt-0 gEeZgM"
        data-testid="playbook-tab"
        kind="default"
        role="tab"
        style="z-index: 1;"
        type="button"
      />

      Name "Moves":
      <button
        aria-expanded="false"
        aria-selected="false"
        class="StyledButtonKind-sc-1vhfpnt-0 gEeZgM"
        data-testid="moves-tab"
        kind="default"
        role="tab"
        type="button"
      />

      --------------------------------------------------
      tabpanel:

      Name "Playbook Tab Contents":
      <div
        aria-label="Playbook Tab Contents"
        class="StyledTabs__StyledTabPanel-a4fwxl-1 ixxRXT"
        role="tabpanel"
      />

      --------------------------------------------------
 */
