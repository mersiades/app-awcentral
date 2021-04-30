import { HxInput, ItemCharacteristic, KeycloakUser, KeycloakUserInfo, TaggedItem, VehicleInput } from '../@types';
import {
  AngelKit,
  BattleVehicle,
  BrainerGear,
  CharacterHarm,
  CustomWeapons,
  Establishment,
  Followers,
  Game,
  GameRole,
  Gang,
  Hold,
  Holding,
  HxStat,
  PlaybookUnique,
  Project,
  SkinnerGear,
  StatsBlock,
  Vehicle,
  Weapons,
  Workspace,
} from '../@types/dataInterfaces';
import {
  BattleOptionType,
  GangSize,
  HoldingSize,
  LookType,
  MoveActionType,
  MoveType,
  PlaybookType,
  RoleType,
  RollType,
  StatType,
  UniqueTypes,
  VehicleFrameType,
  VehicleType,
} from '../@types/enums';
import {
  AngelKitCreator,
  BattleVehicleCreator,
  BikeCreator,
  BrainerGearCreator,
  CarCreator,
  CharacterMove,
  ContentItem,
  CustomWeaponsCreator,
  EstablishmentCreator,
  FirstSessionContent,
  FollowersCreator,
  FollowersOption,
  GangCreator,
  GangOption,
  GearInstructions,
  HoldConditions,
  HoldingCreator,
  HoldingOption,
  Look,
  McContent,
  Move,
  MoveAction,
  Name,
  Playbook,
  PlaybookCreator,
  PlaybookUniqueCreator,
  PlusOneForwardConditions,
  RollModifier,
  SecurityOption,
  SkinnerGearCreator,
  SkinnerGearItem,
  StatModifier,
  StatsOption,
  TickerList,
  VehicleBattleOption,
  VehicleCreator,
  VehicleFrame,
  WeaponsCreator,
  WorkspaceCreator,
} from '../@types/staticDataInterfaces';
import { ANGEL_SPECIAL_NAME, UNDER_FIRE_NAME } from '../config/constants';

// Same as Character, but with no nullable fields
interface MockCharacter {
  id: string;
  statsBlock?: StatsBlock;
  hxBlock: HxStat[];
  gear: string[];
  looks: Look[]; // Does graphql return an empty array or undefined? // May need an id-less version of Look "EmbeddedLook"
  name?: string;
  barter?: number;
  playbook: PlaybookType;
  harm: CharacterHarm;
  vehicleCount: number;
  battleVehicleCount: number;
  hasCompletedCharacterCreation: boolean;
  hasPlusOneForward: boolean;
  holds: Hold[];
  playbookUnique?: PlaybookUnique;
  characterMoves: CharacterMove[];
  vehicles: Vehicle[];
  battleVehicles: BattleVehicle[];
  experience: number;
  __typename?: 'Character';
}

export const mockNewGameName = 'My new mock game';

// ---------------------------------------------------- Dummy objects ---------------------------------------------------- //

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
};

//// ----------------------------------------------Dummy playbook creators ---------------------------------- ////

export const dummyAngelKitCreator: AngelKitCreator = {
  id: 'dummy',
  angelKitInstructions: 'dummy',
  startingStock: 0,
};

export const dummyBrainerGearCreator: BrainerGearCreator = {
  id: 'dummy',
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
  strengthCount: 0,
  weaknessCount: 0,
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
  strengthCount: 0,
  weaknessCount: 0,
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
  id: 'dummy',
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
  selectedStrengths: [dummyHoldingOption],
  selectedWeaknesses: [dummyHoldingOption],
};

export const dummyGang: Gang = {
  id: 'dummy',
  size: GangSize.small,
  harm: 2,
  armor: 1,
  strengths: [dummyGangOption],
  weaknesses: [dummyGangOption],
  tags: ['dummy'],
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
  id: 'dummy',
  weapons: ['dummy'],
};

export const dummyWeapons: Weapons = {
  id: 'dummy',
  weapons: ['dummy'],
};

export const dummyBrainerGear: BrainerGear = {
  id: 'dummy',
  brainerGear: ['dummy'],
};

export const dummySkinnerGear: SkinnerGear = {
  id: 'dummy',
  graciousWeapon: dummySkinnerGearItem,
  luxeGear: [dummySkinnerGearItem],
};

export const dummyAngelKitMove: Move = {
  id: 'dummy',
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
  id: 'dummy',
  description: 'dummy',
  stock: 0,
  hasSupplier: false,
  supplierText: 'dummy',
  angelKitMoves: [dummyAngelKitMove],
};

export const dummySecurityOption: SecurityOption = {
  id: '',
  description: '',
  value: 0,
  __typename: 'SecurityOption',
};

export const dummyEstablishment: Establishment = {
  id: 'dummy',
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
  id: 'dummy',
  description: 'dummy',
  travelOption: 'dummy',
  characterization: 'dummy',
  followers: 0,
  fortune: 0,
  barter: 0,
  surplusBarter: 0,
  surplus: ['dummy'],
  wants: ['dummy'],
  selectedStrengths: [dummyFollowersOption],
  selectedWeaknesses: [dummyFollowersOption],
};

export const dummyProject: Project = {
  id: 'dummy',
  name: 'dummy',
  notes: 'dummy',
  __typename: 'Project',
};

export const dummyWorkspace: Workspace = {
  id: 'dummy',
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
};

export const dummyBattleOption: VehicleBattleOption = {
  id: 'dummy',
  battleOptionType: BattleOptionType.speed,
  name: '+1speed',
};

// ---------------------------------------------------- Mock Users ---------------------------------------------------- //

export const mockKeycloakUserInfo1: KeycloakUserInfo = {
  email: 'mockUser1@email.com',
  email_verified: true,
  family_name: 'mock-family-name-1',
  given_name: 'mock-given-name-1',
  name: 'mock-name-1',
  preferred_username: 'mock-user-1',
  sub: 'mock-keycloak-id-1',
};

export const mockKeycloakUser1: KeycloakUser = {
  id: 'mock-keycloak-id-1',
  username: 'mock-user-1',
  email: 'mockUser1@email.com',
};

export const mockKeycloakUserInfo2: KeycloakUserInfo = {
  email: 'mockUser2@email.com',
  email_verified: true,
  family_name: 'mock-family-name-2',
  given_name: 'mock-given-name-2',
  name: 'mock-name-2',
  preferred_username: 'mock-user-2',
  sub: 'mock-keycloak-id-2',
};

export const mockKeycloakUser2: KeycloakUser = {
  id: 'mock-keycloak-id-2',
  username: 'mock-user-2',
  email: 'mockUser2@email.com',
};

export const mockKeycloakUser3: KeycloakUser = {
  id: 'mock-keycloak-id-3',
  username: 'mock-user-3',
  email: 'mockUser3@email.com',
};

export const mockStatsBlock1: StatsBlock = {
  id: 'mock-stats-block-id-1',
  statsOptionId: 'mock-stats-option-id-1',
  stats: [
    {
      id: 'mock-statsblock-stat-id-1',
      stat: StatType.cool,
      value: 1,
      isHighlighted: true,
    },
    {
      id: 'mock-statsblock-stat-id-2',
      stat: StatType.hard,
      value: 1,
      isHighlighted: true,
    },
    {
      id: 'mock-statsblock-stat-id-3',
      stat: StatType.hot,
      value: 1,
      isHighlighted: false,
    },
    {
      id: 'mock-statsblock-stat-id-4',
      stat: StatType.sharp,
      value: 1,
      isHighlighted: false,
    },
    {
      id: 'mock-statsblock-stat-id-5',
      stat: StatType.weird,
      value: 1,
      isHighlighted: false,
    },
  ],
};

export const mockStatsBlockWithHighlight: StatsBlock = {
  id: 'mock-stats-block-id-1',
  statsOptionId: 'mock-stats-option-id-1',
  stats: [
    {
      id: 'mock-statsblock-stat-id-1',
      stat: StatType.cool,
      value: 1,
      isHighlighted: true,
    },
    {
      id: 'mock-statsblock-stat-id-2',
      stat: StatType.hard,
      value: 1,
      isHighlighted: false,
    },
    {
      id: 'mock-statsblock-stat-id-3',
      stat: StatType.hot,
      value: 1,
      isHighlighted: false,
    },
    {
      id: 'mock-statsblock-stat-id-4',
      stat: StatType.sharp,
      value: 1,
      isHighlighted: false,
    },
    {
      id: 'mock-statsblock-stat-id-5',
      stat: StatType.weird,
      value: 1,
      isHighlighted: false,
    },
  ],
};

