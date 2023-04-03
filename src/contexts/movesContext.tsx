import { createContext, FC, PropsWithChildren, useContext, useState } from 'react';
import { MutationFunctionOptions, useMutation } from '@apollo/client';
import PERFORM_PRINT_MOVE, {
  PerformPrintMoveData,
  PerformPrintMoveVars
} from '../mutations/performPrintMove';
import PERFORM_WEALTH_MOVE, {
  PerformWealthMoveData,
  PerformWealthMoveVars
} from '../mutations/performWealthMove';
import PERFORM_FORTUNES_MOVE, {
  PerformFortunesMoveData,
  PerformFortunesMoveVars
} from '../mutations/performFortunesMove';
import PERFORM_STAT_ROLL_MOVE, {
  PerformStatRollMoveData,
  PerformStatRollMoveVars
} from '../mutations/performStatRollMove';
import PERFORM_SPEED_ROLL_MOVE, {
  PerformSpeedRollMoveData,
  PerformSpeedRollMoveVars
} from '../mutations/performSpeedRollMove';
import PERFORM_HELP_OR_INTERFERE_MOVE, {
  PerformHelpOrInterfereMoveData,
  PerformHelpOrInterfereMoveVars
} from '../mutations/performHelpOrInterfereMove';
import PERFORM_BARTER_MOVE, { PerformBarterMoveData, PerformBarterMoveVars } from '../mutations/performBarterMove';
import PERFORM_SUFFER_HARM_MOVE, {
  PerformSufferHarmMoveData,
  PerformSufferHarmMoveVars
} from '../mutations/performSufferHarmMove';
import PERFORM_SUFFER_V_HARM_MOVE, { PerformSufferVHarmMoveData, PerformSufferVHarmMoveVars } from '../mutations/performSufferVHarmMove';
import PERFORM_INFLICT_HARM_MOVE, { PerformInflictHarmMoveData, PerformInflictHarmMoveVars } from '../mutations/performInflictHarmMove';
import PERFORM_HEAL_HARM_MOVE, { PerformHealHarmMoveData, PerformHealHarmMoveVars } from '../mutations/performHealHarmMove';
import PERFORM_MAKE_WANT_KNOWN_MOVE, { PerformMakeWantKnownMoveData, PerformMakeWantKnownMoveVars } from '../mutations/performMakeWantKnownMove';
import PERFORM_ANGEL_SPECIAL_MOVE, { PerformAngelSpecialMoveData, PerformAngelSpecialMoveVars } from '../mutations/performAngelSpecialMove';
import PERFORM_STABILIZE_AND_HEAL_MOVE, {
  PerformStabilizeAndHealMoveData,
  PerformStabilizeAndHealMoveVars
} from '../mutations/performStabilizeAndHealMove';
import PERFORM_STOCK_MOVE, { PerformStockMoveData, PerformStockMoveVars } from '../mutations/performStockMove';
import PERFORM_HOCUS_SPECIAL_MOVE, { PerformHocusSpecialMoveData, PerformHocusSpecialMoveVars } from '../mutations/performHocusSpecialMove';
import PERFORM_CHOPPER_SPECIAL_MOVE, { PerformChopperSpecialMoveData, PerformChopperSpecialMoveVars } from '../mutations/performChopperSpecialMove';
import PERFORM_GUNLUGGER_SPECIAL_MOVE, {
  PerformGunluggerSpecialMoveData,
  PerformGunluggerSpecialMoveVars
} from '../mutations/performGunluggerSpecialMove';
import PERFORM_SKINNER_SPECIAL_MOVE, { PerformSkinnerSpecialMoveData, PerformSkinnerSpecialMoveVars } from '../mutations/performSkinnerSpecialMove';
import PERFORM_JUST_GIVE_MOTIVATION_MOVE, {
  PerformJustGiveMotivationMoveData,
  PerformJustGiveMotivationMoveVars
} from '../mutations/performJustGiveMotivationMove';

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

