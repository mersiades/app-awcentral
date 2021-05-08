import {
  PlaybookUniques,
  AngelKit,
  CustomWeapons,
  Weapons,
  BrainerGear,
  Gang,
  Holding,
  Followers,
  Workspace,
  Establishment,
} from '../../@types/dataInterfaces';
import { GangSize, HoldingSize, UniqueTypes } from '../../@types/enums';
import { HOLDING_SOULS_MEDIUM, LIFE_SUPPORT_TEXT } from '../../config/constants';
import {
  dummyAngelKit,
  dummyBrainerGear,
  dummyEstablishment,
  dummyFollowers,
  dummyGang,
  dummyHolding,
  dummySkinnerGear,
  dummyWeapons,
  dummyWorkspace,
  dummyAngelKitMove,
  dummyCustomWeapons,
} from './dummyData';

// ------------------------------------------------------- CustomWeapons / Battlebabe -------------------------------------------------------- //

export const mockCustomWeapons: CustomWeapons = {
  id: 'mock-custom-weapons-id',
  uniqueType: UniqueTypes.customWeapons,
  weapons: ['custom weapon 1', 'custom weapons 2'],
};

export const mockPlaybookUniqueBattlebabe: PlaybookUniques = {
  id: 'mock-battlebabe-unique-id',
  type: UniqueTypes.customWeapons,
  customWeapons: mockCustomWeapons,
};

export const mockPlaybookUniqueBattlebabe_withDummyUniques: PlaybookUniques = {
  id: 'mock-battlebabe-unique-id',
  type: UniqueTypes.customWeapons,
  angelKit: dummyAngelKit,
  brainerGear: dummyBrainerGear,
  customWeapons: mockCustomWeapons,
  establishment: dummyEstablishment,
  followers: dummyFollowers,
  gang: dummyGang,
  holding: dummyHolding,
  skinnerGear: dummySkinnerGear,
  weapons: dummyWeapons,
  workspace: dummyWorkspace,
};

// ------------------------------------------------------- AngelKit / Angel -------------------------------------------------------- //

export const mockAngelKit: AngelKit = {
  id: 'mock-angel-kit-id',
  uniqueType: UniqueTypes.angelKit,
  description: 'Your angel kit has all kinds of crap in it...',
  stock: 6,
  hasSupplier: false,
  supplierText: 'mock-supplier-text',
  angelKitMoves: [dummyAngelKitMove],
  __typename: 'AngelKit',
};

export const mockPlaybookUniqueAngel: PlaybookUniques = {
  id: 'mock-angel-unique-id',
  type: UniqueTypes.angelKit,
  angelKit: mockAngelKit,
  __typename: 'PlaybookUniques',
};

export const mockPlaybookUniqueAngel_withDummyUniques: PlaybookUniques = {
  id: 'mock-angel-unique-id',
  type: UniqueTypes.angelKit,
  angelKit: mockAngelKit,
  brainerGear: dummyBrainerGear,
  customWeapons: dummyCustomWeapons,
  establishment: dummyEstablishment,
  followers: dummyFollowers,
  gang: dummyGang,
  holding: dummyHolding,
  skinnerGear: dummySkinnerGear,
  weapons: dummyWeapons,
  workspace: dummyWorkspace,
  __typename: 'PlaybookUniques',
};

// ------------------------------------------------------- BrainerGear / Brainer -------------------------------------------------------- //

export const mockBrainerGear: BrainerGear = {
  id: 'mock-brainer-gear-id',
  uniqueType: UniqueTypes.brainerGear,
  allowedItemsCount: 2,
  brainerGear: [],
};

export const mockPlaybookUniqueBrainer: PlaybookUniques = {
  id: 'mock-angel-unique-id',
  type: UniqueTypes.brainerGear,
  brainerGear: mockBrainerGear,
  __typename: 'PlaybookUniques',
};