export const mockPlaybookCreatorMoveAngel1: Move = {
  id: 'angel-move-id-1',
  name: ANGEL_SPECIAL_NAME,
  kind: MoveType.default,
  description: 'If you and another character have sex,',
  playbook: PlaybookType.angel,
  stat: StatType.hx,
  statModifier: dummyStatModifier,
  rollModifier: dummyRollModifier,
  moveAction: dummyMoveAction,
  __typename: 'Move',
};

export const mockCharacterMoveAngel1: CharacterMove = {
  id: 'angel-move-id-1',
  name: ANGEL_SPECIAL_NAME,
  kind: MoveType.default,
  description: 'If you and another character have sex,',
  playbook: PlaybookType.angel,
  stat: StatType.hx,
  statModifier: dummyStatModifier,
  rollModifier: dummyRollModifier,
  moveAction: dummyMoveAction,
  isSelected: true,
  __typename: 'Move',
};

export const mockCharacterMoveAngel2: CharacterMove = {
  id: 'angel-move-id-2',
  name: 'SIXTH SENSE',
  kind: MoveType.character,
  description: 'when you open your brain to the world’s psychic maelstrom...',
  playbook: PlaybookType.angel,
  stat: StatType.sharp,
  rollModifier: dummyRollModifier,
  statModifier: dummyStatModifier,
  moveAction: dummyMoveAction,
  isSelected: false,
  __typename: 'Move',
};

export const mockCharacterMoveAngel3: CharacterMove = {
  id: 'angel-move-id-3',
  name: 'INFIRMARY',
  description: 'you get an infirmary, a workspace with life support...',
  kind: MoveType.character,
  playbook: PlaybookType.angel,
  stat: StatType.sharp,
  rollModifier: dummyRollModifier,
  statModifier: dummyStatModifier,
  moveAction: dummyMoveAction,
  isSelected: false,
  __typename: 'Move',
};

export const mockCharacterMoveAngel4: CharacterMove = {
  id: 'angel-move-id-4',
  name: 'PROFESSIONAL COMPASSION',
  description: 'you can roll+sharp instead of roll+Hx when you help someone who’s rolling.',
  kind: MoveType.character,
  playbook: PlaybookType.angel,
  stat: StatType.hx,
  rollModifier: dummyRollModifier,
  statModifier: dummyStatModifier,
  moveAction: dummyMoveAction,
  isSelected: false,
  __typename: 'Move',
};

export const mockNameAngel1: Name = {
  id: 'mock-angel-name-id-1',
  name: 'Jay',
  __typename: 'Name',
};

export const mockNameAngel2: Name = {
  id: 'mock-angel-name-id-2',
  name: 'Boo',
  __typename: 'Name',
};

export const mockLookAngel1: Look = {
  id: 'mock-angel-look-id-1',
  look: 'man',
  category: LookType.gender,
  playbookType: PlaybookType.angel,
  __typename: 'Look',
};

export const mockLookAngel2: Look = {
  id: 'mock-angel-look-id-2',
  look: 'woman',
  category: LookType.gender,
  playbookType: PlaybookType.angel,
  __typename: 'Look',
};

export const mockLookAngel3: Look = {
  id: 'mock-angel-look-id-3',
  look: 'utility wear',
  category: LookType.clothes,
  playbookType: PlaybookType.angel,
  __typename: 'Look',
};

export const mockLookAngel4: Look = {
  id: 'mock-angel-look-id-4',
  look: 'casual wear plus utility',
  category: LookType.clothes,
  playbookType: PlaybookType.angel,
  __typename: 'Look',
};

export const mockLookAngel5: Look = {
  id: 'mock-angel-look-id-5',
  look: 'kind face',
  category: LookType.face,
  playbookType: PlaybookType.angel,
  __typename: 'Look',
};

export const mockLookAngel6: Look = {
  id: 'mock-angel-look-id-6',
  look: 'strong face',
  category: LookType.face,
  playbookType: PlaybookType.angel,
  __typename: 'Look',
};

export const mockLookAngel7: Look = {
  id: 'mock-angel-look-id-7',
  look: 'hard eyes',
  category: LookType.eyes,
  playbookType: PlaybookType.angel,
  __typename: 'Look',
};

export const mockLookAngel8: Look = {
  id: 'mock-angel-look-id-8',
  look: 'quick eyes',
  category: LookType.eyes,
  playbookType: PlaybookType.angel,
  __typename: 'Look',
};

export const mockLookAngel9: Look = {
  id: 'mock-angel-look-id-9',
  look: 'compact body',
  category: LookType.body,
  playbookType: PlaybookType.angel,
  __typename: 'Look',
};

export const mockLookAngel10: Look = {
  id: 'mock-angel-look-id-10',
  look: 'stout body',
  category: LookType.body,
  playbookType: PlaybookType.angel,
  __typename: 'Look',
};

export const mockLookBettleBabe1: Look = {
  id: 'mock-battlebabe-look-id-1',
  look: 'woman',
  category: LookType.gender,
  playbookType: PlaybookType.battlebabe,
  __typename: 'Look',
};

export const mockLookBattlebabe2: Look = {
  id: 'mock-battlebabe-look-id-2',
  look: 'formal wear',
  category: LookType.clothes,
  playbookType: PlaybookType.battlebabe,
  __typename: 'Look',
};

export const mockCustomWeapons: CustomWeapons = {
  id: 'mock-custom-weapons-id',
  weapons: ['custom weapon 1', 'custom weapons 2'],
};

export const mockVehicle1: Vehicle = {
  id: 'mock-vehicle-id-1',
  vehicleType: VehicleType.car,
  name: 'Mock Vehicle 1',
  vehicleFrame: {
    id: 'mock-vehicle-frame-id-1',
    frameType: VehicleFrameType.large,
    massive: 3,
    examples: 'Garbage truck, bus',
    battleOptionCount: 2,
  },
  speed: 0,
  handling: 1,
  massive: 3,
  armor: 1,
  battleOptions: [
    {
      id: 'mock-battle-option-id-1',
      battleOptionType: BattleOptionType.armor,
      name: '+1armor',
    },
    {
      id: 'mock-battle-option-id-1',
      battleOptionType: BattleOptionType.armor,
      name: '+1handling',
    },
  ],
  strengths: ['fast'],
  weaknesses: ['guzzler'],
  looks: ['muscular'],
};

export const mockVehicles: Vehicle[] = [mockVehicle1];

export const mockPlaybookUniqueBattlebabe: PlaybookUnique = {
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
  description: 'Your angel kit has all kinds of crap in it...',
  stock: 6,
  hasSupplier: false,
  supplierText: 'mock-supplier-text',
  angelKitMoves: [dummyAngelKitMove],
};

export const mockPlaybookUniqueAngel: PlaybookUnique = {
  id: 'mock-angle-unique-id',
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
};

export const mockCharacterHarm: CharacterHarm = {
  id: 'mock-character-harm-id-1',
  value: 0,
  isStabilized: false,
  hasComeBackHard: false,
  hasComeBackWeird: false,
  hasChangedPlaybook: false,
  hasDied: false,
};

export const mockCharacter1: MockCharacter = {
  __typename: 'Character',
  id: 'mock-character-id-1',
  name: 'Mock Character 1',
  playbook: PlaybookType.battlebabe,
  hasCompletedCharacterCreation: false,
  hasPlusOneForward: false,
  holds: [],
  gear: ['leather jacket', 'Timberland boots'],
  barter: 2,
  experience: 0,
  vehicleCount: 0,
  battleVehicleCount: 0,
  harm: mockCharacterHarm,
  statsBlock: mockStatsBlock1,
  hxBlock: [],
  looks: [mockLookBettleBabe1, mockLookBattlebabe2],
  characterMoves: [
    mockCharacterMoveAngel1,
    { ...mockCharacterMoveAngel2, isSelected: true },
    { ...mockCharacterMoveAngel3, isSelected: true },
  ], // TODO: change to battlebabe moves
  playbookUnique: mockPlaybookUniqueBattlebabe,
  vehicles: [],
  battleVehicles: [],
};

