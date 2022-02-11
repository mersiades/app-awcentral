import {
  MoveActionType,
  MoveType,
  PlaybookType,
  RollType,
  StatType,
} from '../../../src/@types/enums';
import {
  CharacterMove,
  MoveAction,
} from '../../../src/@types/staticDataInterfaces';

export const mockDangerousAndSexyMoveAction: MoveAction = {
  id: '60a730106a012a4e90170bc8',
  actionType: 'ROLL' as MoveActionType,
  rollType: 'STAT' as RollType,
  statToRollWith: 'HOT' as StatType,
  __typename: 'MoveAction',
};

export const mockDangerousAndSexy: CharacterMove = {
  id: '60a730246a012a4e90170fd8',
  isSelected: true,
  name: 'DANGEROUS & SEXY',
  kind: 'CHARACTER' as MoveType,
  description:
    '_**Dangerous & sexy**_: when you enter into a charged situation, roll+hot.\n\nOn a 10+, hold 2. On a 7–9, hold 1.\n\nSpend your hold 1 for 1 to make eye contact with an NPC present, who freezes or flinches and can’t take action until you break it off.\n\nOn a miss, your enemies identify you immediately as their foremost threat.',
  playbook: 'BATTLEBABE' as PlaybookType,
  stat: undefined,
  moveAction: mockDangerousAndSexyMoveAction,
  statModifier: undefined,
  rollModifier: undefined,
  __typename: 'CharacterMove',
};

export const mockPerfectInstinctsAction: MoveAction = {
  id: '60a730106a012a4e90170bcf',
  actionType: 'PRINT' as MoveActionType,
  rollType: undefined,
  statToRollWith: undefined,
  __typename: 'MoveAction',
};

export const mockPerfectInstincts: CharacterMove = {
  id: '60a730246a012a4e90170fd9',
  isSelected: true,
  name: 'PERFECT INSTINCTS',
  kind: 'CHARACTER' as MoveType,
  description:
    '_**Perfect instincts**_: when you’ve read a charged situation and you’re acting on the MC’s answers, take +2 instead of +1.',
  playbook: 'BATTLEBABE' as PlaybookType,
  stat: undefined,
  moveAction: mockPerfectInstinctsAction,
  statModifier: undefined,
  rollModifier: undefined,
  __typename: 'CharacterMove',
};

export const mockBattlebabeSpecialAction: MoveAction = {
  id: '60a730106a012a4e90170bc6',
  actionType: 'PRINT' as MoveActionType,
  rollType: undefined,
  statToRollWith: undefined,
  __typename: 'MoveAction',
};

export const mockBattlebabeSpecial: CharacterMove = {
  id: '60a730246a012a4e90170fda',
  isSelected: true,
  name: 'BATTLEBABE SPECIAL',
  kind: 'DEFAULT_CHARACTER' as MoveType,
  description:
    'If you and another character have sex, nullify the other character’s sex move. Whatever it is, it just doesn’t happen.',
  playbook: 'BATTLEBABE' as PlaybookType,
  stat: undefined,
  moveAction: mockBattlebabeSpecialAction,
  statModifier: undefined,
  rollModifier: undefined,
  __typename: 'CharacterMove',
};
