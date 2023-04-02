import { createContext, FC, PropsWithChildren, useContext, useState } from 'react';
import { MutationFunctionOptions, useMutation } from '@apollo/client';
import PERFORM_PRINT_MOVE, { PerformPrintMoveData, PerformPrintMoveVars } from '../mutations/performPrintMove';
import PERFORM_WEALTH_MOVE, { PerformWealthMoveData, PerformWealthMoveVars } from '../mutations/performWealthMove';
import PERFORM_FORTUNES_MOVE, {
  PerformFortunesMoveData,
  PerformFortunesMoveVars
} from '../mutations/performFortunesMove';
import PERFORM_STAT_ROLL_MOVE, {
  PerformStatRollMoveData,
  PerformStatRollMoveVars
} from '../mutations/performStatRollMove';

interface MovesState {
  rollingMove: boolean;
}

const initialState: MovesState = {
  rollingMove: false
};

type MakePrintMove = (vars: MutationFunctionOptions<
  PerformPrintMoveData,
  PerformPrintMoveVars
>) => void
type MakeStatsRollMove = (vars: MutationFunctionOptions<
  PerformStatRollMoveData,
  PerformStatRollMoveVars
>) => void

type MakeWealthMove = (vars: MutationFunctionOptions<
  PerformWealthMoveData,
  PerformWealthMoveVars
>) => void

type MakeFortunesMove = (vars: MutationFunctionOptions<
  PerformFortunesMoveData,
  PerformFortunesMoveVars
>) => void

interface MovesContext extends MovesState {
  makePrintMove?: MakePrintMove;
  makeStatsRollMove?: MakeStatsRollMove;
  makeWealthMove?: MakeWealthMove;
  makeFortunesMove?: MakeFortunesMove;
}

const initialContext: MovesContext = {
  ...initialState
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
const MovesContext = createContext<MovesContext>(initialContext);

export const useMoves = () => useContext(MovesContext);

interface Props {
}

export const MovesProvider: FC<PropsWithChildren<Props>> = ({ children }) => {
  // -------------------------- Component state ---------------------------- //
  const [rollingMove, setRollingMove] = useState<boolean>(initialState.rollingMove);

  // -------------------------- GraphQL ------------------------------------- //
  const [performPrintMove] = useMutation<
    PerformPrintMoveData,
    PerformPrintMoveVars
  >(PERFORM_PRINT_MOVE);
  const [performWealthMove] = useMutation<
    PerformWealthMoveData,
    PerformWealthMoveVars
  >(PERFORM_WEALTH_MOVE);

  const [performFortunesMove] =
    useMutation<PerformFortunesMoveData, PerformFortunesMoveVars>(
      PERFORM_FORTUNES_MOVE
    );

  const [performStatRollMove] =
    useMutation<PerformStatRollMoveData, PerformStatRollMoveVars>(
      PERFORM_STAT_ROLL_MOVE
    );

  // -------------------------- Component functions ------------------------ //
  const makePrintMove: MakePrintMove = async (vars) => {
    await performPrintMove(vars);
  };

  const makeStatsRollMove: MakeStatsRollMove = async (vars) => {
    setRollingMove(true);
    await performStatRollMove(vars);
    setRollingMove(false);
  };

  const makeWealthMove: MakeWealthMove = async (vars) => {
    setRollingMove(true);
    await performWealthMove(vars);
    setRollingMove(false);
  };

  const makeFortunesMove: MakeFortunesMove = async (vars) => {
    setRollingMove(true);
    await performFortunesMove(vars);
    setRollingMove(false);
  };

  // -------------------------- Render ------------------------------------- //
  return <MovesContext.Provider
    value={{
      rollingMove,
      makePrintMove,
      makeStatsRollMove,
      makeWealthMove,
      makeFortunesMove
    }}
  >
    {children}
  </MovesContext.Provider>;
};