export const mockCharacter2: MockCharacter = {
  __typename: 'Character',
  id: 'mock-character-id-2',
  name: 'Mock Character 2',
  playbook: PlaybookType.angel,
  hasCompletedCharacterCreation: false,
  hasPlusOneForward: false,
  holds: [],
  gear: ['Grimey green raincoat', '9mm (2-harm close loud)'],
  statsBlock: mockStatsBlock1,
  barter: 2,
  experience: 0,
  hxBlock: [
    {
      id: 'hx-stat-id-1',
      characterId: mockCharacter1.id,
      characterName: mockCharacter1.name as string,
      hxValue: 1,
    },
  ],
  harm: { ...mockCharacterHarm, id: 'mock-character-harm-id-2' },
  looks: [mockLookAngel1, mockLookAngel3, mockLookAngel5, mockLookAngel7, mockLookAngel9],
  characterMoves: [
    { ...mockCharacterMoveAngel1, isSelected: true },
    { ...mockCharacterMoveAngel2, isSelected: true },
    { ...mockCharacterMoveAngel3, isSelected: true },
  ],
  playbookUnique: mockPlaybookUniqueAngel,
  vehicleCount: 0,
  battleVehicleCount: 0,
  vehicles: [],
  battleVehicles: [],
};

export const mockGame1: Game = {
  id: 'mock-game-id-1',
  name: 'Mock Game 1',
  commsApp: 'Discord',
  commsUrl: 'https://discord.com/urltodiscordchannel',
  hasFinishedPreGame: false,
  showFirstSession: false,
  mc: { displayName: 'mock-user-1', id: 'mock-keycloak-id-1' },
  players: [{ displayName: 'mock-user-2', id: 'mock-keycloak-id-2' }],
  gameRoles: [
    {
      id: 'mock-gameRole-id-1',
      role: RoleType.mc,
      gameId: 'mock-game-id-1',
      gameName: 'Mock Game 1',
      userId: 'mock-keycloak-id-1',
      characters: [],
      npcs: [],
      threats: [],
    },
    {
      id: 'mock-gameRole-id-3',
      role: RoleType.player,
      gameId: 'mock-game-id-1',
      gameName: 'Mock Game 1',
      userId: 'mock-keycloak-id-2',
      characters: [],
      npcs: [],
      threats: [],
    },
  ],
  invitees: [],
  gameMessages: [],
};

export const mockGame2: Game = {
  id: 'mock-game-id-2',
  name: 'Mock Game 2',
  commsApp: 'Zoom',
  commsUrl: 'https://zoom.com/urltozoomchannel',
  hasFinishedPreGame: false,
  showFirstSession: false,
  mc: { displayName: 'mock-user-2', id: 'mock-keycloak-id-2' },
  players: [{ displayName: 'mock-user-1', id: 'mock-keycloak-id-1' }],
  gameRoles: [
    {
      id: 'mock-gameRole-id-2',
      role: RoleType.player,
      gameId: 'mock-game-id-2',
      gameName: 'Mock Game 2',
      userId: 'mock-keycloak-id-1',
      characters: [],
      npcs: [],
      threats: [],
    },
    {
      id: 'mock-gameRole-id-4',
      role: RoleType.mc,
      gameId: 'mock-game-id-2',
      gameName: 'Mock Game 2',
      userId: 'mock-keycloak-id-2',
      characters: [],
      npcs: [],
      threats: [],
    },
  ],
  invitees: [],
  gameMessages: [],
};

export const mockGame3: Game = {
  id: 'mock-game-id-3',
  name: mockNewGameName,
  commsApp: '',
  commsUrl: '',
  hasFinishedPreGame: false,
  showFirstSession: false,
  mc: { displayName: 'mock-user-1', id: 'mock-keycloak-id-1', __typename: 'User' },
  players: [],
  gameRoles: [
    {
      id: 'mock-gameRole-id-5',
      role: RoleType.mc,
      gameId: 'mock-game-id-3',
      gameName: 'Mock Game 3',
      userId: 'mock-keycloak-id-1',
      characters: [],
      npcs: [],
      threats: [],
      __typename: 'GameRole',
    },
  ],
  invitees: [],
  gameMessages: [],
  __typename: 'Game',
};

// mockgame4 is used to test joining a game
export const mockGame4: Game = {
  id: 'mock-game-id-4',
  name: 'Mock Game 4 - Join Me',
  commsApp: 'Discord',
  commsUrl: 'https://discord.com/urltodiscordchannel',
  hasFinishedPreGame: false,
  showFirstSession: false,
  mc: { displayName: 'mock-user-2', id: 'mock-keycloak-id-2' },
  players: [{ id: 'mock-keycloak-id-3', displayName: 'mock-user-3' }],
  gameRoles: [
    {
      id: 'mock-gameRole-id-6',
      role: RoleType.mc,
      gameId: 'mock-game-id-4',
      gameName: 'Mock Game 4 - Join Me',
      userId: 'mock-keycloak-id-2',
      characters: [],
      npcs: [],
      threats: [],
    },
    {
      id: 'mock-gameRole-id-7',
      gameId: 'mock-game-id-4',
      gameName: 'Mock Game 4 - Join Me',
      role: RoleType.player,
      userId: 'mock-keycloak-id-3',
      characters: [],
      npcs: [],
      threats: [],
    },
  ],
  invitees: ['mockUser1@email.com'],
  gameMessages: [],
};

// mockGame5 is a continuation of mockGame4, and is used for testing character creation
export const mockGame5: Game = {
  id: 'mock-game-id-5',
  name: 'Mock Game 5',
  invitees: [],
  commsApp: 'Discord',
  commsUrl: 'https://discord.com/urltodiscordchannel',
  hasFinishedPreGame: false,
  showFirstSession: false,
  gameMessages: [],
  mc: { displayName: 'mock-user-2', id: 'mock-keycloak-id-2' },
  players: [
    { id: 'mock-keycloak-id-3', displayName: 'mock-user-3' },
    { id: 'mock-keycloak-id-1', displayName: 'mock-user-1' },
  ],
  gameRoles: [
    {
      __typename: 'GameRole',
      id: 'mock-gameRole-id-6',
      role: RoleType.mc,
      gameId: 'mock-game-id-5',
      gameName: 'Mock Game 5',
      userId: 'mock-keycloak-id-2',
      npcs: [],
      threats: [],
      characters: [],
    },
    {
      __typename: 'GameRole',
      id: 'mock-gameRole-id-7',
      gameId: 'mock-game-id-5',
      gameName: 'Mock Game 5',
      role: RoleType.player,
      userId: 'mock-keycloak-id-3',
      npcs: [],
      threats: [],
      characters: [mockCharacter1],
    },
    {
      __typename: 'GameRole',
      id: 'mock-gameRole-id-8',
      gameId: 'mock-game-id-5',
      gameName: 'Mock Game 5',
      role: RoleType.player,
      userId: 'mock-keycloak-id-1',
      npcs: [],
      threats: [],
      characters: [],
    },
  ],
};

// Used for testing starting a game from the PreGamePage
export const mockGame6: Game = {
  id: 'mock-game-id-6',
  name: 'Mock Game 6',
  commsApp: 'Discord',
  commsUrl: 'https://discord.com/urltodiscordchannel',
  hasFinishedPreGame: false,
  showFirstSession: false,
  mc: { displayName: 'mock-user-2', id: 'mock-keycloak-id-2' },
  players: [
    { id: 'mock-keycloak-id-3', displayName: 'mock-user-3' },
    { id: 'mock-keycloak-id-1', displayName: 'mock-user-1' },
  ],
  gameRoles: [
    {
      id: 'mock-gameRole-id-6',
      role: RoleType.mc,
      gameId: 'mock-game-id-6',
      gameName: 'Mock Game 6',
      userId: 'mock-keycloak-id-2',
      npcs: [],
      threats: [],
      characters: [],
    },
  ],
  invitees: [],
  gameMessages: [],
};

// Used for testing PlayerPage, GamePanel
export const mockGame7: Game = {
  id: 'mock-game-id-7',
  name: 'Mock Game 7',
  invitees: [],
  commsApp: 'Discord',
  commsUrl: 'https://discord.com/urltodiscordchannel',
  hasFinishedPreGame: false,
  showFirstSession: false,
  gameMessages: [],
  mc: { displayName: 'mock-user-2', id: 'mock-keycloak-id-2' },
  players: [
    { id: 'mock-keycloak-id-3', displayName: 'mock-user-3' },
    { id: 'mock-keycloak-id-1', displayName: 'mock-user-1' },
  ],
  gameRoles: [
    {
      id: 'mock-gameRole-id-6',
      role: RoleType.mc,
      userId: 'mock-keycloak-id-2',
      gameId: 'mock-game-id-7',
      gameName: 'Mock Game 7',
      npcs: [],
      threats: [],
      characters: [],
    },
    {
      id: 'mock-gameRole-id-7',
      role: RoleType.player,
      userId: 'mock-keycloak-id-3',
      gameId: 'mock-game-id-7',
      gameName: 'Mock Game 7',
      npcs: [],
      threats: [],
      characters: [{ ...mockCharacter1, hasCompletedCharacterCreation: true }],
    },
    {
      id: 'mock-gameRole-id-8',
      role: RoleType.player,
      userId: 'mock-keycloak-id-1',
      gameId: 'mock-game-id-7',
      gameName: 'Mock Game 7',
      npcs: [],
      threats: [],
      characters: [{ ...mockCharacter2, hasCompletedCharacterCreation: true }],
    },
  ],
  __typename: 'Game',
};

