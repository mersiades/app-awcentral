import {
  CustomWeapons,
  PlaybookUniques,
} from '../../../src/@types/dataInterfaces';
import { UniqueTypes } from '../../../src/@types/enums';

export const mockCustomWeapons_1: CustomWeapons = {
  id: '60a730246a012a4e90170fd6',
  uniqueType: 'CUSTOM_WEAPONS' as UniqueTypes,
  weapons: [
    'antique rifle (2-harm, load, valuable',
    'Ornate staff (1-harm, valuable)',
  ],
  __typename: 'CustomWeapons',
};

export const battlebabe_john_1_playbookUnique: PlaybookUniques = {
  id: '60a730246a012a4e90170fd7',
  type: 'CUSTOM_WEAPONS' as UniqueTypes,
  angelKit: undefined,
  brainerGear: undefined,
  customWeapons: mockCustomWeapons_1,
  followers: undefined,
  gang: undefined,
  holding: undefined,
  skinnerGear: undefined,
  weapons: undefined,
  workspace: undefined,
  establishment: undefined,
  __typename: 'PlaybookUniques',
};
