export const KEYCLOAK_REALM = 'awc-realm';
export const KEYCLOAK_CLIENT = 'app-awcentral';
export const EMAIL_REGEX = new RegExp(
  /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
);

// The names of specific moves
export const UNDER_FIRE_NAME = 'DO SOMETHING UNDER FIRE';
export const INFLICT_HARM_NAME = 'INFLICT HARM ON PC';
export const HEAL_HARM_NAME = 'HEAL PC HARM';
export const ANGEL_SPECIAL_NAME = 'ANGEL SPECIAL';
export const CHOPPER_SPECIAL_NAME = 'CHOPPER SPECIAL';
export const GUNLUGGER_SPECIAL_NAME = 'GUNLUGGER SPECIAL';
export const HARDHOLDER_SPECIAL_NAME = 'HARDHOLDER SPECIAL';
export const HOCUS_SPECIAL_NAME = 'HOCUS SPECIAL';
export const MAESTROD_SPECIAL_NAME = "MAESTRO D' SPECIAL";
export const SAVVYHEAD_SPECIAL_NAME = 'SAVVYHEAD SPECIAL';
export const SKINNER_SPECIAL_NAME = 'SKINNER SPECIAL';
export const MAKE_WANT_KNOWN_NAME = 'MAKE WANT KNOWN';
export const HELP_OR_INTERFERE_NAME = 'HELP OR INTERFERE WITH SOMEONE';
export const STABILIZE_AND_HEAL_NAME = 'STABILIZE AND HEAL SOMEONE';
export const SPEED_RECOVERY_NAME = 'SPEED THE RECOVERY OF SOMEONE';
export const REVIVE_SOMEONE_NAME = 'REVIVE SOMEONE';
export const TREAT_NPC_NAME = 'TREAT AN NPC';
export const COLLECTOR_NAME = 'COLLECTOR';
export const OTHER_CAR_TANK_NAME = 'MY OTHER CAR IS A TANK';
export const GO_AGGRO_NAME = 'GO AGGRO ON SOMEONE';
export const SUCKER_SOMEONE_NAME = 'SUCKER SOMEONE';
export const CAT_OR_MOUSE_NAME = 'CAT OR MOUSE';
export const REPUTATION_NAME = 'REPUTATION';
export const BOARD_VEHICLE_NAME = 'BOARD A MOVING VEHICLE';
export const OUTDISTANCE_VEHICLE_NAME = 'OUTDISTANCE ANOTHER VEHICLE';
export const OVERTAKE_VEHICLE_NAME = 'OVERTAKE ANOTHER VEHICLE';
export const DEAL_WITH_TERRAIN_NAME = 'DEAL WITH BAD TERRAIN';
export const LEADERSHIP_NAME = 'LEADERSHIP';
export const WEALTH_NAME = 'WEALTH';
export const FORTUNES_NAME = 'FORTUNES';
export const PACK_ALPHA_NAME = 'PACK ALPHA';
export const LOST_NAME = 'LOST';
export const ARTFUL_NAME = 'ARTFUL & GRACIOUS';
export const HYPNOTIC_NAME = 'HYPNOTIC';
export const JUST_GIVE_MOTIVE_NAME = 'JUST GIVE ME A MOTIVE';
export const SUFFER_V_HARM = 'SUFFER V-HARM';

// IMPROVE_STAT move names
export const SHARP_2_MAX_NAME = 'SHARP MAX 2';
export const COOL_2_MAX_NAME = 'COOL MAX 2';
export const SECOND_COOL_2_MAX_NAME = 'SECOND COOL MAX 2';
export const HARD_2_MAX_NAME = 'HARD MAX 2';
export const SECOND_HARD_2_MAX_NAME = 'SECOND HARD MAX 2';
export const HOT_2_MAX_NAME = 'HOT MAX 2';
export const WEIRD_2_MAX_NAME = 'WEIRD MAX 2';
export const SECOND_WEIRD_2_MAX_NAME = 'SECOND WEIRD MAX 2';
export const SHARP_3_MAX_NAME = 'SHARP MAX 3';
export const COOL_3_MAX_NAME = 'COOL MAX 3';
export const HARD_3_MAX_NAME = 'HARD MAX 3';
export const HOT_3_MAX_NAME = 'HOT MAX 3';
export const WEIRD_3_MAX_NAME = 'WEIRD MAX 3';
export const IMPROVE_STAT_IMPROVEMENT_NAMES = [
  SHARP_2_MAX_NAME,
  COOL_2_MAX_NAME,
  HARD_2_MAX_NAME,
  SECOND_HARD_2_MAX_NAME,
  HOT_2_MAX_NAME,
  WEIRD_2_MAX_NAME,
  SHARP_3_MAX_NAME,
  COOL_3_MAX_NAME,
  HARD_3_MAX_NAME,
  HOT_3_MAX_NAME,
  WEIRD_3_MAX_NAME,
  SECOND_WEIRD_2_MAX_NAME,
  SECOND_COOL_2_MAX_NAME,
];