export const mockGameRole1: GameRole = {
  id: 'mock-gameRole-id-1',
  role: RoleType.mc,
  userId: 'mock-keycloak-id-1',
  gameId: mockGame1.id,
  gameName: mockGame1.name,
  characters: [],
  npcs: [],
  threats: [],
};

export const mockGameRole2: GameRole = {
  id: 'mock-gameRole-id-2',
  role: RoleType.player,
  userId: 'mock-keycloak-id-1',
  gameId: mockGame2.id,
  gameName: mockGame2.name,
  characters: [],
  npcs: [],
  threats: [],
};

export const mockGameRole3: GameRole = {
  id: 'mock-gameRole-id-3',
  role: RoleType.player,
  userId: 'mock-keycloak-id-2',
  gameId: mockGame1.id,
  gameName: mockGame1.name,
  characters: [],
  npcs: [],
  threats: [],
};

export const mockGameRole4: GameRole = {
  id: 'mock-gameRole-id-4',
  role: RoleType.mc,
  userId: 'mock-keycloak-id-2',
  gameId: mockGame2.id,
  gameName: mockGame2.name,
  characters: [],
  npcs: [],
  threats: [],
};

export const mockHxInput: HxInput = {
  characterId: mockCharacter1.id,
  characterName: mockCharacter1.name as string,
  hxValue: 1,
};

// -------------------------------------- Static move mocks ------------------------------------- //

export const doSomethingUnderFire: Move = {
  id: 'mock-move-id-1',
  name: UNDER_FIRE_NAME,
  description: 'When you _**do something under fire**_, or dig in to endure fire, roll+cool.',
  kind: MoveType.basic,
  playbook: PlaybookType.angel, // Apollo MockProvider won't allow undefined here
  stat: StatType.cool,
  statModifier: undefined,
  rollModifier: undefined,
  moveAction: {
    id: 'under-fire-id',
    actionType: MoveActionType.roll,
    rollType: RollType.stat,
    statToRollWith: StatType.cool,
    holdConditions: dummyHoldConditions,
    plusOneForwardConditions: dummyPlusOneForwardConditions,
  },
};

export const goAggro: Move = {
  id: 'mock-move-id-2',
  name: 'GO AGGRO ON SOMEONE',
  description:
    'When you _**go aggro on someone**_, make it clear what you want them to do and what you’ll do to them. Roll+hard.',
  kind: MoveType.basic,
  stat: StatType.hard,
  playbook: PlaybookType.angel, // Apollo MockProvider won't allow undefined here
  statModifier: undefined,
  rollModifier: undefined,
  moveAction: {
    id: 'aggro-id',
    actionType: MoveActionType.roll,
    rollType: RollType.stat,
    statToRollWith: StatType.hard,
    holdConditions: dummyHoldConditions,
    plusOneForwardConditions: dummyPlusOneForwardConditions,
  },
};

export const sucker: Move = {
  id: 'mock-move-id-3',
  name: 'SUCKER SOMEONE',
  description: 'When you _**attack someone unsuspecting or helpless**_, ask the MC if you could miss.',
  kind: MoveType.basic,
  stat: StatType.cool, // Apollo MockProvider won't allow undefined here
  playbook: PlaybookType.angel, // Apollo MockProvider won't allow undefined here
  statModifier: undefined,
  rollModifier: undefined,
  moveAction: dummyMoveAction,
};

export const sufferHarm: Move = {
  id: 'mock-move-id-4',
  name: 'SUFFER HARM',
  description: 'When you _**suffer harm**_, roll+harm suffered (after armor, if you’re wearing any).',
  kind: MoveType.peripheral,
  stat: StatType.cool, // Apollo MockProvider won't allow undefined here
  playbook: PlaybookType.angel, // Apollo MockProvider won't allow undefined here
  statModifier: undefined,
  rollModifier: undefined,
  moveAction: dummyMoveAction,
};

export const goToMarket: Move = {
  id: 'mock-move-id-5',
  name: 'GO TO THE MARKET',
  description:
    'When you _**go into a holding’s bustling market**_, looking for some particular thing to buy, and it’s not obvious whether you should be able to just go buy one like that, roll+sharp.',
  kind: MoveType.peripheral,
  stat: StatType.sharp,
  playbook: PlaybookType.angel, // Apollo MockProvider won't allow undefined here
  statModifier: undefined,
  rollModifier: undefined,
  moveAction: dummyMoveAction,
};

export const augury: Move = {
  id: 'mock-move-id-6',
  name: 'AUGURY',
  description: 'When you are able to use something for _**augury**_, roll+weird.',
  kind: MoveType.peripheral,
  stat: StatType.weird,
  playbook: PlaybookType.angel, // Apollo MockProvider won't allow undefined here
  statModifier: undefined,
  rollModifier: undefined,
  moveAction: dummyMoveAction,
};

export const exchangeHarm: Move = {
  id: 'mock-move-id-7',
  name: 'EXCHANGE HARM',
  description: 'When you _**exchange harm**_, both sides simultaneously inflict and suffer harm as established:',
  kind: MoveType.battle,
  stat: StatType.cool, // Apollo MockProvider won't allow undefined here
  playbook: PlaybookType.angel, // Apollo MockProvider won't allow undefined here
  statModifier: undefined,
  rollModifier: undefined,
  moveAction: dummyMoveAction,
};

export const seizeByForce: Move = {
  id: 'mock-move-id-8',
  name: 'SEIZE BY FORCE',
  description: 'To _**seize something by force**_, exchange harm, but first roll+hard.',
  kind: MoveType.battle,
  stat: StatType.hard,
  playbook: PlaybookType.angel, // Apollo MockProvider won't allow undefined here
  statModifier: undefined,
  rollModifier: undefined,
  moveAction: dummyMoveAction,
};
export const standOverwatch: Move = {
  id: 'mock-move-id-9',
  name: 'STAND OVERWATCH',
  description: 'When you _**stand overwatch**_ for an ally, roll+cool. ',
  kind: MoveType.battle,
  stat: StatType.cool,
  playbook: PlaybookType.angel, // Apollo MockProvider won't allow undefined here
  statModifier: undefined,
  rollModifier: undefined,
  moveAction: dummyMoveAction,
};

export const boardAMovingVehicle: Move = {
  id: 'mock-move-id-10',
  name: 'BOARD A MOVING VEHICLE',
  description:
    'To _**board a moving vehicle**_, roll+cool, minus its speed. To board one moving vehicle from another, roll+cool, minus the difference between their speeds.',
  kind: MoveType.roadWar,
  stat: StatType.cool,
  playbook: PlaybookType.angel, // Apollo MockProvider won't allow undefined here
  statModifier: undefined,
  rollModifier: undefined,
  moveAction: dummyMoveAction,
};

export const dealWithBadTerrain: Move = {
  id: 'mock-move-id-11',
  name: 'DEAL WITH BAD TERRAIN',
  description: 'When you have to _**deal with bad terrain**_, roll+cool, plus your vehicle’s handling.',
  kind: MoveType.roadWar,
  stat: StatType.cool,
  playbook: PlaybookType.angel, // Apollo MockProvider won't allow undefined here
  statModifier: undefined,
  rollModifier: undefined,
  moveAction: dummyMoveAction,
};
export const shoulderAnotherVehicle: Move = {
  id: 'mock-move-id-12',
  name: 'SHOULDER ANOTHER VEHICLE',
  description:
    'To _**shoulder another vehicle**_, roll+cool. On a hit, you shoulder it aside, inflicting v-harm as established.',
  kind: MoveType.roadWar,
  stat: StatType.cool,
  playbook: PlaybookType.angel, // Apollo MockProvider won't allow undefined here
  statModifier: undefined,
  rollModifier: undefined,
  moveAction: dummyMoveAction,
};

