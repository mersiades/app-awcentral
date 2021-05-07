import {
  GangSize,
  HoldingSize,
  MessageType,
  PlaybookType,
  RoleType,
  StatType,
  ThreatType,
  UniqueTypes,
  VehicleType,
} from './enums';
import {
  CharacterMove,
  FollowersOption,
  GangOption,
  HoldingOption,
  Look,
  Move,
  SecurityOption,
  SkinnerGearItem,
  VehicleBattleOption,
  VehicleFrame,
} from './staticDataInterfaces';

/**
 * This file contains interfaces that represent data models that are dynamic,
 * in that they are created and modified by user actions. Some of the fields
 * can be filled with static data - data drawn from the Apocalypse World book
 * and inserted into the db when the backend starts
 */

// -------------------------------------------------- User interfaces -------------------------------------------------- //
export interface User {
  id: string;
  userId: string;
  gameRoles: GameRole[];
  __typename?: 'User';
}

// -------------------------------------------------- Game interfaces -------------------------------------------------- //
export interface Game {
  id: string;
  name: string;
  commsApp: string;
  commsUrl: string;
  hasFinishedPreGame: boolean;
  showFirstSession: boolean;
  mc: { displayName: string; id: string; __typename?: 'User' };
  players: { displayName: string; id: string; __typename?: 'User' }[];
  gameRoles: GameRole[];
  invitees: string[];
  gameMessages: GameMessage[];
  __typename?: 'Game';
}

export interface GameRole {
  id: string;
  role: RoleType;
  userId: string;
  characters: Character[];
  npcs: Npc[];
  threats: Threat[];
  gameId: string;
  gameName: string;
  __typename?: 'GameRole';
}
// ------------------------------------------------- Player interfaces ------------------------------------------------- //

export interface Character {
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
  battleVehicles: BattleVehicle[];
  vehicles: Vehicle[];
  hxBlock: HxStat[];
  gear: string[];
  looks: Look[];
  characterMoves: CharacterMove[];
  improvementMoves: CharacterMove[];
  futureImprovementMoves: CharacterMove[];
  holds: Hold[];
  __typename?: 'Character';
}

export interface CharacterHarm {
  id: string;
  value: number;
  isStabilized: boolean;
  hasComeBackHard: boolean;
  hasComeBackWeird: boolean;
  hasChangedPlaybook: boolean;
  hasDied: boolean;
  __typename?: 'CharacterHarm';
}

export interface StatsBlock {
  id: string;
  statsOptionId: string;
  stats: CharacterStat[];
  __typename?: 'StatsBlock';
}

export interface CharacterStat {
  id: string;
  stat: StatType;
  value: number;
  isHighlighted: boolean;
  __typename?: 'CharacterStat';
}

export interface HxStat {
  id: string;
  characterId: string;
  characterName: string;
  hxValue: number;
  __typename?: 'HxStat';
}

export interface Hold {
  id: string;
  moveName: string;
  moveDescription: string;
  rollResult: number;
  __typename?: 'Hold';
}

// ------------------------------------------------- Playbook Unique interfaces ------------------------------------------------- //

export interface PlaybookUniques {
  id: string;
  type: UniqueTypes;
  brainerGear?: BrainerGear;
  angelKit?: AngelKit;
  customWeapons?: CustomWeapons;
  gang?: Gang;
  weapons?: Weapons;
  holding?: Holding;
  followers?: Followers;
  skinnerGear?: SkinnerGear;
  establishment?: Establishment;
  workspace?: Workspace;
  __typename?: 'PlaybookUniques';
}

export interface AngelKit {
  id: string;
  uniqueType: UniqueTypes;
  description: string;
  stock: number;
  angelKitMoves: Move[];
  hasSupplier: boolean;
  supplierText: string;
  __typename?: 'AngelKit';
}

export interface BrainerGear {
  id: string;
  uniqueType: UniqueTypes;
  allowedItemsCount: number;
  brainerGear: string[];
  __typename?: 'BrainerGear';
}

export interface CustomWeapons {
  id: string;
  uniqueType: UniqueTypes;
  weapons: string[];
  __typename?: 'CustomWeapons';
}

export interface CastCrew {
  id: string;
  name: string;
  description: string;
  __typename?: 'CastCrew';
}

