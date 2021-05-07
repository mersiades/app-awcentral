// ---------------------------------------------------- Dummy objects ---------------------------------------------------- //

import { TaggedItem, ItemCharacteristic } from '../../@types';
import {
  AngelKit,
  BrainerGear,
  CustomWeapons,
  Establishment,
  Followers,
  Gang,
  Holding,
  Project,
  SkinnerGear,
  Weapons,
  Workspace,
} from '../../@types/dataInterfaces';
import {
  MoveType,
  PlaybookType,
  StatType,
  MoveActionType,
  RollType,
  HoldingSize,
  GangSize,
  VehicleFrameType,
  BattleOptionType,
  UniqueTypes,
} from '../../@types/enums';
import {
  AngelKitCreator,
  BrainerGearCreator,
  CustomWeaponsCreator,
  EstablishmentCreator,
  FollowersCreator,
  FollowersOption,
  GangCreator,
  GangOption,
  HoldConditions,
  HoldingCreator,
  HoldingOption,
  Move,
  MoveAction,
  PlusOneForwardConditions,
  RollModifier,
  SecurityOption,
  SkinnerGearCreator,
  SkinnerGearItem,
  StatModifier,
  VehicleBattleOption,
  VehicleFrame,
  WeaponsCreator,
  WorkspaceCreator,
} from '../../@types/staticDataInterfaces';

export const dummyTaggedItem: TaggedItem = {
  id: 'dummy',
  description: 'dummy',
  tags: ['dummy'],
};

export const dummyItemCharacteristic: ItemCharacteristic = {
  id: 'dummy',
  description: 'dummy',
  tag: 'dummy',
};

export const dummyRollModifier: RollModifier = {
  id: 'dummy',
  movesToModify: [
    {
      id: 'dummy',
      name: 'dummy',
      kind: MoveType.basic,
      description: 'dummy',
      playbook: PlaybookType.angel,
      stat: StatType.hx,
      statModifier: {
        id: 'dummy',
        statToModify: StatType.sharp,
        modification: 0,
        maxLimit: 0,
      },
      // rollModifier: {}, // Can't include RollModifier because recursive
      moveAction: {
        id: 'dummy',
        actionType: MoveActionType.roll,
        rollType: RollType.stat,
        statToRollWith: StatType.hard,
        holdConditions: {
          id: 'dummy',
          onTenPlus: 3,
          onSevenToNine: 1,
          onMiss: 0,
        },
        plusOneForwardConditions: {
          id: 'dummy',
          isManualGrant: false,
          onTenPlus: false,
          onSevenToNine: false,
          onMiss: false,
        },
      },
      __typename: 'Move',
    },
  ],
  statToRollWith: StatType.sharp,
};

export const dummyStatModifier: StatModifier = {
  id: 'dummy',
  statToModify: StatType.sharp,
  modification: 0,
  maxLimit: 0,
};

//// ----------------------------------------------Dummy playbook creators ---------------------------------- ////

export const dummyAngelKitCreator: AngelKitCreator = {
  id: 'dummy',
  angelKitInstructions: 'dummy',
  startingStock: 0,
};

export const dummyBrainerGearCreator: BrainerGearCreator = {
  id: 'dummy',
  defaultItemCount: 0,
  gear: ['dummy'],
};

export const dummyCustomWeaponsCreator: CustomWeaponsCreator = {
  id: 'dummy',
  firearmsTitle: 'dummy',
  firearmsBaseInstructions: 'dummy',
  firearmsBaseOptions: [dummyTaggedItem],
  firearmsOptionsInstructions: 'dummy',
  firearmsOptionsOptions: [dummyItemCharacteristic],
  handTitle: 'dummy',
  handBaseInstructions: 'dummy',
  handBaseOptions: [dummyTaggedItem],
  handOptionsInstructions: 'dummy',
  handOptionsOptions: [dummyItemCharacteristic],
};

// TODO: dummySecurityOption

export const dummyEstablishmentCreator: EstablishmentCreator = {
  id: 'dummy',
  mainAttractionCount: 1,
  sideAttractionCount: 2,
  attractions: [],
  atmospheres: [],
  atmosphereCount: [],
  regularsNames: [],
  regularsQuestions: [],
  interestedPartyNames: [],
  interestedPartyQuestions: [],
  securityOptions: [],
};

export const dummyFollowersOption: FollowersOption = {
  id: 'dummy',
  description: 'dummy',
  newNumberOfFollowers: 0,
  surplusBarterChange: 0,
  fortuneChange: 0,
  surplusChange: 'dummy',
  wantChange: ['dummy'],
};

