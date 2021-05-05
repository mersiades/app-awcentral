import { PlaybookUniques, AngelKit, CustomWeapons, Weapons, BrainerGear, Gang } from '../../@types/dataInterfaces';
import { GangSize, UniqueTypes } from '../../@types/enums';
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