export interface Establishment {
  id: string;
  uniqueType: UniqueTypes;
  mainAttraction: string;
  bestRegular: string;
  worstRegular: string;
  wantsInOnIt: string;
  oweForIt: string;
  wantsItGone: string;
  sideAttractions: string[];
  atmospheres: string[];
  regulars: string[];
  interestedParties: string[];
  securityOptions: SecurityOption[];
  castAndCrew: CastCrew[];
  __typename?: 'Establishment';
}

export interface Followers {
  id: string;
  uniqueType: UniqueTypes;
  description: string;
  travelOption: string;
  characterization: string;
  followers: number;
  fortune: number;
  barter: number;
  surplusBarter: number;
  strengthsCount: number;
  weaknessesCount: number;
  surplus: string[];
  wants: string[];
  selectedStrengths: FollowersOption[];
  selectedWeaknesses: FollowersOption[];
  __typename?: 'Followers';
}

export interface Gang {
  id: string;
  uniqueType: UniqueTypes;
  size: GangSize;
  allowedStrengths: number;
  harm: number;
  armor: number;
  strengths: GangOption[];
  weaknesses: GangOption[];
  tags: string[];
  __typename?: 'Gang';
}

export interface Holding {
  id: string;
  uniqueType: UniqueTypes;
  holdingSize: HoldingSize;
  gangSize: GangSize;
  souls: string;
  surplus: number;
  barter: number;
  gangHarm: number;
  gangArmor: number;
  gangDefenseArmorBonus: number;
  wants: string[];
  gigs: string[];
  gangTags: string[];
  strengthsCount: number;
  weaknessesCount: number;
  selectedStrengths: HoldingOption[];
  selectedWeaknesses: HoldingOption[];
  __typename?: 'Holding';
}

export interface SkinnerGear {
  id: string;
  uniqueType: UniqueTypes;
  graciousWeapon: SkinnerGearItem;
  luxeGear: SkinnerGearItem[];
  __typename?: 'SkinnerGear';
}

export interface Weapons {
  id: string;
  uniqueType: UniqueTypes;
  weapons: string[];
  __typename?: 'Weapons';
}

export interface Project {
  id: string;
  name: string;
  notes?: string;
  __typename?: 'Project';
}

export interface Workspace {
  id: string;
  uniqueType: UniqueTypes;
  workspaceInstructions: string;
  projectInstructions: string;
  workspaceItems: string[];
  projects: Project[];
  __typename?: 'Workspace';
}

// --------------------------------------------------- Vehicle interfaces --------------------------------------------------- //

export interface Vehicle {
  id: string;
  vehicleType: VehicleType;
  name: string;
  vehicleFrame: VehicleFrame;
  speed: number;
  handling: number;
  armor: number;
  massive: number;
  strengths: string[];
  weaknesses: string[];
  looks: string[];
  battleOptions: VehicleBattleOption[];
  __typename?: 'Vehicle';
}

export interface BattleVehicle {
  id: string;
  vehicleType: VehicleType;
  name: string;
  vehicleFrame: VehicleFrame;
  speed: number;
  handling: number;
  armor: number;
  massive: number;
  strengths: string[];
  weaknesses: string[];
  looks: string[];
  weapons: string[];
  battleOptions: VehicleBattleOption[];
  battleVehicleOptions: VehicleBattleOption[];
  __typename?: 'BattleVehicle';
}

// --------------------------------------------------- MC interfaces --------------------------------------------------- //

export interface Npc {
  id: string;
  name: string;
  description?: string;
  __typename?: 'Npc';
}

export interface Threat {
  id: string;
  name: string;
  threatKind: ThreatType;
  impulse: string;
  description?: string;
  stakes?: string;
  __typename?: 'Threat';
}

// --------------------------------------------------- Message interfaces --------------------------------------------------- //

export interface GameMessage {
  id: string;
  gameId: string;
  gameRoleId: string;
  messageType: MessageType;
  title: string;
  content: string;
  sentOn: string;
  roll1: number;
  roll2: number;
  rollModifier: number;
  usedPlusOneForward: boolean;
  rollResult: number;
  modifierStatName: StatType;
  additionalModifierValue: number;
  additionalModifierName: string;
  barterSpent: number;
  currentBarter: number;
  harmSuffered: number;
  currentHarm: number;
  stockSpent: number;
  currentStock: number;
  __typename?: 'GameMessage';
}

export type PlaybookUniqueTypes =
  | AngelKit
  | CustomWeapons
  | BrainerGear
  | Gang
  | Weapons
  | Holding
  | Followers
  | Establishment
  | Workspace
  | SkinnerGear;