export const mockAllMovesArray = [
  doSomethingUnderFire,
  goAggro,
  sucker,
  sufferHarm,
  goToMarket,
  augury,
  exchangeHarm,
  seizeByForce,
  standOverwatch,
  boardAMovingVehicle,
  dealWithBadTerrain,
  shoulderAnotherVehicle,
];

// ------------------------------------------------------- Mock Angel playbook --------------------------------------------------- //
export const mockStatsOptionsAngel1: StatsOption = {
  id: 'angel-stats-options-1',
  COOL: 1,
  HARD: 0,
  HOT: 1,
  SHARP: 2,
  WEIRD: -1,
  __typename: 'StatsOption',
};

export const mockStatsOptionsAngel2: StatsOption = {
  id: 'angel-stats-options-2',
  COOL: 1,
  HARD: 1,
  HOT: 0,
  SHARP: 2,
  WEIRD: -1,
  __typename: 'StatsOption',
};

export const mockStatsOptionsAngel3: StatsOption = {
  id: 'angel-stats-options-3',
  COOL: -1,
  HARD: 1,
  HOT: 0,
  SHARP: 2,
  WEIRD: 1,
  __typename: 'StatsOption',
};

export const mockgearInstructionsAngel: GearInstructions = {
  id: 'angel-gear-instructions-id',
  gearIntro: 'You get:',
  youGetItems: ['fashion suitable to your look, including at your option a piece worth 1-armor (you detail)'],
  introduceChoice: 'Small practical weapons',
  numberCanChoose: 1,
  chooseableGear: [
    '.38 revolver (2-harm close reload loud)',
    '9mm (2-harm close loud)',
    'big knife (2-harm hand)',
    'sawed-off (3-harm close reload messy)',
    'stun gun (s-harm hand reload)',
  ],
  withMC: 'If you’d like to start play with a vehicle or a prosthetic, get with the MC.',
  startingBarter: 2,
};

export const mockAngelKitCreator: AngelKitCreator = {
  id: 'angel-kit-creator-id',
  angelKitInstructions: 'Your angel kit has all kinds of crap in it...',
  startingStock: 6,
  __typename: 'AngelKitCreator',
};

export const mockUniqueCreatorAngel: PlaybookUniqueCreator = {
  id: 'angel-playbook-unique-creator-id',
  type: UniqueTypes.angelKit,
  angelKitCreator: mockAngelKitCreator,
  brainerGearCreator: dummyBrainerGearCreator,
  customWeaponsCreator: dummyCustomWeaponsCreator,
  establishmentCreator: dummyEstablishmentCreator,
  followersCreator: dummyFollowerCreator,
  gangCreator: dummyGangCreator,
  holdingCreator: dummyHoldingCreator,
  skinnerGearCreator: dummySkinnerGearCreator,
  weaponsCreator: dummyWeaponsCreator,
  workspaceCreator: dummyWorkspaceCreator,
  __typename: 'PlaybookUniqueCreator',
};

export const mockPlaybookCreatorAngel: PlaybookCreator = {
  id: 'angel-playbook-creator-id',
  playbookType: PlaybookType.angel,
  gearInstructions: mockgearInstructionsAngel,
  improvementInstructions: 'Whenever you roll a highlighted stat...',
  movesInstructions: 'You get all the basic moves. Choose 2 angel moves.',
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
  statsOptions: [mockStatsOptionsAngel1, mockStatsOptionsAngel2, mockStatsOptionsAngel3],
  playbookUniqueCreator: mockUniqueCreatorAngel,
  optionalMoves: [mockCharacterMoveAngel2, mockCharacterMoveAngel3, mockCharacterMoveAngel4],
  defaultMoves: [mockCharacterMoveAngel1],
  defaultMoveCount: 1,
  moveChoiceCount: 2,
  defaultVehicleCount: 0,
  __typename: 'PlaybookCreator',
};

export const mockPlaybookAngel: Playbook = {
  id: 'mock-playbook-angel-id',
  playbookType: PlaybookType.angel,
  barterInstructions: 'At the beginning of the session, spend 1- or 2-barter for your lifestyle.',
  intro: 'When you’re lying in the dust of Apocalypse World guts aspilled...',
  introComment: 'Angels are medics. If you want everybody to love you...',
  playbookImageUrl: 'https://awc-images.s3-ap-southeast-2.amazonaws.com/angel-white-transparent.png',
};

export const mockPlaybookBattlbabe: Playbook = {
  id: 'mock-playbook-battlebabe-id',
  playbookType: PlaybookType.battlebabe,
  barterInstructions: 'At the beginning of the session, spend 1- or 2-barter for your lifestyle.',
  intro: 'Even in a place as dangerous as Apocalypse World, battlebabes are, well.',
  introComment: 'Battlebabes are good in battle, of course, but they’re wicked social too.',
  playbookImageUrl: 'https://awc-images.s3-ap-southeast-2.amazonaws.com/battlebabe-white-transparent.png',
};

// ------------------------------------------------------- Mock Driver playbook --------------------------------------------------- //

export const mockVehicleFrame1: VehicleFrame = {
  id: 'vehicle-frame-id-1',
  frameType: VehicleFrameType.bike,
  massive: 0,
  examples: 'Ducati, trail bike...',
  battleOptionCount: 1,
};

export const mockVehicleFrame2: VehicleFrame = {
  id: 'vehicle-frame-id-2',
  frameType: VehicleFrameType.small,
  massive: 1,
  examples: 'Compact, mini...',
  battleOptionCount: 2,
};

export const mockVehicleFrame3: VehicleFrame = {
  id: 'vehicle-frame-id-3',
  frameType: VehicleFrameType.medium,
  massive: 2,
  examples: 'Sedan, station wagon...',
  battleOptionCount: 2,
};

export const mockVehicleFrame4: VehicleFrame = {
  id: 'vehicle-frame-id-4',
  frameType: VehicleFrameType.large,
  massive: 3,
  examples: 'Bus, semi...',
  battleOptionCount: 2,
};

export const mockBattleOption1: VehicleBattleOption = {
  id: 'mock-battle-option-id-1',
  battleOptionType: BattleOptionType.speed,
  name: '+1speed',
};

export const mockBattleOption2: VehicleBattleOption = {
  id: 'mock-battle-option-id-2',
  battleOptionType: BattleOptionType.handling,
  name: '+1handling',
};

export const mockBattleOption3: VehicleBattleOption = {
  id: 'mock-battle-option-id-3',
  battleOptionType: BattleOptionType.massive,
  name: '+1massive',
};

export const mockBattleOption4: VehicleBattleOption = {
  id: 'mock-battle-option-id-4',
  battleOptionType: BattleOptionType.armor,
  name: '+1armor',
};

export const mockBattleOption5: VehicleBattleOption = {
  id: 'mock-battle-option-id-5',
  battleOptionType: BattleOptionType.weapon,
  name: 'Mounted machine guns (3-harm close/far area messy)',
};

export const mockBattleOption6: VehicleBattleOption = {
  id: 'mock-battle-option-id-6',
  battleOptionType: BattleOptionType.weapon,
  name: 'Mounted grenade launcher (4-harm close area messy)',
};

export const mockCarCreator: CarCreator = {
  id: 'car-creator-id',
  vehicleType: VehicleType.car,
  introInstructions: 'By default, your vehicle...',
  frames: [mockVehicleFrame1, mockVehicleFrame2, mockVehicleFrame3, mockVehicleFrame4],
  strengths: ['fast', 'reliable'],
  looks: ['sleek', 'antique'],
  weaknesses: ['guzzler', 'unreliable'],
  battleOptions: [mockBattleOption1, mockBattleOption2, mockBattleOption3, mockBattleOption4],
};

export const mockBattleVehicleCreator: BattleVehicleCreator = {
  id: 'battle-vehicle-creator-id',
  vehicleType: VehicleType.battle,
  battleVehicleOptions: [
    mockBattleOption1,
    mockBattleOption2,
    mockBattleOption3,
    mockBattleOption4,
    mockBattleOption5,
    mockBattleOption6,
  ],
};

export const mockBikeCreator: BikeCreator = {
  id: 'car-creator-id',
  vehicleType: VehicleType.bike,
  introInstructions: 'By default, your vehicle...',
  frame: mockVehicleFrame1,
  strengths: ['fast', 'reliable'],
  looks: ['sleek', 'antique'],
  weaknesses: ['guzzler'],
  battleOptions: [mockBattleOption1, mockBattleOption2],
};

export const mockVehicleCreator: VehicleCreator = {
  id: 'mock-vehicle=creator-id',
  carCreator: mockCarCreator,
  bikeCreator: mockBikeCreator,
  battleVehicleCreator: mockBattleVehicleCreator,
};