export const dummyFollowerCreator: FollowersCreator = {
  id: 'dummy',
  instructions: 'dummy',
  defaultNumberOfFollowers: 0,
  defaultSurplusBarter: 0,
  defaultFortune: 0,
  defaultStrengthsCount: 0,
  defaultWeaknessesCount: 0,
  travelOptions: [],
  characterizationOptions: [],
  defaultWants: [],
  strengthOptions: [],
  weaknessOptions: [],
};

export const dummyGangOption: GangOption = {
  id: 'dummy',
  description: 'dummy',
  modifier: 'dummy',
  tag: 'dummy',
};

export const dummyGangCreator: GangCreator = {
  id: 'dummy',
  intro: 'dummy',
  defaultSize: GangSize.small,
  defaultHarm: 0,
  defaultArmor: 0,
  strengthChoiceCount: 0,
  weaknessChoiceCount: 0,
  defaultTags: ['dummy'],
  strengths: [dummyGangOption],
  weaknesses: [dummyGangOption],
};

export const dummyHoldingOption: HoldingOption = {
  id: 'dummy',
  description: 'dummy',
  surplusChange: 0,
  wantChange: ['string'],
  newHoldingSize: HoldingSize.medium,
  gigChange: 'dummy',
  newGangSize: GangSize.medium,
  gangTagChange: 'dummy',
  gangHarmChange: 0,
  newVehicleCount: 0,
  newBattleVehicleCount: 0,
  newArmorBonus: 0,
};

export const dummyHoldingCreator: HoldingCreator = {
  id: 'dummy',
  defaultHoldingSize: HoldingSize.medium,
  instructions: 'dummy',
  defaultSurplus: 0,
  defaultWant: 'dummy',
  defaultGigs: [],
  defaultArmorBonus: 0,
  defaultVehiclesCount: 0,
  defaultBattleVehicleCount: 0,
  defaultGangSize: GangSize.medium,
  defaultGangHarm: 0,
  defaultGangArmor: 0,
  defaultGangTag: 'dummy',
  defaultStrengthsCount: 0,
  defaultWeaknessesCount: 0,
  strengthOptions: [],
  weaknessOptions: [],
};

export const dummySkinnerGearItem: SkinnerGearItem = {
  id: 'dummy',
  item: 'dummy',
  note: 'dummy',
};

export const dummySkinnerGearCreator: SkinnerGearCreator = {
  id: 'dummy',
  graciousWeaponCount: 0,
  luxeGearCount: 0,
  graciousWeaponChoices: [dummySkinnerGearItem],
  luxeGearChoices: [dummySkinnerGearItem],
};

export const dummyWeaponsCreator: WeaponsCreator = {
  id: 'dummy',
  bfoGunOptionCount: 1,
  seriousGunOptionCount: 2,
  backupWeaponsOptionCount: 1,
  bigFuckOffGuns: ['dummy'],
  seriousGuns: ['dummy'],
  backupWeapons: ['dummy'],
};

export const dummyWorkspaceCreator: WorkspaceCreator = {
  id: 'dummy',
  itemsCount: 0,
  workspaceInstructions: 'dummy',
  projectInstructions: 'dummy',
  workspaceItems: [],
};

export const dummyHolding: Holding = {
  id: 'dummy22',
  uniqueType: UniqueTypes.holding,
  holdingSize: HoldingSize.medium,
  gangSize: GangSize.medium,
  souls: 'dummy',
  surplus: 0,
  barter: 0,
  gangHarm: 0,
  gangArmor: 0,
  gangDefenseArmorBonus: 0,
  wants: ['dummy'],
  gigs: ['dummy'],
  gangTags: ['dummy'],
  strengthsCount: 4,
  weaknessesCount: 2,
  selectedStrengths: [dummyHoldingOption],
  selectedWeaknesses: [dummyHoldingOption],
  __typename: 'Holding',
};

export const dummyGang: Gang = {
  id: 'dummy11',
  uniqueType: UniqueTypes.gang,
  size: GangSize.small,
  allowedStrengths: 2,
  harm: 2,
  armor: 1,
  strengths: [dummyGangOption],
  weaknesses: [dummyGangOption],
  tags: ['dummy'],
  __typename: 'Gang',
};

export const dummyHoldConditions: HoldConditions = {
  id: 'dummy',
  onTenPlus: 3,
  onSevenToNine: 1,
  onMiss: 0,
};

