import { PlaybookType } from '../../@types/enums';
import { ImprovementBlock } from '../../@types/staticDataInterfaces';
import {
  mockSharpMax2,
  mockCoolMax2,
  mockHardMax2,
  mockHotMax2,
  mockWeirdMax2,
  mockAddAngelMove1,
  mockAddAngelMove2,
  mockAdjustAngelUnique1,
  mockAddOtherPBMove2,
  mockAddOtherPBMove1,
  mockGenericIncreaseStat,
  mockRetire,
  mockAddSecondCharacter,
  mockChangePlaybook,
  mockImproveBasicMoves1,
  mockImproveBasicMoves2,
} from './movesFixtures';

export const mockImprovementBlockDefault: ImprovementBlock = {
  id: 'mock-default-improvement-block-id',
  playbookType: PlaybookType.angel,
  improvementInstructions: 'When you...',
  improvementMoves: [],
  futureImprovementMoves: [],
  __typename: 'ImprovementBlock',
};

export const mockImprovementBlockAngel: ImprovementBlock = {
  id: 'mock-angel-improvement-block-id',
  playbookType: PlaybookType.angel,
  improvementInstructions: 'When you...',
  improvementMoves: [
    mockSharpMax2,
    mockCoolMax2,
    mockHardMax2,
    mockHotMax2,
    mockWeirdMax2,
    mockAddAngelMove1,
    mockAddAngelMove2,
    mockAdjustAngelUnique1,
    mockAddOtherPBMove1,
    mockAddOtherPBMove2,
  ],
  futureImprovementMoves: [
    mockGenericIncreaseStat,
    mockRetire,
    mockAddSecondCharacter,
    mockChangePlaybook,
    mockImproveBasicMoves1,
    mockImproveBasicMoves2,
  ],
  __typename: 'ImprovementBlock',
};
