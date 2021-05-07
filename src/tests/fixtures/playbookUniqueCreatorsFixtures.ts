import { GangSize, HoldingSize, PlaybookType, UniqueTypes } from '../../@types/enums';
import {
  BrainerGearCreator,
  EstablishmentCreator,
  FollowersCreator,
  FollowersOption,
  GangCreator,
  GangOption,
  HoldingCreator,
  HoldingOption,
  PlaybookCreator,
  PlaybookUniqueCreator,
  SecurityOption,
  SkinnerGearCreator,
  SkinnerGearItem,
  WeaponsCreator,
  WorkspaceCreator,
} from '../../@types/staticDataInterfaces';
import {
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
} from './dummyData';
import { mockPlaybookCreatorDefault } from './playbookCreatorFixtures';

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

// ##### -------------------------------------------------- Brainer/Brainer Gear ----------------------------------------------##### //

export const mockBrainerGearCreator: BrainerGearCreator = {
  id: 'mock-brainer-gear-creator-id',
  defaultItemCount: 2,
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

export const mockPlaybookCreatorBrainer: PlaybookCreator = {
  ...mockPlaybookCreatorDefault,
  id: 'brainer-playbook-creator-id',
  playbookType: PlaybookType.brainer,
  movesInstructions: 'You get all the basic moves. Choose 2 driver moves.',
  hxInstructions: 'Everyone introduces their characters by name, look and outlook...',
  playbookUniqueCreator: mockUniqueCreatorBrainer,
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
  defaultStrengthsCount: 2,
  defaultWeaknessesCount: 2,
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
  defaultStrengthsCount: 4,
  defaultWeaknessesCount: 2,
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