type MakeSpeedRollMove = (vars: MutationFunctionOptions<
  PerformSpeedRollMoveData,
  PerformSpeedRollMoveVars
>) => void

type MakeHelpOrInterfereMove = (vars: MutationFunctionOptions<
  PerformHelpOrInterfereMoveData,
  PerformHelpOrInterfereMoveVars
>) => void

type MakeBarterMove = (vars: MutationFunctionOptions<
  PerformBarterMoveData,
  PerformBarterMoveVars
>) => void

type MakeSufferHarmMove = (vars: MutationFunctionOptions<
  PerformSufferHarmMoveData,
  PerformSufferHarmMoveVars
>) => void

type MakeSufferVHarmMove = (vars: MutationFunctionOptions<
  PerformSufferVHarmMoveData,
  PerformSufferVHarmMoveVars
>) => void

type MakeInflictHarmMove = (vars: MutationFunctionOptions<
  PerformInflictHarmMoveData,
  PerformInflictHarmMoveVars
>) => void

type MakeHealHarmMove = (vars: MutationFunctionOptions<
  PerformHealHarmMoveData,
  PerformHealHarmMoveVars
>) => void

type MakeWantKnownMove = (vars: MutationFunctionOptions<
  PerformMakeWantKnownMoveData,
  PerformMakeWantKnownMoveVars
>) => void

type MakeStabilizeAndHealMove = (vars: MutationFunctionOptions<
  PerformStabilizeAndHealMoveData,
  PerformStabilizeAndHealMoveVars
>) => void

type MakeStockMove = (vars: MutationFunctionOptions<
  PerformStockMoveData,
  PerformStockMoveVars
>) => void

type MakeJustGiveMotivationMove = (vars: MutationFunctionOptions<
  PerformJustGiveMotivationMoveData,
  PerformJustGiveMotivationMoveVars
>) => void

type MakeAngelSpecialMove = (vars: MutationFunctionOptions<
  PerformAngelSpecialMoveData,
  PerformAngelSpecialMoveVars
>) => void

type MakeHocusSpecialMove = (vars: MutationFunctionOptions<
  PerformHocusSpecialMoveData,
  PerformHocusSpecialMoveVars
>) => void

type MakeChopperSpecialMove = (vars: MutationFunctionOptions<
  PerformChopperSpecialMoveData,
  PerformChopperSpecialMoveVars
>) => void

type MakeGunluggerSpecialMove = (vars: MutationFunctionOptions<
  PerformGunluggerSpecialMoveData,
  PerformGunluggerSpecialMoveVars
>) => void

type MakeSkinnerSpecialMove = (vars: MutationFunctionOptions<
  PerformSkinnerSpecialMoveData,
  PerformSkinnerSpecialMoveVars
>) => void

interface MovesContext extends MovesState {
  makePrintMove?: MakePrintMove;
  makeStatsRollMove?: MakeStatsRollMove;
  makeWealthMove?: MakeWealthMove;
  makeFortunesMove?: MakeFortunesMove;
  makeSpeedRollMove?: MakeSpeedRollMove;
  makeHelpOrInterfereMove?: MakeHelpOrInterfereMove;
  makeBarterMove?: MakeBarterMove;
  makeSufferHarmMove?: MakeSufferHarmMove;
  makeSufferVHarmMove?: MakeSufferVHarmMove
  makeInflictHarmMove?: MakeInflictHarmMove
  makeHealHarmMove?: MakeHealHarmMove
  makeWantKnownMove?: MakeWantKnownMove
  makeStabilizeAndHealMove?: MakeStabilizeAndHealMove
  makeStockMove?: MakeStockMove
  makeAngelSpecialMove?: MakeAngelSpecialMove
  makeHocusSpecialMove?: MakeHocusSpecialMove
  makeChopperSpecialMove?: MakeChopperSpecialMove
  makeGunluggerSpecialMove?: MakeGunluggerSpecialMove
  makeSkinnerSpecialMove?: MakeSkinnerSpecialMove
  makeJustGiveMotivationMove?: MakeJustGiveMotivationMove
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
  const [performPrintMove] =
    useMutation<PerformPrintMoveData, PerformPrintMoveVars>(PERFORM_PRINT_MOVE);