export const mockPlaybookUniqueBrainer_withDummyUniques: PlaybookUniques = {
  id: 'mock-angel-unique-id',
  type: UniqueTypes.brainerGear,
  angelKit: dummyAngelKit,
  brainerGear: mockBrainerGear,
  customWeapons: dummyCustomWeapons,
  establishment: dummyEstablishment,
  followers: dummyFollowers,
  gang: dummyGang,
  holding: dummyHolding,
  skinnerGear: dummySkinnerGear,
  weapons: dummyWeapons,
  workspace: dummyWorkspace,
  __typename: 'PlaybookUniques',
};

// ------------------------------------------------------- Weapons / Gunlugger -------------------------------------------------------- //

export const mockWeapons: Weapons = {
  id: 'mock-weapons-id',
  uniqueType: UniqueTypes.weapons,
  weapons: ['big gun', 'sharp knife'],
  __typename: 'Weapons',
};

export const mockPlaybookUniqueGunlugger: PlaybookUniques = {
  id: 'mock-gunlugger-unique-id',
  type: UniqueTypes.weapons,
  weapons: mockWeapons,
  __typename: 'PlaybookUniques',
};

export const mockPlaybookUniqueGunlugger_withAngelKit: PlaybookUniques = {
  id: 'mock-gunlugger-unique-id',
  type: UniqueTypes.weapons,
  weapons: mockWeapons,
  angelKit: mockAngelKit,
  __typename: 'PlaybookUniques',
};

// ------------------------------------------------------- Gang / Chopper -------------------------------------------------------- //

export const mockGang_noSelectionsMade: Gang = {
  id: 'mock-gang-id',
  uniqueType: UniqueTypes.gang,
  size: GangSize.small,
  allowedStrengths: 2,
  harm: 2,
  armor: 1,
  strengths: [],
  weaknesses: [],
  tags: ['savage'],
  __typename: 'Gang',
};

export const mockPlaybookUniqueChopper: PlaybookUniques = {
  id: 'mock-chopper-unique-id',
  type: UniqueTypes.gang,
  gang: mockGang_noSelectionsMade,
  __typename: 'PlaybookUniques',
};

// ------------------------------------------------------- Holding / HardHolder -------------------------------------------------------- //

export const mockHolding_noSelectionsMade: Holding = {
  id: 'mock-holding-1-id',
  uniqueType: UniqueTypes.holding,
  holdingSize: HoldingSize.medium,
  gangSize: GangSize.small,
  souls: HOLDING_SOULS_MEDIUM,
  surplus: 1,
  barter: 0,
  gangHarm: 2,
  gangArmor: 1,
  gangDefenseArmorBonus: 1,
  wants: ['hungry'],
  gigs: ['hunting', 'crude farming', 'scavenging'],
  gangTags: ['unruly'],
  strengthsCount: 4,
  weaknessesCount: 2,
  selectedStrengths: [],
  selectedWeaknesses: [],
  __typename: 'Holding',
};

export const mockHolding_with3Improvements: Holding = {
  ...mockHolding_noSelectionsMade,
  id: 'mock-holding-2-id',
  strengthsCount: 6,
  weaknessesCount: 1,
};

export const mockPlaybookUniqueHardHolder: PlaybookUniques = {
  id: 'mock-hardholder-unique-1-id',
  type: UniqueTypes.holding,
  holding: mockHolding_noSelectionsMade,
  __typename: 'PlaybookUniques',
};

export const mockPlaybookUniqueHardHolder_with3Improvements: PlaybookUniques = {
  ...mockPlaybookUniqueHardHolder,
  id: 'mock-hardholder-unique-2-id',
  holding: mockHolding_with3Improvements,
};

// ------------------------------------------------------- Followers / Hocus -------------------------------------------------------- //

export const mockFollowers_noSelectionsMade: Followers = {
  id: 'mock-followers-1-id',
  uniqueType: UniqueTypes.followers,
  description: '',
  travelOption: '',
  characterization: '',
  followers: 20,
  fortune: 1,
  barter: 0,
  surplusBarter: 1,
  strengthsCount: 2,
  weaknessesCount: 2,
  surplus: [],
  wants: [],
  selectedStrengths: [],
  selectedWeaknesses: [],
  __typename: 'Followers',
};

