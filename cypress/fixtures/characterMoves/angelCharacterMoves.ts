import { MoveActionType, RollType, StatType, MoveType, PlaybookType } from '../../../src/@types/enums';
import { CharacterMove, MoveAction } from '../../../src/@types/staticDataInterfaces';

export const mockSixthSense: CharacterMove = {
  id: '60a730246a012a4e90170fcd',
  isSelected: true,
  name: 'SIXTH SENSE',
  kind: 'CHARACTER' as MoveType,
  description: '_**Sixth sense**_: when you open your brain to the world’s psychic maelstrom, roll+sharp instead of +weird.',
  playbook: 'ANGEL' as PlaybookType,
  stat: undefined,
  moveAction: undefined,
  statModifier: undefined,
  rollModifier: {
    id: '60a730106a012a4e90170bb0',
    movesToModify: [],
    statToRollWith: StatType.sharp,
    __typename: 'RollModifier',
  },
  __typename: 'CharacterMove',
};

export const mockHealingTouchAction: MoveAction = {
  id: '60a730106a012a4e90170bb9',
  actionType: 'ROLL' as MoveActionType,
  rollType: 'STAT' as RollType,
  statToRollWith: 'WEIRD' as StatType,
  __typename: 'MoveAction',
};

export const mockHealingTouch: CharacterMove = {
  id: '60a730246a012a4e90170fce',
  isSelected: true,
  name: 'HEALING TOUCH',
  kind: 'CHARACTER' as MoveType,
  description:
    '_**Healing touch**_: when you put your hands skin-to-skin on a wounded person and open your brain to them, roll+weird.\n\nOn a 10+, heal 1 segment.\n\nOn a 7–9, heal 1 segment, but you’re also opening your brain, so roll that move next.\n\nOn a miss: first, you don’t heal them. Second, you’ve opened both your brain and theirs to the world’s psychic maelstrom, without protection or preparation.\n\nFor you, and for your patient if your patient’s a fellow player’s character, treat it as though you’ve made that move and missed the roll.\n\nFor patients belonging to the MC, their experience and fate are up to the MC.\n',
  playbook: 'ANGEL' as PlaybookType,
  stat: undefined,
  moveAction: mockHealingTouchAction,
  statModifier: undefined,
  rollModifier: undefined,
  __typename: 'CharacterMove',
};

export const mockAngelSpecialAction: MoveAction = {
  id: '60a730106a012a4e90170bb2',
  actionType: 'ADJUST_HX' as MoveActionType,
  rollType: undefined,
  statToRollWith: undefined,
  __typename: 'MoveAction',
};

export const mockAngelSpecial: CharacterMove = {
  id: '60a730246a012a4e90170fcf',
  isSelected: true,
  name: 'ANGEL SPECIAL',
  kind: 'DEFAULT_CHARACTER' as MoveType,
  description:
    'If you and another character have sex, your Hx with them on your sheet goes immediately to +3, and they immediately get +1 to their Hx with you on their sheet.\n\nIf that brings their Hx with you to +4, they reset it to +1 instead, as usual, and so mark experience.',
  playbook: 'ANGEL' as PlaybookType,
  stat: undefined,
  moveAction: mockAngelSpecialAction,
  statModifier: undefined,
  rollModifier: undefined,
  __typename: 'CharacterMove',
};