  const [performWealthMove] =
    useMutation<PerformWealthMoveData, PerformWealthMoveVars>(PERFORM_WEALTH_MOVE);

  const [performFortunesMove] =
    useMutation<PerformFortunesMoveData, PerformFortunesMoveVars>(
      PERFORM_FORTUNES_MOVE
    );

  const [performStatRollMove] =
    useMutation<PerformStatRollMoveData, PerformStatRollMoveVars>(
      PERFORM_STAT_ROLL_MOVE
    );

  const [performSpeedRollMove] =
    useMutation<PerformSpeedRollMoveData, PerformSpeedRollMoveVars>(
      PERFORM_SPEED_ROLL_MOVE
    );
  const [performHelpOrInterfereMove] =
    useMutation<PerformHelpOrInterfereMoveData, PerformHelpOrInterfereMoveVars>(
      PERFORM_HELP_OR_INTERFERE_MOVE
    );

  const [performBarterMove] =
    useMutation<PerformBarterMoveData, PerformBarterMoveVars>(PERFORM_BARTER_MOVE);

  const [performSufferHarmMove] =
    useMutation<PerformSufferHarmMoveData, PerformSufferHarmMoveVars>(
      PERFORM_SUFFER_HARM_MOVE
    );

  const [performSufferVHarmMove] =
    useMutation<PerformSufferVHarmMoveData, PerformSufferVHarmMoveVars>(
      PERFORM_SUFFER_V_HARM_MOVE
    );

  const [performInflictHarmMove] =
    useMutation<PerformInflictHarmMoveData, PerformInflictHarmMoveVars>(
      PERFORM_INFLICT_HARM_MOVE
    );

  const [performHealHarmMove] =
    useMutation<PerformHealHarmMoveData, PerformHealHarmMoveVars>(
      PERFORM_HEAL_HARM_MOVE
    );

  const [performMakeWantKnownMove] =
    useMutation<PerformMakeWantKnownMoveData, PerformMakeWantKnownMoveVars>(
      PERFORM_MAKE_WANT_KNOWN_MOVE
    );

  const [performStabilizeAndHealMove] =
    useMutation<PerformStabilizeAndHealMoveData, PerformStabilizeAndHealMoveVars>(
    PERFORM_STABILIZE_AND_HEAL_MOVE
    );

  const [performStockMove] =
    useMutation<PerformStockMoveData, PerformStockMoveVars>(PERFORM_STOCK_MOVE);

  const [performJustGiveMotivationMove] = useMutation<
    PerformJustGiveMotivationMoveData, PerformJustGiveMotivationMoveVars>(
      PERFORM_JUST_GIVE_MOTIVATION_MOVE
  );

  const [performAngelSpecialMove] =
    useMutation<PerformAngelSpecialMoveData, PerformAngelSpecialMoveVars>(
      PERFORM_ANGEL_SPECIAL_MOVE
    );

  const [performHocusSpecialMove] =
    useMutation<PerformHocusSpecialMoveData, PerformHocusSpecialMoveVars>(
      PERFORM_HOCUS_SPECIAL_MOVE
    );

  const [performChopperSpecialMove] =
    useMutation<PerformChopperSpecialMoveData, PerformChopperSpecialMoveVars>(
      PERFORM_CHOPPER_SPECIAL_MOVE
    );

  const [performGunluggerSpecialMove] =
    useMutation<PerformGunluggerSpecialMoveData, PerformGunluggerSpecialMoveVars>(
      PERFORM_GUNLUGGER_SPECIAL_MOVE
    );

  const [performSkinnerSpecialMove] =
    useMutation<PerformSkinnerSpecialMoveData, PerformSkinnerSpecialMoveVars>(
      PERFORM_SKINNER_SPECIAL_MOVE
    );