// ADD_PLAYBOOK_MOVE move names
export const ADD_ANGEL_MOVE_1_NAME = 'ADD ANGEL MOVE 1';
export const ADD_ANGEL_MOVE_2_NAME = 'ADD ANGEL MOVE 2';
export const ADD_BATTLEBABE_MOVE_1_NAME = 'ADD BATTLEBABE MOVE 1';
export const ADD_BATTLEBABE_MOVE_2_NAME = 'ADD BATTLEBABE MOVE 2';
export const ADD_BRAINER_MOVE_1_NAME = 'ADD BRAINER MOVE 1';
export const ADD_BRAINER_MOVE_2_NAME = 'ADD BRAINER MOVE 2';
export const ADD_DRIVER_MOVE_1_NAME = 'ADD DRIVER MOVE 1';
export const ADD_DRIVER_MOVE_2_NAME = 'ADD DRIVER MOVE 2';
export const ADD_GUNLUGGER_MOVE_1_NAME = 'ADD GUNLUGGER MOVE 1';
export const ADD_GUNLUGGER_MOVE_2_NAME = 'ADD GUNLUGGER MOVE 2';
export const ADD_HOCUS_MOVE_1_NAME = 'ADD HOCUS MOVE 1';
export const ADD_HOCUS_MOVE_2_NAME = 'ADD HOCUS MOVE 2';
export const ADD_MAESTROD_MOVE_1_NAME = 'ADD MAESTRO D MOVE 1';
export const ADD_MAESTROD_MOVE_2_NAME = 'ADD MAESTRO D MOVE 2';
export const ADD_SAVVYHEAD_MOVE_1_NAME = 'ADD SAVVYHEAD MOVE 1';
export const ADD_SAVVYHEAD_MOVE_2_NAME = 'ADD SAVVYHEAD MOVE 2';
export const ADD_SKINNER_MOVE_1_NAME = 'ADD SKINNER MOVE 1';
export const ADD_SKINNER_MOVE_2_NAME = 'ADD SKINNER MOVE 2';
export const ADD_PLAYBOOK_MOVE_IMPROVEMENT_NAMES = [
  ADD_ANGEL_MOVE_1_NAME,
  ADD_ANGEL_MOVE_2_NAME,
  ADD_BATTLEBABE_MOVE_1_NAME,
  ADD_BATTLEBABE_MOVE_2_NAME,
  ADD_BRAINER_MOVE_1_NAME,
  ADD_BRAINER_MOVE_2_NAME,
  ADD_DRIVER_MOVE_1_NAME,
  ADD_DRIVER_MOVE_2_NAME,
  ADD_GUNLUGGER_MOVE_1_NAME,
  ADD_GUNLUGGER_MOVE_2_NAME,
  ADD_HOCUS_MOVE_1_NAME,
  ADD_HOCUS_MOVE_2_NAME,
  ADD_MAESTROD_MOVE_1_NAME,
  ADD_MAESTROD_MOVE_2_NAME,
  ADD_SAVVYHEAD_MOVE_1_NAME,
  ADD_SAVVYHEAD_MOVE_2_NAME,
  ADD_SKINNER_MOVE_1_NAME,
  ADD_SKINNER_MOVE_2_NAME,
];