export const mockFirearmBaseOption: TaggedItem = {
  id: 'mock-firearm-base-option-id',
  description: 'handgun',
  tags: ['2-harm', 'close', 'reload', 'loud'],
};

// ------------------------------------------------------- Mock PlaybookCreators --------------------------------------------------- //

export const mockUniqueCreatorDefault: PlaybookUniqueCreator = {
  id: 'default-playbook-unique-creator-id',
  type: UniqueTypes.brainerGear,
  angelKitCreator: dummyAngelKitCreator,
  brainerGearCreator: dummyBrainerGearCreator,
  customWeaponsCreator: dummyCustomWeaponsCreator,
  establishmentCreator: dummyEstablishmentCreator,
  followersCreator: dummyFollowerCreator,
  gangCreator: dummyGangCreator,
  holdingCreator: dummyHoldingCreator,
  skinnerGearCreator: dummySkinnerGearCreator,
  weaponsCreator: dummyWeaponsCreator,
  workspaceCreator: dummyWorkspaceCreator,
  __typename: 'PlaybookUniqueCreator',
};

export const mockPlaybookCreatorDefault: PlaybookCreator = {
  id: 'default-playbook-creator-id',
  playbookType: PlaybookType.angel,
  gearInstructions: mockgearInstructionsAngel,
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
  statsOptions: [mockStatsOptionsAngel1, mockStatsOptionsAngel2, mockStatsOptionsAngel3],
  playbookUniqueCreator: mockUniqueCreatorAngel,
  optionalMoves: [mockCharacterMoveAngel2, mockCharacterMoveAngel3, mockCharacterMoveAngel4],
  defaultMoves: [mockCharacterMoveAngel1],
  defaultMoveCount: 1,
  moveChoiceCount: 2,
  defaultVehicleCount: 0,
  __typename: 'PlaybookCreator',
};

export const mockFirearmOption: ItemCharacteristic = {
  id: 'mock-firearm-option-id',
  description: 'antique',
  tag: '+valuable',
};

export const mockFirearmOption2: ItemCharacteristic = {
  id: 'mock-firearm-option-id-2',
  description: 'semiautomatic',
  tag: '-reload',
};

export const mockHandBaseOption: TaggedItem = {
  id: 'mock-hand-base-option-id',
  description: 'staff',
  tags: ['1-harm', 'hand', 'area'],
};

export const mockHandOption: ItemCharacteristic = {
  id: 'mock-hand-option-id',
  description: 'ornate',
  tag: '+valuable',
};

export const mockHandOption2: ItemCharacteristic = {
  id: 'mock-hand-option-id-2',
  description: 'head',
  tag: '+1harm',
};

export const mockCustomWeaponsCreator: CustomWeaponsCreator = {
  id: 'mock-custom-weapons-creator-id',
  firearmsTitle: 'CUSTOM FIREARMS',
  firearmsBaseInstructions: 'Base (choose 1):',
  firearmsBaseOptions: [mockFirearmBaseOption],
  firearmsOptionsInstructions: 'Options (choose 2):',
  firearmsOptionsOptions: [mockFirearmOption, mockFirearmOption2],
  handTitle: 'CUSTOM HAND WEAPONS',
  handBaseInstructions: 'Base (choose 1):',
  handBaseOptions: [mockHandBaseOption],
  handOptionsInstructions: 'Options (choose 2, * counts as 2 options):',
  handOptionsOptions: [mockHandOption, mockHandOption2],
};

export const mockPlaybookCreatorDriver: PlaybookCreator = {
  ...mockPlaybookCreatorDefault,
  id: 'driver-playbook-creator-id',
  playbookType: PlaybookType.driver,
  movesInstructions: 'You get all the basic moves. Choose 2 driver moves.',
  hxInstructions: 'Everyone introduces their characters by name, look and outlook...',
  playbookUniqueCreator: undefined,
};

// ##### -------------------------------------------------- Brainer/Brainer Gear ----------------------------------------------##### //

export const mockBrainerGearCreator: BrainerGearCreator = {
  id: 'mock-brainer-gear-creator-id',
  gear: [
    'implant syringe (tag hi-tech)_After you’ve tagged someone,...',
    'brain relay (area close hi-tech)_For purposes of brainer moves...',
  ],
};

export const mockUniqueCreatorBrainer: PlaybookUniqueCreator = {
  ...mockUniqueCreatorDefault,
  id: 'brainer-playbook-unique-creator-id',
  type: UniqueTypes.brainerGear,
  brainerGearCreator: mockBrainerGearCreator,
};

// ##### -------------------------------------------------- Maestro D/Establishment ----------------------------------------------##### //

export const mockSecurityOption1: SecurityOption = {
  id: 'security-option-id-1',
  description: 'a convenient shotgun',
  value: 1,
  __typename: 'SecurityOption',
};

export const mockSecurityOption2: SecurityOption = {
  id: 'security-option-id-2',
  description: 'a bouncer who knows his biz',
  value: 1,
  __typename: 'SecurityOption',
};

export const mockSecurityOption3: SecurityOption = {
  id: 'security-option-id-3',
  description: 'plywood & chickenwire',
  value: 1,
  __typename: 'SecurityOption',
};

export const mockEstablishmentCreator: EstablishmentCreator = {
  id: 'mock-establishment-creator-id',
  mainAttractionCount: 1,
  sideAttractionCount: 2,
  attractions: ['luxury food', 'music', 'fashion', 'lots of food', 'games'],
  atmospheres: ['bustle', 'intimacy', 'smoke', 'shadows', 'slime'],
  atmosphereCount: [3, 4],
  regularsNames: ['Lamprey', 'Ba', 'Camo', 'Toyota', 'Lits'],
  regularsQuestions: ["Who's your worst regular?", "Who's your best regular?"],
  interestedPartyNames: ['Been', 'Rolfball', 'Gams'],
  interestedPartyQuestions: ['Who wants in on it?', 'Who do you owe for it?', 'Who wants it gone?'],
  securityOptions: [mockSecurityOption1, mockSecurityOption2, mockSecurityOption3],
  __typename: 'EstablishmentCreator',
};

export const mockUniqueCreatorMaestroD: PlaybookUniqueCreator = {
  ...mockUniqueCreatorDefault,
  id: 'maestro-d-playbook-unique-creator-id',
  type: UniqueTypes.establishment,
  establishmentCreator: mockEstablishmentCreator,
};

export const mockPlaybookCreatorMaestroD: PlaybookCreator = {
  ...mockPlaybookCreatorDefault,
  id: 'maestro-d-playbook-creator-id',
  playbookType: PlaybookType.maestroD,
  movesInstructions: "You get all the basic moves. Choose 2 maestro d' moves. ",
  hxInstructions: 'Everyone introduces their characters by name, look and outlook...',
  playbookUniqueCreator: mockUniqueCreatorMaestroD,
};

// ##### -------------------------------------------------- Hocus/Followers ----------------------------------------------##### //

export const strengthOption1: FollowersOption = {
  id: 'strength-option-id-1',
  description: 'Your followers are dedicated to you. Surplus: +1barter, and replace want: desertion with want: hungry.',
  newNumberOfFollowers: -1,
  surplusBarterChange: 1,
  fortuneChange: -1,
  surplusChange: '',
  wantChange: ['+hungry', '-desertion'],
  __typename: 'FollowersOption',
};

export const strengthOption2: FollowersOption = {
  id: 'strength-option-id-2',
  description: 'Your followers are rigorous and argumentative. Surplus: +insight.',
  newNumberOfFollowers: -1,
  surplusBarterChange: -2,
  fortuneChange: -1,
  surplusChange: '+insight',
  wantChange: [],
  __typename: 'FollowersOption',
};

export const weaknessOption1: FollowersOption = {
  id: 'weakness-option-id-1',
  description: 'Your followers disdain law, peace, reason and society. Surplus: +violence.',
  newNumberOfFollowers: -1,
  surplusBarterChange: -2,
  fortuneChange: -1,
  surplusChange: '+violence',
  wantChange: [],
  __typename: 'FollowersOption',
};

export const weaknessOption2: FollowersOption = {
  id: 'weakness-option-id-2',
  description: 'You have few followers, 10 or fewer. Surplus: -1barter.',
  newNumberOfFollowers: 10,
  surplusBarterChange: -1,
  fortuneChange: -1,
  wantChange: [],
  surplusChange: '',
  __typename: 'FollowersOption',
};