  // -------------------------- Component functions ------------------------ //
  const makePrintMove: MakePrintMove = async (vars) => {
    setRollingMove(true);
    await performPrintMove(vars);
    setRollingMove(false);
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

  const makeSpeedRollMove: MakeSpeedRollMove = async (vars) => {
    setRollingMove(true);
    await performSpeedRollMove(vars);
    setRollingMove(false);
  };

  const makeHelpOrInterfereMove: MakeHelpOrInterfereMove = async (vars) => {
    setRollingMove(true);
    await performHelpOrInterfereMove(vars);
    setRollingMove(false);
  };

  const makeBarterMove: MakeBarterMove = async (vars) => {
    setRollingMove(true);
    await performBarterMove(vars);
    setRollingMove(false);
  };

  const makeSufferHarmMove: MakeSufferHarmMove = async (vars) => {
    setRollingMove(true);
    await performSufferHarmMove(vars);
    setRollingMove(false);
  };

  const makeSufferVHarmMove: MakeSufferVHarmMove = async (vars) => {
    setRollingMove(true);
    await performSufferVHarmMove(vars);
    setRollingMove(false);
  };

  const makeInflictHarmMove: MakeInflictHarmMove = async (vars) => {
    setRollingMove(true);
    await performInflictHarmMove(vars);
    setRollingMove(false);
  };

  const makeHealHarmMove: MakeHealHarmMove = async (vars) => {
    setRollingMove(true);
    await performHealHarmMove(vars);
    setRollingMove(false);
  };

  const makeWantKnownMove: MakeWantKnownMove = async (vars) => {
    setRollingMove(true);
    await performMakeWantKnownMove(vars);
    setRollingMove(false);
  };
  const makeStabilizeAndHealMove: MakeStabilizeAndHealMove = async (vars) => {
    setRollingMove(true);
    await performStabilizeAndHealMove(vars);
    setRollingMove(false);
  };

  const makeStockMove: MakeStockMove = async (vars) => {
    setRollingMove(true);
    await performStockMove(vars);
    setRollingMove(false);
  };

  const makeJustGiveMotivationMove: MakeJustGiveMotivationMove = async (vars) => {
    setRollingMove(true);
    await performJustGiveMotivationMove(vars);
    setRollingMove(false);
  };

  const makeAngelSpecialMove: MakeAngelSpecialMove = async (vars) => {
    setRollingMove(true);
    await performAngelSpecialMove(vars);
    setRollingMove(false);
  };

  const makeHocusSpecialMove: MakeHocusSpecialMove = async (vars) => {
    setRollingMove(true);
    await performHocusSpecialMove(vars);
    setRollingMove(false);
  };

  const makeChopperSpecialMove: MakeChopperSpecialMove = async (vars) => {
    setRollingMove(true);
    await performChopperSpecialMove(vars);
    setRollingMove(false);
  };

  const makeGunluggerSpecialMove: MakeGunluggerSpecialMove = async (vars) => {
    setRollingMove(true);
    await performGunluggerSpecialMove(vars);
    setRollingMove(false);
  };

  const makeSkinnerSpecialMove: MakeSkinnerSpecialMove = async (vars) => {
    setRollingMove(true);
    await performSkinnerSpecialMove(vars);
    setRollingMove(false);
  };

  // -------------------------- Render ------------------------------------- //
  return <MovesContext.Provider
    value={{
      rollingMove,
      makePrintMove,
      makeStatsRollMove,
      makeWealthMove,
      makeFortunesMove,
      makeSpeedRollMove,
      makeHelpOrInterfereMove,
      makeBarterMove,
      makeSufferHarmMove,
      makeSufferVHarmMove,
      makeInflictHarmMove,
      makeHealHarmMove,
      makeWantKnownMove,
      makeStabilizeAndHealMove,
      makeStockMove,
      makeJustGiveMotivationMove,
      makeAngelSpecialMove,
      makeHocusSpecialMove,
      makeChopperSpecialMove,
      makeGunluggerSpecialMove,
      makeSkinnerSpecialMove
    }}
  >
    {children}
  </MovesContext.Provider>;
};