export const dummyPlusOneForwardConditions: PlusOneForwardConditions = {
  id: 'dummy',
  isManualGrant: false,
  onTenPlus: false,
  onSevenToNine: false,
  onMiss: false,
};

export const dummyMoveAction: MoveAction = {
  id: 'dummy',
  actionType: MoveActionType.roll,
  rollType: RollType.stat,
  statToRollWith: StatType.hard,
  holdConditions: dummyHoldConditions,
  plusOneForwardConditions: dummyPlusOneForwardConditions,
};

export const dummyCustomWeapons: CustomWeapons = {
  id: 'dummy1',
  uniqueType: UniqueTypes.customWeapons,
  weapons: ['dummy'],
  __typename: 'CustomWeapons',
};

export const dummyWeapons: Weapons = {
  id: 'dummy2',
  uniqueType: UniqueTypes.weapons,
  weapons: ['dummy'],
  __typename: 'Weapons',
};

export const dummyBrainerGear: BrainerGear = {
  id: 'dummy3',
  uniqueType: UniqueTypes.brainerGear,
  allowedItemsCount: 0,
  brainerGear: ['dummy'],
  __typename: 'BrainerGear',
};

export const dummySkinnerGear: SkinnerGear = {
  id: 'dummy4',
  uniqueType: UniqueTypes.skinnerGear,
  graciousWeapon: dummySkinnerGearItem,
  luxeGear: [dummySkinnerGearItem],
  __typename: 'SkinnerGear',
};

export const dummyAngelKitMove: Move = {
  id: 'dummy5',
  name: 'dummy',
  description: 'dummy',
  kind: MoveType.character,
  playbook: PlaybookType.angel,
  stat: StatType.cool,
  statModifier: dummyStatModifier,
  rollModifier: dummyRollModifier,
  moveAction: dummyMoveAction,
};

export const dummyAngelKit: AngelKit = {
  id: 'dummy6',
  uniqueType: UniqueTypes.angelKit,
  description: 'dummy',
  stock: 0,
  hasSupplier: false,
  supplierText: 'dummy',
  angelKitMoves: [dummyAngelKitMove],
  __typename: 'AngelKit',
};

export const dummySecurityOption: SecurityOption = {
  id: '',
  description: '',
  value: 0,
  __typename: 'SecurityOption',
};

export const dummyEstablishment: Establishment = {
  id: 'dummy7',
  uniqueType: UniqueTypes.establishment,
  mainAttraction: 'dummy',
  bestRegular: 'dummy',
  worstRegular: 'dummy',
  wantsInOnIt: 'dummy',
  oweForIt: 'dummy',
  wantsItGone: 'dummy',
  sideAttractions: ['dummy'],
  atmospheres: ['dummy'],
  regulars: ['dummy'],
  interestedParties: ['dummy'],
  securityOptions: [],
  castAndCrew: [],
  __typename: 'Establishment',
};

export const dummyFollowers: Followers = {
  id: 'dummy8',
  uniqueType: UniqueTypes.followers,
  description: 'dummy',
  travelOption: 'dummy',
  characterization: 'dummy',
  followers: 0,
  fortune: 0,
  barter: 0,
  surplusBarter: 0,
  strengthsCount: 2,
  weaknessesCount: 2,
  surplus: ['dummy'],
  wants: ['dummy'],
  selectedStrengths: [dummyFollowersOption],
  selectedWeaknesses: [dummyFollowersOption],
  __typename: 'Followers',
};

export const dummyProject: Project = {
  id: 'dummy',
  name: 'dummy',
  notes: 'dummy',
  __typename: 'Project',
};

export const dummyWorkspace: Workspace = {
  id: 'dummy9',
  uniqueType: UniqueTypes.workspace,
  workspaceInstructions: 'dummy',
  projectInstructions: 'dummy',
  workspaceItems: ['dummy'],
  projects: [dummyProject],
  __typename: 'Workspace',
};

export const dummyVehicleFrame: VehicleFrame = {
  id: 'dummy',
  frameType: VehicleFrameType.large,
  massive: 0,
  examples: 'dummy',
  battleOptionCount: 0,
  __typename: 'VehicleFrame',
};

export const dummyBattleOption: VehicleBattleOption = {
  id: 'dummy',
  battleOptionType: BattleOptionType.speed,
  name: '+1speed',
  __typename: 'VehicleBattleOption',
};
