import {
  HxInput,
  ItemCharacteristic,
  Auth0User,
  Auth0UserInfo,
  TaggedItem,
  VehicleInput,
} from '../@types';
import {
  BattleVehicle,
  CharacterHarm,
  Game,
  GameRole,
  Hold,
  HxStat,
  PlaybookUniques,
  StatsBlock,
  Vehicle,
} from '../@types/dataInterfaces';
import {
  BattleOptionType,
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
  CarCreator,
  CharacterMove,
  ContentItem,
  CustomWeaponsCreator,
  FirstSessionContent,
  GearInstructions,
  ImprovementBlock,
  Look,
  McContent,
  Move,
  Name,
  Playbook,
  PlaybookCreator,
  PlaybookUniqueCreator,
  StatsOption,
  TickerList,
  VehicleBattleOption,
  VehicleCreator,
  VehicleFrame,
} from '../@types/staticDataInterfaces';
import { UNDER_FIRE_NAME } from '../config/constants';
import {
  dummyMoveAction,
  dummyHoldConditions,
  dummyPlusOneForwardConditions,
  dummyAngelKitCreator,
  dummyBrainerGearCreator,
  dummyCustomWeaponsCreator,
  dummyEstablishmentCreator,
  dummyFollowerCreator,
  dummyGangCreator,
  dummyHoldingCreator,
  dummySkinnerGearCreator,
  dummyWeaponsCreator,
  dummyWorkspaceCreator,
} from './fixtures/dummyData';
import {
  mockAngelSpecialCM,
  mockSixthSenseCM,
  mockInfirmaryCM,
  mockProfessionalCompassionCM,
} from './fixtures/characterMovesFixtures';
import { mockImprovementBlockAngel } from './fixtures/improvementBlockFixtures';
import {
  mockPlaybookUniqueAngel_withDummyUniques,
  mockPlaybookUniqueBattlebabe_withDummyUniques,
} from './fixtures/playBookUniquesFixtures';
import {
  mockLookBattleBabe1,
  mockLookBattlebabe2,
  mockLookAngel1,
  mockLookAngel3,
  mockLookAngel5,
  mockLookAngel7,
  mockLookAngel9,
  mockLookAngel2,
  mockLookAngel4,
  mockLookAngel6,
  mockLookAngel8,
  mockLookAngel10,
} from './fixtures/lookFixtures';
import { mockNameAngel1, mockNameAngel2 } from './fixtures/nameFixtures';
import { mockStatsBlock1 } from './fixtures/statsBlockFixtures';

// Same as Character, but with no nullable fields
interface MockCharacter {
  id: string;
  name?: string;
  playbook: PlaybookType;
  playbookUniques?: PlaybookUniques;
  hasCompletedCharacterCreation: boolean;
  hasPlusOneForward: boolean;
  // A value of -1 indicates that barter hasn't been initially set yet
  barter?: number;
  statsBlock?: StatsBlock;
  harm: CharacterHarm;
  vehicleCount: number;
  battleVehicleCount: number;
  experience: number;
  allowedImprovements: number;
  allowedPlaybookMoves: number;
  allowedOtherPlaybookMoves: number;
  isDead: boolean;
  mustChangePlaybook: boolean;
  battleVehicles: BattleVehicle[];
  vehicles: Vehicle[];
  hxBlock: HxStat[];
  gear: string[];
  looks: Look[];
  characterMoves: CharacterMove[];
  improvementMoves: CharacterMove[];
  futureImprovementMoves: CharacterMove[];
  deathMoves: CharacterMove[];
  holds: Hold[];
  __typename?: 'Character';
}

export const mockNewGameName = 'My new mock game';

// ---------------------------------------------------- Mock Users ---------------------------------------------------- //

export const mockAuth0UserInfo1: Auth0UserInfo = {
  email: 'mockUser1@email.com',
  email_verified: true,
  family_name: 'mock-family-name-1',
  given_name: 'mock-given-name-1',
  name: 'mock-name-1',
  preferred_username: 'mock-user-1',
  sub: 'mock-auth0-id-1',
};