export const mockFollowersCreator: FollowersCreator = {
  id: 'followers-creator-id',
  instructions: 'By default you have around 20 followers, loyal to you but not fanatical.',
  defaultNumberOfFollowers: 20,
  defaultSurplusBarter: 1,
  defaultFortune: 1,
  strengthCount: 2,
  weaknessCount: 2,
  travelOptions: ['travel with you', 'congregate'],
  characterizationOptions: ['your cult', 'your scene', 'your family', 'your staff'],
  defaultWants: ['desertion'],
  strengthOptions: [strengthOption1, strengthOption2],
  weaknessOptions: [weaknessOption1, weaknessOption2],
  __typename: 'FollowersCreator',
};

export const mockUniqueCreatorHocus: PlaybookUniqueCreator = {
  ...mockUniqueCreatorDefault,
  id: 'hocus-playbook-unique-creator-id',
  type: UniqueTypes.followers,
  followersCreator: mockFollowersCreator,
};

export const mockPlaybookCreatorHocus: PlaybookCreator = {
  ...mockPlaybookCreatorDefault,
  id: 'hocus-playbook-creator-id',
  playbookType: PlaybookType.hocus,
  movesInstructions: 'You get all the basic moves. You get fortunes, and the choose 2 more hocus moves.',
  playbookUniqueCreator: mockUniqueCreatorHocus,
};

// ##### -------------------------------------------------- Chopper/Gang ----------------------------------------------##### //

export const mockGangOption1: GangOption = {
  id: 'mock-gang-option-id-1',
  description: "your gang's well-armed. +1harm",
  modifier: '+1harm',
  tag: '',
  __typename: 'GangOption',
};

export const mockGangOption2: GangOption = {
  id: 'mock-gang-option-id-2',
  description: "your gang's well-disciplined. Drop savage.",
  modifier: '',
  tag: '-savage',
  __typename: 'GangOption',
};

export const mockGangOption3: GangOption = {
  id: 'mock-gang-option-id-3',
  description: 'your gang is in significant debt to someone powerful. Vulnerable: obligation.',
  modifier: '',
  tag: '+vulnerable: obligation',
  __typename: 'GangOption',
};

export const mockGangOption4: GangOption = {
  id: 'mock-gang-option-id-4',
  description: 'your gang consists of 30 or so violent bastards. Medium instead of small.',
  modifier: 'MEDIUM',
  tag: '',
  __typename: 'GangOption',
};

export const mockGangCreator: GangCreator = {
  id: '',
  intro: '',
  defaultSize: GangSize.small,
  defaultHarm: 2,
  defaultArmor: 1,
  strengthChoiceCount: 2,
  weaknessChoiceCount: 1,
  defaultTags: ['+savage'],
  strengths: [mockGangOption1, mockGangOption2],
  weaknesses: [mockGangOption3, mockGangOption4],
  __typename: 'GangCreator',
};

export const mockUniqueCreatorChopper: PlaybookUniqueCreator = {
  ...mockUniqueCreatorDefault,
  id: 'chopper-playbook-unique-creator-id',
  type: UniqueTypes.gang,
  gangCreator: mockGangCreator,
};

export const mockPlaybookCreatorChopper: PlaybookCreator = {
  ...mockPlaybookCreatorDefault,
  id: 'chopper-playbook-creator-id',
  playbookType: PlaybookType.chopper,
  movesInstructions: 'You get all the basic moves. You get both chopper moves. ',
  playbookUniqueCreator: mockUniqueCreatorChopper,
};

// ##### -------------------------------------------------- Hardholder/Holding ----------------------------------------------##### //

export const holdingOption1: HoldingOption = {
  id: 'holding-option-id-1',
  description: 'your population in large, 200-300 souls. Surplus: +1barter, want: +disease',
  surplusChange: 1,
  wantChange: ['+disease'],
  newHoldingSize: HoldingSize.large,
  gigChange: '',
  newGangSize: '' as GangSize,
  gangTagChange: '',
  gangHarmChange: -2,
  newVehicleCount: -1,
  newBattleVehicleCount: -1,
  newArmorBonus: -1,
  __typename: 'HoldingOption',
};

export const holdingOption2: HoldingOption = {
  id: 'holding-option-id-2',
  description: 'for gigs, add a bustling, widely-known market commons. Surplus: +1barter, want: +strangers',
  surplusChange: 1,
  wantChange: ['+strangers'],
  newHoldingSize: '' as HoldingSize,
  gigChange: '+market commons',
  newGangSize: '' as GangSize,
  gangTagChange: '',
  gangHarmChange: -2,
  newVehicleCount: -1,
  newBattleVehicleCount: -1,
  newArmorBonus: -1,
  __typename: 'HoldingOption',
};

export const holdingOption3: HoldingOption = {
  id: 'holding-option-id-3',
  description: 'your gang is well-disciplined. Drop unruly.',
  surplusChange: -2,
  wantChange: [],
  newHoldingSize: '' as HoldingSize,
  gigChange: '',
  newGangSize: '' as GangSize,
  gangTagChange: '-unruly',
  gangHarmChange: -2,
  newVehicleCount: -1,
  newBattleVehicleCount: -1,
  newArmorBonus: -1,
  __typename: 'HoldingOption',
};

export const holdingOption4: HoldingOption = {
  id: 'holding-option-id-4',
  description: 'your armory is sophisticated and extensive. Your gang gets +1harm.',
  surplusChange: -2,
  wantChange: [],
  newHoldingSize: '' as HoldingSize,
  gigChange: '',
  newGangSize: '' as GangSize,
  gangTagChange: '',
  gangHarmChange: 1,
  newVehicleCount: -1,
  newBattleVehicleCount: -1,
  newArmorBonus: -1,
  __typename: 'HoldingOption',
};

export const holdingOption5: HoldingOption = {
  id: 'holding-option-id-5',
  description: 'your population is decadent and perverse. Surplus: -1barter, want: +savagery.',
  surplusChange: -1,
  wantChange: ['+savagery'],
  newHoldingSize: '' as HoldingSize,
  gigChange: '',
  newGangSize: '' as GangSize,
  gangTagChange: '',
  gangHarmChange: -2,
  newVehicleCount: -1,
  newBattleVehicleCount: -1,
  newArmorBonus: -1,
  __typename: 'HoldingOption',
};

export const holdingOption6: HoldingOption = {
  id: 'holding-option-id-6',
  description: 'your garage is for shit. It has only 4 vehicles, and only 2 of them are suitable for battle.',
  surplusChange: -2,
  wantChange: [],
  newHoldingSize: '' as HoldingSize,
  gigChange: '',
  newGangSize: '' as GangSize,
  gangTagChange: '',
  gangHarmChange: -2,
  newVehicleCount: 2,
  newBattleVehicleCount: 2,
  newArmorBonus: -1,
  __typename: 'HoldingOption',
};

export const mockHoldingCreator: HoldingCreator = {
  id: 'holding-creator-id',
  defaultHoldingSize: HoldingSize.medium,
  instructions:
    'By default, your holding has:\n\n- 75-150 souls.\n- for gigs, a mix of hunting, crude farming, and scavenging.',
  defaultSurplus: 1,
  defaultWant: 'hungry',
  defaultGigs: ['hunting', 'crude farming', 'scavenging'],
  defaultArmorBonus: 1,
  defaultVehiclesCount: 4,
  defaultBattleVehicleCount: 4,
  defaultGangSize: GangSize.medium,
  defaultGangHarm: 2,
  defaultGangArmor: 1,
  defaultGangTag: 'unruly',
  strengthCount: 4,
  weaknessCount: 2,
  strengthOptions: [holdingOption1, holdingOption2, holdingOption3, holdingOption4],
  weaknessOptions: [holdingOption5, holdingOption6],
  __typename: 'HoldingCreator',
};

export const mockUniqueCreatorHardHolder: PlaybookUniqueCreator = {
  ...mockUniqueCreatorDefault,
  id: 'chopper-playbook-unique-creator-id',
  type: UniqueTypes.holding,
  holdingCreator: mockHoldingCreator,
};

export const mockPlaybookCreatorHardHolder: PlaybookCreator = {
  ...mockPlaybookCreatorDefault,
  id: 'hardholder-playbook-creator-id',
  playbookType: PlaybookType.hardholder,
  movesInstructions: 'You get all the basic moves. You get both hardholder moves.  ',
  playbookUniqueCreator: mockUniqueCreatorHardHolder,
};

// ##### -------------------------------------------------- Skinner/SkinnerGear ----------------------------------------------##### //