// ADJUST_UNIQUE move names
export const ADJUST_ANGEL_UNIQUE_1_NAME = 'ADJUST ANGEL UNIQUE 1';
export const ADJUST_BRAINER_UNIQUE_1_NAME = 'ADJUST BRAINER UNIQUE 1';
export const ADJUST_CHOPPER_UNIQUE_1_NAME = 'ADJUST CHOPPER UNIQUE 1';
export const ADJUST_CHOPPER_UNIQUE_2_NAME = 'ADJUST CHOPPER UNIQUE 2';
export const ADJUST_HARDHOLDER_UNIQUE_1_NAME = 'ADJUST HARDHOLDER UNIQUE 1';
export const ADJUST_HARDHOLDER_UNIQUE_2_NAME = 'ADJUST HARDHOLDER UNIQUE 2';
export const ADJUST_HARDHOLDER_UNIQUE_3_NAME = 'ADJUST HARDHOLDER UNIQUE 3';
export const ADJUST_HOCUS_UNIQUE_1_NAME = 'ADJUST HOCUS UNIQUE 1';
export const ADJUST_HOCUS_UNIQUE_2_NAME = 'ADJUST HOCUS UNIQUE 2';
export const ADJUST_MAESTROD_UNIQUE_1_NAME = "ADJUST MAESTRO D' UNIQUE 1";
export const ADJUST_MAESTROD_UNIQUE_2_NAME = "ADJUST MAESTRO D' UNIQUE 2";
export const ADJUST_SAVVYHEAD_UNIQUE_1_NAME = 'ADJUST SAVVYHEAD UNIQUE 1';
export const ADJUST_SAVVYHEAD_UNIQUE_2_NAME = 'ADJUST SAVVYHEAD UNIQUE 2';
export const ADJUST_UNIQUE_IMPROVEMENT_NAMES = [
  ADJUST_ANGEL_UNIQUE_1_NAME,
  ADJUST_BRAINER_UNIQUE_1_NAME,
  ADJUST_CHOPPER_UNIQUE_1_NAME,
  ADJUST_CHOPPER_UNIQUE_2_NAME,
  ADJUST_HARDHOLDER_UNIQUE_1_NAME,
  ADJUST_HARDHOLDER_UNIQUE_2_NAME,
  ADJUST_HARDHOLDER_UNIQUE_3_NAME,
  ADJUST_HOCUS_UNIQUE_1_NAME,
  ADJUST_HOCUS_UNIQUE_2_NAME,
  ADJUST_MAESTROD_UNIQUE_1_NAME,
  ADJUST_MAESTROD_UNIQUE_2_NAME,
  ADJUST_SAVVYHEAD_UNIQUE_1_NAME,
  ADJUST_SAVVYHEAD_UNIQUE_2_NAME,
];

// ADD_OTHER_PB_MOVE move names
export const ADD_OTHER_PB_MOVE_1_NAME = 'ADD MOVE FROM OTHER PLAYBOOK 1';
export const ADD_OTHER_PB_MOVE_2_NAME = 'ADD MOVE FROM OTHER PLAYBOOK 2';
export const ADD_OTHER_PB_MOVE_IMPROVEMENT_NAMES = [ADD_OTHER_PB_MOVE_1_NAME, ADD_OTHER_PB_MOVE_2_NAME];

// ADD_UNIQUE move names
export const ADD_GANG_LEADERSHIP_NAME = 'ADD GANG AND LEADERSHIP';
export const ADD_GANG_PACK_ALPHA_NAME = 'ADD GANG AND PACK ALPHA';
export const ADD_HOLDING_NAME = 'ADD HOLDING';
export const ADD_WORKSPACE_NAME = 'ADD WORKSPACE';
export const ADD_FOLLOWERS_NAME = 'ADD FOLLOWERS';
export const ADD_ESTABLISHMENT_NAME = 'ADD ESTABLISHMENT';
export const ADD_UNIQUE_IMPROVEMENT_NAMES = [
  ADD_GANG_LEADERSHIP_NAME,
  ADD_WORKSPACE_NAME,
  ADD_GANG_PACK_ALPHA_NAME,
  ADD_HOLDING_NAME,
  ADD_FOLLOWERS_NAME,
  ADD_ESTABLISHMENT_NAME,
];

export const ADD_VEHICLE_NAME = 'ADD VEHICLE';