export const mockAuth0User1: Auth0User = {
  id: 'mock-auth0-id-1',
  username: 'mock-user-1',
  email: 'mockUser1@email.com',
};

export const mockAuth0UserInfo2: Auth0UserInfo = {
  email: 'mockUser2@email.com',
  email_verified: true,
  family_name: 'mock-family-name-2',
  given_name: 'mock-given-name-2',
  name: 'mock-name-2',
  preferred_username: 'mock-user-2',
  sub: 'mock-auth0-id-2',
};

export const mockAuth0User2: Auth0User = {
  id: 'mock-auth0-id-2',
  username: 'mock-user-2',
  email: 'mockUser2@email.com',
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
  allowedImprovements: 0,
  allowedPlaybookMoves: 2,
  allowedOtherPlaybookMoves: 0,
  isDead: false,
  mustChangePlaybook: false,
  harm: mockCharacterHarm,
  statsBlock: mockStatsBlock1,
  hxBlock: [],
  looks: [mockLookBattleBabe1, mockLookBattlebabe2],
  characterMoves: [
    mockAngelSpecialCM,
    { ...mockSixthSenseCM, isSelected: true },
    { ...mockInfirmaryCM, isSelected: true },
  ], // TODO: change to battlebabe moves
  playbookUniques: mockPlaybookUniqueBattlebabe_withDummyUniques,
  vehicles: [],
  battleVehicles: [],
  improvementMoves: [],
  futureImprovementMoves: [],
  deathMoves: [],
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
  allowedImprovements: 0,
  allowedPlaybookMoves: 2,
  allowedOtherPlaybookMoves: 0,
  isDead: false,
  mustChangePlaybook: false,
  hxBlock: [
    {
      id: 'hx-stat-id-1',
      characterId: mockCharacter1.id,
      characterName: mockCharacter1.name as string,
      hxValue: 1,
    },
  ],
  harm: { ...mockCharacterHarm, id: 'mock-character-harm-id-2' },
  looks: [
    mockLookAngel1,
    mockLookAngel3,
    mockLookAngel5,
    mockLookAngel7,
    mockLookAngel9,
  ],
  characterMoves: [
    { ...mockAngelSpecialCM, isSelected: true },
    { ...mockSixthSenseCM, isSelected: true },
    { ...mockInfirmaryCM, isSelected: true },
  ],
  playbookUniques: mockPlaybookUniqueAngel_withDummyUniques,
  vehicleCount: 0,
  battleVehicleCount: 0,
  vehicles: [],
  battleVehicles: [],
  improvementMoves: [],
  futureImprovementMoves: [],
  deathMoves: [],
};

