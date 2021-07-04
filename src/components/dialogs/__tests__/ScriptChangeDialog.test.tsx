import { InMemoryCache } from '@apollo/client';
import { RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ScriptChangeDialog, {
  SCRIPT_CHANGE_COMMENT_INPUT_ID,
} from '../ScriptChangeDialog';
import { ScriptChangeType } from '../../../@types/enums';
import {
  CANCEL_TEXT,
  SCRIPT_CHANGE_ATTRIBUTION_TEXT_4,
  SCRIPT_CHANGE_FAST_FORWARD_CONTENT,
  SCRIPT_CHANGE_FAST_FORWARD_TITLE,
  SCRIPT_CHANGE_FRAME_CONTENT,
  SCRIPT_CHANGE_FRAME_TITLE,
  SCRIPT_CHANGE_PAUSE_CONTENT,
  SCRIPT_CHANGE_PAUSE_TITLE,
  SCRIPT_CHANGE_REPLAY_CONTENT,
  SCRIPT_CHANGE_REPLAY_TITLE,
  SCRIPT_CHANGE_RESUME_CONTENT,
  SCRIPT_CHANGE_RESUME_TITLE,
  SCRIPT_CHANGE_REWIND_CONTENT,
  SCRIPT_CHANGE_REWIND_TITLE,
  SCRIPT_CHANGE_TITLE,
} from '../../../config/constants';
import { mockGame7 } from '../../../tests/mocks';
import {
  customRenderForComponent,
  waitOneTick,
} from '../../../tests/test-utils';

describe('Rendering ScriptChangeDialog', () => {
  let screen: RenderResult<
    typeof import('@testing-library/dom/types/queries'),
    HTMLElement
  >;
  const mockHandleClose = jest.fn();

  let cache: InMemoryCache;

  beforeEach(async () => {
    cache = new InMemoryCache();
    screen = customRenderForComponent(
      <ScriptChangeDialog handleClose={mockHandleClose} isPreview={false} />,
      {
        isAuthenticated: true,
        apolloMocks: [],
        injectedGameId: mockGame7.id,
        injectedUserId: mockGame7.gameRoles[1].userId,
        cache,
      }
    );

    await waitOneTick();
  });

  test('should display all the Script Change content', () => {
    expect(
      screen.getByRole('heading', { name: SCRIPT_CHANGE_TITLE })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: SCRIPT_CHANGE_PAUSE_TITLE })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: SCRIPT_CHANGE_RESUME_TITLE })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: SCRIPT_CHANGE_REPLAY_TITLE })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: SCRIPT_CHANGE_FAST_FORWARD_TITLE })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: SCRIPT_CHANGE_REWIND_TITLE })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: SCRIPT_CHANGE_FRAME_TITLE })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: SCRIPT_CHANGE_COMMENT_INPUT_ID })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: SCRIPT_CHANGE_ATTRIBUTION_TEXT_4 })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: CANCEL_TEXT })
    ).toBeInTheDocument();
    expect(screen.getByText(SCRIPT_CHANGE_PAUSE_CONTENT)).toBeInTheDocument();
    expect(screen.getByText(SCRIPT_CHANGE_RESUME_CONTENT)).toBeInTheDocument();
    expect(screen.getByText(SCRIPT_CHANGE_REPLAY_CONTENT)).toBeInTheDocument();
    expect(
      screen.getByText(SCRIPT_CHANGE_FAST_FORWARD_CONTENT)
    ).toBeInTheDocument();
    expect(screen.getByText(SCRIPT_CHANGE_REWIND_CONTENT)).toBeInTheDocument();
    expect(screen.getByText(SCRIPT_CHANGE_FRAME_CONTENT)).toBeInTheDocument();
  });

  test('should type a comment, click an option, and close the dialog', () => {
    const mockComment = 'My comment is ...';
    const commentInput = screen.getByRole('textbox', {
      name: SCRIPT_CHANGE_COMMENT_INPUT_ID,
    }) as HTMLInputElement;
    userEvent.type(commentInput, mockComment);
    expect(commentInput.value).toEqual(mockComment);

    userEvent.click(screen.getByTestId(`${ScriptChangeType.pause}-tile`));

    expect(mockHandleClose).toHaveBeenCalled();
  });
});