// Future improvement move names
export const GENERIC_INCREASE_STAT_NAME = 'GENERIC INCREASE STAT';
export const RETIRE_NAME = 'RETIRE';
export const ADD_SECOND_CHAR_NAME = 'ADD SECOND CHARACTER';
export const CHANGE_PLAYBOOK_NAME = 'CHANGE PLAYBOOK';
export const IMPROVE_BASIC_MOVES_1_NAME = 'IMPROVE BASIC MOVES 1';
export const IMPROVE_BASIC_MOVES_2_NAME = 'IMPROVE BASIC MOVES 2';

// DEATH move names
export const HARD_MINUS_1_NAME = 'HARD MINUS 1';
export const DEATH_WEIRD_MAX_3_NAME = 'DEATH WEIRD MAX 3';
export const DEATH_CHANGE_PLAYBOOK_NAME = 'DEATH CHANGE PLAYBOOK';
export const DIE_NAME = 'DIE';

// Moves that can earn holds
export const READ_PERSON_NAME = 'READ A PERSON';
export const KEEP_EYE_OUT_NAME = 'KEEP AN EYE OUT';
export const DANGEROUS_AND_SEXY_NAME = 'DANGEROUS & SEXY';
export const BRAINSCAN_NAME = 'DEEP BRAIN SCAN';
export const PUPPET_STRINGS_NAME = 'IN BRAIN PUPPET STRINGS';
export const BONEFEEL_NAME = 'BONEFEEL';

// CSS
export const GAME_PAGE_TOP_NAVBAR_HEIGHT = 30;
export const GAME_PAGE_BOTTOM_NAVBAR_HEIGHT = 80;

// Text
export const DEFAULT_VEHICLE_NAME = 'Unnamed vehicle';

export const INCREASED_BY_IMPROVEMENT_TEXT = '(increased by improvement)';
export const INCREASED_BY_IMPROVEMENT_WITH_LIFE_SUPPORT_TEXT = '(increased by improvement, life support already included)';
export const DECREASED_BY_IMPROVEMENT_TEXT = '(decreased by improvement)';

export const LIFE_SUPPORT_TEXT = 'a life support unit';

export const HOLDING_SOULS_SMALL = '50-60 souls';
export const HOLDING_SOULS_MEDIUM = '75-150 souls';
export const HOLDING_SOULS_LARGE = '200-300 souls';

export const JOIN_GAME_TEXT = 'JOIN GAME';
export const RETURN_TO_GAME_TEXT = 'RETURN TO GAME';
export const CREATE_GAME_TEXT = 'CREATE GAME';
export const YOUR_GAMES_TITLE = 'YOUR GAMES';

export const YOUR_INVITATIONS_TITLE = 'YOUR INVITATIONS';

export const NO_INVITATIONS_TEXT = 'No invitations yet';
export const JOIN_TEXT = 'JOIN';
export const NEXT_TEXT = 'NEXT';

export const NEW_GAME_TEXT = 'NEW GAME';
export const WELCOME_JUNGLE_TEXT = 'Welcome to the jungle, baby.';
export const GET_STARTED_TEXT = "Once everyone's ready, punch NEXT to get started.";

export const PLAYBOOK_TITLE = 'Playbook';
export const NAME_TITLE = 'Name';
export const LOOKS_TITLE = 'Looks';
export const STATS_TITLE = 'Stats';
export const GEAR_TITLE = 'Gear';
export const MOVES_TITLE = 'Moves';
export const VEHICLES_TITLE = 'Vehicles';
export const BATTLE_VEHICLES_TITLE = 'Battle Vehicles';

export const CHOOSE_YOUR_PLAYBOOK_TEXT = 'Choose your playbook';
export const NEW_PLAYER_INTRO_TEXT =
  'You should probably wait for your MC and the rest of your crew, tho. No headstarts for nobody in Apocalypse World.';
export const CHANGED_PLAYBOOK_INTRO_TEXT =
  "You've chosen to change your playbook. Do it now, before continuing... you don't wanna throw yourself back out there half-cocked.";

export const CHOOSE_STAT_SET_TEXT = 'Choose a set:';

export const GEAR_FORM_INSTRUCTIONS = 'Select an item to add, edit or delete it, or just type your own.';
export const OPTIONS_TITLE = 'Options';