export const mockGame1: Game = {
  id: 'mock-game-id-1',
  name: 'Mock Game 1',
  commsApp: 'Discord',
  commsUrl: 'https://discord.com/urltodiscordchannel',
  hasFinishedPreGame: false,
  showFirstSession: false,
  mc: { displayName: 'mock-user-1', id: 'mock-auth0-id-1' },
  players: [
    {
      displayName: 'mock-user-2',
      email: 'mockUser2@email.com',
      id: 'mock-auth0-id-2',
    },
  ],
  gameRoles: [
    {
      id: 'mock-gameRole-id-1',
      role: RoleType.mc,
      gameId: 'mock-game-id-1',
      gameName: 'Mock Game 1',
      userId: 'mock-auth0-id-1',
      characters: [],
      npcs: [],
      threats: [],
    },
    {
      id: 'mock-gameRole-id-3',
      role: RoleType.player,
      gameId: 'mock-game-id-1',
      gameName: 'Mock Game 1',
      userId: 'mock-auth0-id-2',
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
  mc: { displayName: 'mock-user-2', id: 'mock-auth0-id-2' },
  players: [
    {
      displayName: 'mock-user-1',
      email: 'mockUser1@email.com',
      id: 'mock-auth0-id-1',
    },
  ],
  gameRoles: [
    {
      id: 'mock-gameRole-id-2',
      role: RoleType.player,
      gameId: 'mock-game-id-2',
      gameName: 'Mock Game 2',
      userId: 'mock-auth0-id-1',
      characters: [],
      npcs: [],
      threats: [],
    },
    {
      id: 'mock-gameRole-id-4',
      role: RoleType.mc,
      gameId: 'mock-game-id-2',
      gameName: 'Mock Game 2',
      userId: 'mock-auth0-id-2',
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
  mc: {
    displayName: 'mock-user-1',
    id: 'mock-auth0-id-1',
    __typename: 'User',
  },
  players: [],
  gameRoles: [
    {
      id: 'mock-gameRole-id-5',
      role: RoleType.mc,
      gameId: 'mock-game-id-3',
      gameName: 'Mock Game 3',
      userId: 'mock-auth0-id-1',
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
  mc: { displayName: 'mock-user-2', id: 'mock-auth0-id-2' },
  players: [
    {
      id: 'mock-auth0-id-3',
      email: 'mockUser3@email.com',
      displayName: 'mock-user-3',
    },
  ],
  gameRoles: [
    {
      id: 'mock-gameRole-id-6',
      role: RoleType.mc,
      gameId: 'mock-game-id-4',
      gameName: 'Mock Game 4 - Join Me',
      userId: 'mock-auth0-id-2',
      characters: [],
      npcs: [],
      threats: [],
    },
    {
      id: 'mock-gameRole-id-7',
      gameId: 'mock-game-id-4',
      gameName: 'Mock Game 4 - Join Me',
      role: RoleType.player,
      userId: 'mock-auth0-id-3',
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
  mc: { displayName: 'mock-user-2', id: 'mock-auth0-id-2' },
  players: [
    {
      id: 'mock-auth0-id-3',
      email: 'mockUser3@email.com',
      displayName: 'mock-user-3',
    },
    {
      id: 'mock-auth0-id-1',
      email: 'mockUser1@email.com',
      displayName: 'mock-user-1',
    },
  ],
  gameRoles: [
    {
      __typename: 'GameRole',
      id: 'mock-gameRole-id-6',
      role: RoleType.mc,
      gameId: 'mock-game-id-5',
      gameName: 'Mock Game 5',
      userId: 'mock-auth0-id-2',
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
      userId: 'mock-auth0-id-3',
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
      userId: 'mock-auth0-id-1',
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
  mc: { displayName: 'mock-user-2', id: 'mock-auth0-id-2' },
  players: [
    {
      id: 'mock-auth0-id-3',
      email: 'mockUser3@email.com',
      displayName: 'mock-user-3',
    },
    {
      id: 'mock-auth0-id-1',
      email: 'mockUser1@email.com',
      displayName: 'mock-user-1',
    },
  ],
  gameRoles: [
    {
      id: 'mock-gameRole-id-6',
      role: RoleType.mc,
      gameId: 'mock-game-id-6',
      gameName: 'Mock Game 6',
      userId: 'mock-auth0-id-2',
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
  mc: { displayName: 'mock-user-2', id: 'mock-auth0-id-2' },
  players: [
    {
      id: 'mock-auth0-id-3',
      email: 'mockUser3@email.com',
      displayName: 'mock-user-3',
    },
    {
      id: 'mock-auth0-id-1',
      email: 'mockUser1@email.com',
      displayName: 'mock-user-1',
    },
  ],
  gameRoles: [
    {
      id: 'mock-gameRole-id-6',
      role: RoleType.mc,
      userId: 'mock-auth0-id-2',
      gameId: 'mock-game-id-7',
      gameName: 'Mock Game 7',
      npcs: [],
      threats: [],
      characters: [],
    },
    {
      id: 'mock-gameRole-id-7',
      role: RoleType.player,
      userId: 'mock-auth0-id-3',
      gameId: 'mock-game-id-7',
      gameName: 'Mock Game 7',
      npcs: [],
      threats: [],
      characters: [{ ...mockCharacter1, hasCompletedCharacterCreation: true }],
    },
    {
      id: 'mock-gameRole-id-8',
      role: RoleType.player,
      userId: 'mock-auth0-id-1',
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
  userId: 'mock-auth0-id-1',
  gameId: mockGame1.id,
  gameName: mockGame1.name,
  characters: [],
  npcs: [],
  threats: [],
};

export const mockGameRole2: GameRole = {
  id: 'mock-gameRole-id-2',
  role: RoleType.player,
  userId: 'mock-auth0-id-1',
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
  description:
    'When you _**do something under fire**_, or dig in to endure fire, roll+cool.',
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
  description:
    'When you _**attack someone unsuspecting or helpless**_, ask the MC if you could miss.',
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
  description:
    'When you _**suffer harm**_, roll+harm suffered (after armor, if you’re wearing any).',
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
  description:
    'When you are able to use something for _**augury**_, roll+weird.',
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
  description:
    'When you _**exchange harm**_, both sides simultaneously inflict and suffer harm as established:',
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
  description:
    'To _**seize something by force**_, exchange harm, but first roll+hard.',
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
  description:
    'When you have to _**deal with bad terrain**_, roll+cool, plus your vehicle’s handling.',
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

// ------------------------------------------------------- Default Creators --------------------------------------------------- //

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
  youGetItems: [
    'fashion suitable to your look, including at your option a piece worth 1-armor (you detail)',
  ],
  introduceChoice: 'Small practical weapons',
  numberCanChoose: 1,
  chooseableGear: [
    '.38 revolver (2-harm close reload loud)',
    '9mm (2-harm close loud)',
    'big knife (2-harm hand)',
    'sawed-off (3-harm close reload messy)',
    'stun gun (s-harm hand reload)',
  ],
  withMC:
    'If you’d like to start play with a vehicle or a prosthetic, get with the MC.',
  startingBarter: 2,
  __typename: 'GearInstructions',
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
  hxInstructions:
    'Everyone introduces their characters by name, look and outlook...',
  improvementBlock: mockImprovementBlockAngel,
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
  statsOptions: [
    mockStatsOptionsAngel1,
    mockStatsOptionsAngel2,
    mockStatsOptionsAngel3,
  ],
  playbookUniqueCreator: mockUniqueCreatorAngel,
  optionalMoves: [
    mockSixthSenseCM,
    mockInfirmaryCM,
    mockProfessionalCompassionCM,
  ],
  defaultMoves: [mockAngelSpecialCM],
  defaultMoveCount: 1,
  moveChoiceCount: 2,
  defaultVehicleCount: 0,
  __typename: 'PlaybookCreator',
};

export const mockPlaybookAngel: Playbook = {
  id: 'mock-playbook-angel-id',
  playbookType: PlaybookType.angel,
  barterInstructions:
    'At the beginning of the session, spend 1- or 2-barter for your lifestyle.',
  intro: 'When you’re lying in the dust of Apocalypse World guts aspilled...',
  introComment: 'Angels are medics. If you want everybody to love you...',
  playbookImageUrl:
    'https://awc-images.s3-ap-southeast-2.amazonaws.com/angel-white-transparent.png',
};

// ------------------------------------------------------- Mock Battlebabe playbook --------------------------------------------------- //
export const mockBattlebabeName: Name = {
  id: 'mock-battlebabe-name-id-1',
  name: 'Scarlet',
  __typename: 'Name',
};

export const mockBattlebabeLook: Look = {
  id: 'mock-battlebabe-look-id-2',
  look: 'woman',
  category: LookType.gender,
  playbookType: PlaybookType.battlebabe,
  __typename: 'Look',
};

export const mockFirearmBaseOption: TaggedItem = {
  id: 'mock-firearm-base-option-id',
  description: 'handgun',
  tags: ['2-harm', 'close', 'reload', 'loud'],
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
  __typename: 'CustomWeaponsCreator',
};

export const mockUniqueCreatorBattlebabe: PlaybookUniqueCreator = {
  ...mockUniqueCreatorDefault,
  id: 'battlebabe-playbook-unique-creator-id',
  type: UniqueTypes.customWeapons,
  customWeaponsCreator: mockCustomWeaponsCreator,
};

export const mockgearInstructionsBattlebabe: GearInstructions = {
  id: 'angel-gear-instructions-id',
  gearIntro: 'You get:',
  youGetItems: [
    'fashion suitable to your look, including at your option fashion worth 1-armor or body armor worth 2-armor (you detail)',
  ],
  introduceChoice: '',
  numberCanChoose: 0,
  chooseableGear: [],
  withMC:
    'If you’d like to start play with a vehicle or a prosthetic, get with the MC.',
  startingBarter: 4,
  __typename: 'GearInstructions',
};

export const mockImprovementBlockBattlebabe: ImprovementBlock = {
  id: 'mock-battlebabe-improvement-block-id',
  playbookType: PlaybookType.battlebabe,
  improvementInstructions: 'When you...',
  improvementMoves: [],
  futureImprovementMoves: [],
  __typename: 'ImprovementBlock',
};

export const mockPlaybookCreatorBattlebabe: PlaybookCreator = {
  id: 'battlebabe-playbook-creator-id',
  playbookType: PlaybookType.battlebabe,
  gearInstructions: mockgearInstructionsBattlebabe,
  improvementInstructions: 'Whenever you roll a highlighted stat...',
  movesInstructions: 'You get all the basic moves. Choose 2 battlebabe moves.',
  hxInstructions:
    'Everyone introduces their characters by name, look and outlook...',
  improvementBlock: mockImprovementBlockBattlebabe,
  names: [mockBattlebabeName],
  looks: [mockBattlebabeLook],
  statsOptions: [mockStatsOptionsAngel1, mockStatsOptionsAngel2],
  defaultMoves: [mockAngelSpecialCM],
  optionalMoves: [mockSixthSenseCM, mockInfirmaryCM],
  defaultMoveCount: 1,
  moveChoiceCount: 2,
  playbookUniqueCreator: mockUniqueCreatorBattlebabe,
  defaultVehicleCount: 0,
  __typename: 'PlaybookCreator',
};

export const mockPlaybookBattlbabe: Playbook = {
  id: 'mock-playbook-battlebabe-id',
  playbookType: PlaybookType.battlebabe,
  barterInstructions:
    'At the beginning of the session, spend 1- or 2-barter for your lifestyle.',
  intro:
    'Even in a place as dangerous as Apocalypse World, battlebabes are, well.',
  introComment:
    'Battlebabes are good in battle, of course, but they’re wicked social too.',
  playbookImageUrl:
    'https://awc-images.s3-ap-southeast-2.amazonaws.com/battlebabe-white-transparent.png',
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
  frames: [
    mockVehicleFrame1,
    mockVehicleFrame2,
    mockVehicleFrame3,
    mockVehicleFrame4,
  ],
  strengths: ['fast', 'reliable'],
  looks: ['sleek', 'antique'],
  weaknesses: ['guzzler', 'unreliable'],
  battleOptions: [
    mockBattleOption1,
    mockBattleOption2,
    mockBattleOption3,
    mockBattleOption4,
  ],
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
  items: [
    `ticker-list-${identifier}-item-1`,
    `ticker-list-${identifier}-item-2`,
  ],
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

export const mockPlaybooks: Playbook[] = [
  mockPlaybookAngel,
  mockPlaybookBattlbabe,
];

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
  allowedImprovements: 0,
  allowedPlaybookMoves: 0,
  allowedOtherPlaybookMoves: 0,
  isDead: false,
  mustChangePlaybook: false,
  hasCompletedCharacterCreation: false,
  hasPlusOneForward: false,
  holds: [],
  characterMoves: [],
  vehicles: [],
  battleVehicles: [],
  improvementMoves: [],
  futureImprovementMoves: [],
  deathMoves: [],
  __typename: 'Character',
};

export const mockHold1: Hold = {
  id: 'mock-hold-id-1',
  moveName: 'READ A PERSON',
  moveDescription:
    'When you _**read a person**_ in a charged interaction, roll+sharp.',
  rollResult: 10,
};

export const mockHold2: Hold = {
  id: 'mock-hold-id-2',
  moveName: 'READ A PERSON',
  moveDescription:
    'When you _**read a person**_ in a charged interaction, roll+sharp.',
  rollResult: 11,
};

export const mockHold3: Hold = {
  id: 'mock-hold-id-3',
  moveName: 'BONEFEEL',
  moveDescription:
    '_**Bonefeel**_: at the beginning of the session, roll+weird.',
  rollResult: 7,
};

export const mockHolds = [mockHold1, mockHold2, mockHold3];
