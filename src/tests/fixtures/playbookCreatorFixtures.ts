import { PlaybookType } from '../../@types/enums';
import { PlaybookCreator } from '../../@types/staticDataInterfaces';
import {
  mockgearInstructionsDefault,
  mockNameAngel1,
  mockNameAngel2,
  mockLookAngel1,
  mockLookAngel2,
  mockLookAngel3,
  mockLookAngel4,
  mockLookAngel5,
  mockLookAngel6,
  mockLookAngel7,
  mockLookAngel8,
  mockLookAngel9,
  mockLookAngel10,
  mockStatsOptionsDefault1,
  mockStatsOptionsDefault2,
  mockStatsOptionsDefault3,
  mockUniqueCreatorDefault,
  mockUniqueCreatorBrainer,
  mockUniqueCreatorChopper,
  mockUniqueCreatorGunlugger,
  mockUniqueCreatorHardHolder,
  mockUniqueCreatorHocus,
  mockUniqueCreatorMaestroD,
  mockUniqueCreatorSavvyhead,
  mockUniqueCreatorSkinner,
} from '../mocks';
import {
  mockCharacterMoveAngel2,
  mockCharacterMoveAngel3,
  mockCharacterMoveAngel4,
  mockCharacterMoveAngel1,
} from './characterMovesFixtures';
import { mockImprovementBlockDefault } from './mockImprovementBlocks';

export const mockPlaybookCreatorDefault: PlaybookCreator = {
  id: 'default-playbook-creator-id',
  playbookType: PlaybookType.angel,
  gearInstructions: mockgearInstructionsDefault,
  improvementInstructions: 'Whenever you roll a highlighted stat...',
  movesInstructions: 'You get all the basic moves. Choose 2 angel moves.  ',
  hxInstructions: 'Everyone introduces their characters by name, look and outlook...',
  names: [mockNameAngel1, mockNameAngel2],
  looks: [
    mockLookAngel1,
    mockLookAngel2,
    mockLookAngel3,
    mockLookAngel4,
    mockLookAngel5,
    mockLookAngel6,
    mockLookAngel7,
    mockLookAngel8,
    mockLookAngel9,
    mockLookAngel10,
  ],
  statsOptions: [mockStatsOptionsDefault1, mockStatsOptionsDefault2, mockStatsOptionsDefault3],
  playbookUniqueCreator: mockUniqueCreatorDefault,
  optionalMoves: [mockCharacterMoveAngel2, mockCharacterMoveAngel3, mockCharacterMoveAngel4],
  defaultMoves: [mockCharacterMoveAngel1],
  defaultMoveCount: 1,
  moveChoiceCount: 2,
  defaultVehicleCount: 0,
  improvementBlock: mockImprovementBlockDefault,
  __typename: 'PlaybookCreator',
};

export const mockPlaybookCreatorBrainer: PlaybookCreator = {
  ...mockPlaybookCreatorDefault,
  id: 'brainer-playbook-creator-id',
  playbookType: PlaybookType.brainer,
  movesInstructions: 'You get all the basic moves. Choose 2 driver moves.',
  hxInstructions: 'Everyone introduces their characters by name, look and outlook...',
  playbookUniqueCreator: mockUniqueCreatorBrainer,
};

export const mockPlaybookCreatorChopper: PlaybookCreator = {
  ...mockPlaybookCreatorDefault,
  id: 'chopper-playbook-creator-id',
  playbookType: PlaybookType.chopper,
  movesInstructions: 'You get all the basic moves. You get both chopper moves. ',
  playbookUniqueCreator: mockUniqueCreatorChopper,
};

export const mockPlaybookCreatorDriver: PlaybookCreator = {
  ...mockPlaybookCreatorDefault,
  id: 'driver-playbook-creator-id',
  playbookType: PlaybookType.driver,
  movesInstructions: 'You get all the basic moves. Choose 2 driver moves.',
  hxInstructions: 'Everyone introduces their characters by name, look and outlook...',
  playbookUniqueCreator: undefined,
};

export const mockPlaybookCreatorGunlugger: PlaybookCreator = {
  ...mockPlaybookCreatorDefault,
  id: 'gunlugger-playbook-creator-id',
  playbookType: PlaybookType.gunlugger,
  movesInstructions: 'You get all the basic moves. Choose 3 gunlugger moves. ',
  playbookUniqueCreator: mockUniqueCreatorGunlugger,
};
export const mockPlaybookCreatorHardHolder: PlaybookCreator = {
  ...mockPlaybookCreatorDefault,
  id: 'hardholder-playbook-creator-id',
  playbookType: PlaybookType.hardholder,
  movesInstructions: 'You get all the basic moves. You get both hardholder moves.  ',
  playbookUniqueCreator: mockUniqueCreatorHardHolder,
};

export const mockPlaybookCreatorHocus: PlaybookCreator = {
  ...mockPlaybookCreatorDefault,
  id: 'hocus-playbook-creator-id',
  playbookType: PlaybookType.hocus,
  movesInstructions: 'You get all the basic moves. You get fortunes, and the choose 2 more hocus moves.',
  playbookUniqueCreator: mockUniqueCreatorHocus,
};

export const mockPlaybookCreatorMaestroD: PlaybookCreator = {
  ...mockPlaybookCreatorDefault,
  id: 'maestro-d-playbook-creator-id',
  playbookType: PlaybookType.maestroD,
  movesInstructions: "You get all the basic moves. Choose 2 maestro d' moves. ",
  hxInstructions: 'Everyone introduces their characters by name, look and outlook...',
  playbookUniqueCreator: mockUniqueCreatorMaestroD,
};

export const mockPlaybookCreatorSavvyhead: PlaybookCreator = {
  ...mockPlaybookCreatorDefault,
  id: 'savvyhead-playbook-creator-id',
  playbookType: PlaybookType.savvyhead,
  movesInstructions: 'You get all the basic moves. Choose 3 savvyhead moves. ',
  playbookUniqueCreator: mockUniqueCreatorSavvyhead,
};

export const mockPlaybookCreatorSkinner: PlaybookCreator = {
  ...mockPlaybookCreatorDefault,
  id: 'skinner-playbook-creator-id',
  playbookType: PlaybookType.skinner,
  movesInstructions: 'You get all the basic moves. Choose 2 skinner moves.  ',
  playbookUniqueCreator: mockUniqueCreatorSkinner,
};
