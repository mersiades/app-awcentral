import { AngelKit, PlaybookUniques } from '../../../src/@types/dataInterfaces';
import { UniqueTypes } from '../../../src/@types/enums';

export const mockAngelKit_1: AngelKit = {
  id: '60a878f1d4d5867e1191a343',
  uniqueType: 'ANGEL_KIT' as UniqueTypes,
  description:
    'Your angel kit has all kinds of crap in it: scissors, rags, tape, needles, clamps, gloves, chill coils, wipes, alcohol, injectable tourniquets & bloodslower, instant blood packets (coffee reddener), tubes of meatmesh, bonepins & site injectors, biostabs, chemostabs, narcostabs (chillstabs) in quantity, and a roll of heart jumpshock patches for when it comes to that. It’s big enough to fill the trunk of a car.\n\nWhen you use it, spend its stock; you can spend 0–3 of its stock per use.\n\nYou can resupply it for 1-barter per 2-stock, if your circumstances let you barter for medical supplies.',
  stock: 2,
  angelKitMoves: [], // TODO add mock moves
  hasSupplier: false,
  supplierText: '_**You have a supplier.**_\nAt the beginning of every session, gain 1-stock, to a maximum of 6-stock.',
  __typename: 'AngelKit',
};

export const angel_sara_1_playbookUnique: PlaybookUniques = {
  id: '60a730246a012a4e90170fd7',
  type: 'ANGEL_KIT' as UniqueTypes,
  angelKit: mockAngelKit_1,
  brainerGear: undefined,
  customWeapons: undefined,
  followers: undefined,
  gang: undefined,
  holding: undefined,
  skinnerGear: undefined,
  weapons: undefined,
  workspace: undefined,
  establishment: undefined,
  __typename: 'PlaybookUniques',
};