export const mockGraciousWeapon1: SkinnerGearItem = {
  id: 'skinner-gear-item-id-1',
  item: 'sleeve pistol (2-harm close reload loud)',
  note: '',
  __typename: 'SkinnerGearItem',
};

export const mockGraciousWeapon2: SkinnerGearItem = {
  id: 'skinner-gear-item-id-3',
  item: 'ornate dagger (2-harm hand valuable)',
  note: '',
};

export const mockLuxeItem1: SkinnerGearItem = {
  id: 'skinner-gear-item-id-3',
  item: 'antique coins (worn valuable)',
  note: 'Drilled with holes for jewelry',
};

export const mockLuxeItem2: SkinnerGearItem = {
  id: 'skinner-gear-item-id-4',
  item: 'eyeglasses (worn valuable)',
  note:
    'You may use these for +1sharp when your eyesight matters, but if you do, without them you get -1sharp when your eyesight matters.',
};

export const mockSkinnerGearCreator: SkinnerGearCreator = {
  id: 'skinner-gear-creator-id',
  graciousWeaponCount: 1,
  luxeGearCount: 2,
  graciousWeaponChoices: [mockGraciousWeapon1, mockGraciousWeapon2],
  luxeGearChoices: [mockLuxeItem1, mockLuxeItem2],
  __typename: 'SkinnerGearCreator',
};

export const mockUniqueCreatorSkinner: PlaybookUniqueCreator = {
  ...mockUniqueCreatorDefault,
  id: 'skinner-playbook-unique-creator-id',
  type: UniqueTypes.skinnerGear,
  skinnerGearCreator: mockSkinnerGearCreator,
};

export const mockPlaybookCreatorSkinner: PlaybookCreator = {
  ...mockPlaybookCreatorDefault,
  id: 'skinner-playbook-creator-id',
  playbookType: PlaybookType.skinner,
  movesInstructions: 'You get all the basic moves. Choose 2 skinner moves.  ',
  playbookUniqueCreator: mockUniqueCreatorSkinner,
};

// ##### -------------------------------------------------- Gunlugger/Weapons ----------------------------------------------##### //

export const mockWeaponsCreator: WeaponsCreator = {
  id: 'weapon-creator-id',
  bfoGunOptionCount: 1,
  seriousGunOptionCount: 2,
  backupWeaponsOptionCount: 1,
  bigFuckOffGuns: ['silenced sniper rifle (3-harm far hi-tech)', 'mg (3-harm close/far area messy)'],
  seriousGuns: ['hunting rifle (3-harm far loud)', 'shotgun (3-harm close messy)'],
  backupWeapons: ['9mm (2-harm close loud)', 'big-ass knife (2-harm hand)'],
  __typename: 'WeaponsCreator',
};

export const mockUniqueCreatorGunlugger: PlaybookUniqueCreator = {
  ...mockUniqueCreatorDefault,
  id: 'gunlugger-playbook-unique-creator-id',
  type: UniqueTypes.weapons,
  weaponsCreator: mockWeaponsCreator,
};

export const mockPlaybookCreatorGunlugger: PlaybookCreator = {
  ...mockPlaybookCreatorDefault,
  id: 'gunlugger-playbook-creator-id',
  playbookType: PlaybookType.gunlugger,
  movesInstructions: 'You get all the basic moves. Choose 3 gunlugger moves. ',
  playbookUniqueCreator: mockUniqueCreatorGunlugger,
};

// ##### -------------------------------------------------- Savvyhead/Workspace ----------------------------------------------##### //

export const mockWorkspaceCreator: WorkspaceCreator = {
  id: 'workspace-creator-id',
  itemsCount: 3,
  workspaceInstructions: 'When you go into your workspace and dedicate yourself to making a thing, or ...',
  projectInstructions: "During play, it's your job to have your character start and pursue projects...",
  workspaceItems: ['a garage', 'a darkroom', 'a controlled growing environment', 'skilled labor (Carna, Thuy, Pamming eg)'],
  __typename: 'WorkspaceCreator',
};

export const mockUniqueCreatorSavvyhead: PlaybookUniqueCreator = {
  ...mockUniqueCreatorDefault,
  id: 'savvyhead-playbook-unique-creator-id',
  type: UniqueTypes.workspace,
  workspaceCreator: mockWorkspaceCreator,
};

export const mockPlaybookCreatorSavvyhead: PlaybookCreator = {
  ...mockPlaybookCreatorDefault,
  id: 'savvyhead-playbook-creator-id',
  playbookType: PlaybookType.savvyhead,
  movesInstructions: 'You get all the basic moves. Choose 3 savvyhead moves. ',
  playbookUniqueCreator: mockUniqueCreatorSavvyhead,
};

// ------------------------------------------------------- Mock MC Content --------------------------------------------------- //

const generateContentItem = (identifier: string): ContentItem => ({
  id: `content-item-${identifier}-id`,
  title: `content-item-${identifier}-title`,
  content: `content-item-${identifier}-content`,
  __typename: 'ContentItem',
});

export const mockContentItem1 = generateContentItem('1');
export const mockContentItem2 = generateContentItem('2');
export const mockContentItem3 = generateContentItem('3');
export const mockContentItem4 = generateContentItem('4');

const generateTickerList = (identifier: string): TickerList => ({
  id: `ticker-list-${identifier}-id`,
  title: `ticker-list-${identifier}-title`,
  items: [`ticker-list-${identifier}-item-1`, `ticker-list-${identifier}-item-2`],
  __typename: 'TickerList',
});

export const mockTickerList1 = generateTickerList('1');
export const mockTickerList2 = generateTickerList('2');
export const mockTickerList3 = generateTickerList('3');
export const mockTickerList4 = generateTickerList('4');

export const mockFirstSession: FirstSessionContent = {
  id: 'mock-first-session-id',
  intro: 'mock-first-session-intro',
  duringCharacterCreation: generateContentItem('during-char-creation'),
  duringFirstSession: generateTickerList('during-1st-session'),
  threatMapInstructions: generateContentItem('threat-map-instr'),
  afterFirstSession: generateTickerList('after-1st-session'),
  __typename: 'FirstSessionContent',
};

export const mockMcContent: McContent = {
  id: 'mock-content-item-id',
  firstSessionContent: mockFirstSession,
  decisionMaking: generateContentItem('decision-making'),
  core: [mockTickerList1, mockTickerList2, mockTickerList3, mockTickerList4],
  harm: [mockContentItem1, mockContentItem2],
  selected: [mockContentItem3, mockContentItem4],
  __typename: 'McContent',
};

// ------------------------------------------------------- Mock Playbooks --------------------------------------------------- //

export const mockPlaybooks: Playbook[] = [mockPlaybookAngel, mockPlaybookBattlbabe];

// ---------------------------------------------- Mock user-generated data --------------------------------------------- //

export const mockVehicleInput: VehicleInput = {
  name: 'New Vehicle',
  vehicleType: VehicleType.car,
  vehicleFrame: mockVehicleFrame3,
  speed: 0,
  handling: 1,
  armor: 1,
  massive: 2,
  strengths: ['fast'],
  weaknesses: ['unreliable'],
  looks: ['sleek'],
  battleOptions: [mockBattleOption2, mockBattleOption4],
};

export const mockVehicle2: Vehicle = {
  ...mockVehicleInput,
  id: 'mock-vehicle-id-2',
};

export const blankCharacter: MockCharacter = {
  id: '',
  playbook: PlaybookType.angel,
  hxBlock: [],
  gear: [],
  looks: [],
  harm: mockCharacterHarm,
  vehicleCount: 0,
  battleVehicleCount: 0,
  experience: 0,
  hasCompletedCharacterCreation: false,
  hasPlusOneForward: false,
  holds: [],
  characterMoves: [],
  vehicles: [],
  battleVehicles: [],
  __typename: 'Character',
};

export const mockHold1: Hold = {
  id: 'mock-hold-id-1',
  moveName: 'READ A PERSON',
  moveDescription: 'When you _**read a person**_ in a charged interaction, roll+sharp.',
  rollResult: 10,
};

export const mockHold2: Hold = {
  id: 'mock-hold-id-2',
  moveName: 'READ A PERSON',
  moveDescription: 'When you _**read a person**_ in a charged interaction, roll+sharp.',
  rollResult: 11,
};

export const mockHold3: Hold = {
  id: 'mock-hold-id-3',
  moveName: 'BONEFEEL',
  moveDescription: '_**Bonefeel**_: at the beginning of the session, roll+weird.',
  rollResult: 7,
};

export const mockHolds = [mockHold1, mockHold2, mockHold3];