export const mockFollowers_with1Improvement: Followers = {
  ...mockFollowers_noSelectionsMade,
  id: 'mock-followers-2-id',
  strengthsCount: 3,
};

export const mockPlaybookUniqueHocus: PlaybookUniques = {
  id: 'mock-hocus-unique-1-id',
  type: UniqueTypes.followers,
  followers: mockFollowers_noSelectionsMade,
  __typename: 'PlaybookUniques',
};

export const mockPlaybookUniqueHocus_with1Improvement: PlaybookUniques = {
  ...mockPlaybookUniqueHocus,
  id: 'mock-hocus-unique-2-id',
  followers: mockFollowers_with1Improvement,
};

// ------------------------------------------------------- Workspace / Savvyhead -------------------------------------------------------- //

export const mockWorkspace_noSelectionsMade: Workspace = {
  id: 'mock-workspace-1-id',
  uniqueType: UniqueTypes.workspace,
  workspaceInstructions: 'When you go into your workspace and dedicate yourself to making a thing, or ...',
  projectInstructions: "During play, it's your job to have your character start and pursue projects...",
  itemsCount: 3,
  workspaceItems: [],
  projects: [],
  __typename: 'Workspace',
};

export const mockWorkspace_withImprovement: Workspace = {
  ...mockWorkspace_noSelectionsMade,
  id: 'mock-workspace-2-id',
  itemsCount: 5,
};

export const mockWorkspace_withBothImprovements: Workspace = {
  ...mockWorkspace_noSelectionsMade,
  id: 'mock-workspace-3-id',
  itemsCount: 6,
  workspaceItems: ['item1', 'item2', 'item3', 'item4', 'item5', LIFE_SUPPORT_TEXT],
};

export const mockPlaybookUniqueSavvyhead: PlaybookUniques = {
  id: 'mock-savvyhead-unique-1-id',
  type: UniqueTypes.workspace,
  workspace: mockWorkspace_noSelectionsMade,
  __typename: 'PlaybookUniques',
};

export const mockPlaybookUniqueSavvyhead_withImprovement: PlaybookUniques = {
  ...mockPlaybookUniqueSavvyhead,
  id: 'mock-savvyhead-unique-2-id',
  workspace: mockWorkspace_withImprovement,
};

export const mockPlaybookUniqueSavvyhead_withBothImprovements: PlaybookUniques = {
  ...mockPlaybookUniqueSavvyhead,
  id: 'mock-savvyhead-unique-3-id',
  workspace: mockWorkspace_withBothImprovements,
};

// ------------------------------------------------------- Establishment / Maestro D' -------------------------------------------------------- //

export const mockEstablishment_noSelectionsMade: Establishment = {
  id: 'mock-establishment-1-id',
  uniqueType: UniqueTypes.establishment,
  securitiesCount: 2,
  mainAttraction: '',
  bestRegular: '',
  worstRegular: '',
  wantsInOnIt: '',
  oweForIt: '',
  wantsItGone: '',
  sideAttractions: [],
  atmospheres: [],
  regulars: ['Lamprey', 'Ba', 'Camo', 'Toyota', 'Lits'],
  interestedParties: ['Been', 'Rolfball', 'Gams'],
  securityOptions: [],
  castAndCrew: [],
  __typename: 'Establishment',
};

export const mockEstablishment_withOneImprovement: Establishment = {
  ...mockEstablishment_noSelectionsMade,
  securitiesCount: 3,
};

export const mockPlaybookUniqueMaestroD: PlaybookUniques = {
  id: 'mock-meastrod-unique-1-id',
  type: UniqueTypes.establishment,
  establishment: mockEstablishment_noSelectionsMade,
  __typename: 'PlaybookUniques',
};

export const mockPlaybookUniqueMaestroD_withOneImprovement: PlaybookUniques = {
  ...mockPlaybookUniqueMaestroD,
  id: 'mock-meastrod-unique-2-id',
  establishment: mockEstablishment_withOneImprovement,
};
