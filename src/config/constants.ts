export const KEYCLOAK_REALM = 'awc-realm';
export const KEYCLOAK_CLIENT = 'app-awcentral';
export const EMAIL_REGEX = new RegExp(
  /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
);

// The names of specific moves
// Basic moves
export const UNDER_FIRE_NAME = 'DO SOMETHING UNDER FIRE';
export const GO_AGGRO_NAME = 'GO AGGRO ON SOMEONE';
export const SUCKER_SOMEONE_NAME = 'SUCKER SOMEONE';
export const DO_BATTLE_NAME = 'DO BATTLE';
export const SEDUCE_OR_MANIP_NAME = 'SEDUCE OR MANIPULATE SOMEONE';
export const HELP_OR_INTERFERE_NAME = 'HELP OR INTERFERE WITH SOMEONE';
export const READ_A_SITCH_NAME = 'READ A SITCH';
export const READ_PERSON_NAME = 'READ A PERSON'; // Can earn holds
export const OPEN_BRAIN_NAME = 'OPEN YOUR BRAIN';
export const LIFESTYLE_GIGS_NAME = 'LIFESTYLE AND GIGS';
export const SESSION_END_NAME = 'SESSION END';

// Peripheral moves
export const INFLICT_HARM_NAME = 'INFLICT HARM ON PC';
export const HEAL_HARM_NAME = 'HEAL PC HARM';
export const MAKE_WANT_KNOWN_NAME = 'MAKE WANT KNOWN';
export const SUFFER_V_HARM = 'SUFFER V-HARM';

// Battle moves
export const CAT_OR_MOUSE_NAME = 'CAT OR MOUSE';

// Road war moves
export const BOARD_VEHICLE_NAME = 'BOARD A MOVING VEHICLE';
export const OUTDISTANCE_VEHICLE_NAME = 'OUTDISTANCE ANOTHER VEHICLE';
export const OVERTAKE_VEHICLE_NAME = 'OVERTAKE ANOTHER VEHICLE';
export const DEAL_WITH_TERRAIN_NAME = 'DEAL WITH BAD TERRAIN';

// Angel moves
export const ANGEL_SPECIAL_NAME = 'ANGEL SPECIAL';

// Battlebabe moves
export const BATTLEBABE_SPECIAL_NAME = 'BATTLEBABE SPECIAL';

// Brainer moves
export const BRAINER_SPECIAL_NAME = 'BRAINER SPECIAL';
export const BRAIN_RECEPTIVITY_NAME = 'CASUAL BRAIN RECEPTIVITY';

// Chopper moves
export const CHOPPER_SPECIAL_NAME = 'CHOPPER SPECIAL';
export const FUCKING_THIEVES_NAME = 'FUCKING THIEVES';
export const PACK_ALPHA_NAME = 'PACK ALPHA';

// Driver moves
export const DRIVER_SPECIAL_NAME = 'DRIVER SPECIAL';
export const COLLECTOR_NAME = 'COLLECTOR';
export const OTHER_CAR_TANK_NAME = 'MY OTHER CAR IS A TANK';

// Gunlugger moves
export const GUNLUGGER_SPECIAL_NAME = 'GUNLUGGER SPECIAL';

// Hardholder moves
export const HARDHOLDER_SPECIAL_NAME = 'HARDHOLDER SPECIAL';
export const LEADERSHIP_NAME = 'LEADERSHIP';
export const WEALTH_NAME = 'WEALTH';

// Hocus moves
export const HOCUS_SPECIAL_NAME = 'HOCUS SPECIAL';
export const FORTUNES_NAME = 'FORTUNES';

// Maestro D' moves
export const MAESTROD_SPECIAL_NAME = "MAESTRO D' SPECIAL";

// Savvyhead moves
export const SAVVYHEAD_SPECIAL_NAME = 'SAVVYHEAD SPECIAL';
export const THINGS_SPEAK_NAME = 'THINGS SPEAK';

// Skinner moves
export const SKINNER_SPECIAL_NAME = 'SKINNER SPECIAL';
export const ARTFUL_NAME = 'ARTFUL & GRACIOUS';
export const HYPNOTIC_NAME = 'HYPNOTIC';

// Angelkit moves
export const STABILIZE_AND_HEAL_NAME = 'STABILIZE AND HEAL SOMEONE';
export const SPEED_RECOVERY_NAME = 'SPEED THE RECOVERY OF SOMEONE';
export const REVIVE_SOMEONE_NAME = 'REVIVE SOMEONE';
export const TREAT_NPC_NAME = 'TREAT AN NPC';

export const REPUTATION_NAME = 'REPUTATION';
export const COMBAT_DRIVER_NAME = 'COMBAT DRIVER';

export const LOST_NAME = 'LOST';

export const JUST_GIVE_MOTIVE_NAME = 'JUST GIVE ME A MOTIVE';

export const SIXTH_SENSE_NAME = 'SIXTH SENSE';
export const INFIRMARY_NAME = 'INFIRMARY';
export const ICE_COLD_NAME = 'ICE COLD';

export const BATTLE_HARDENED_NAME = 'BATTLE-HARDENED';
export const FUCK_THIS_SHIT_NAME = 'FUCK THIS SHIT';
export const BATTLEFIELD_INSTINCTS_NAME = 'BATTLEFIELD INSTINCTS';
export const FRENZY_NAME = 'FRENZY';
export const CHARISMATIC_NAME = 'CHARISMATIC';
export const WACKNUT_NAME = 'FUCKING WACKNUT';
export const CALL_THIS_HOT_NAME = 'YOU CALL THIS HOT?';

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

export const KEEP_EYE_OUT_NAME = 'KEEP AN EYE OUT';
export const DANGEROUS_AND_SEXY_NAME = 'DANGEROUS & SEXY';
export const BRAINSCAN_NAME = 'DEEP BRAIN SCAN';
export const PUPPET_STRINGS_NAME = 'IN BRAIN PUPPET STRINGS';
export const BONEFEEL_NAME = 'BONEFEEL';

// CSS
export const GAME_PAGE_TOP_NAVBAR_HEIGHT = 30;
export const GAME_PAGE_BOTTOM_NAVBAR_HEIGHT = 80;

// Text
// ----------------------------------------------- BUTTONS --------------------------------------------- //
export const JOIN_TEXT = 'JOIN';
export const NEXT_TEXT = 'NEXT';
export const ADD_TEXT = 'ADD';
export const SET_TEXT = 'SET';
export const REMOVE_TEXT = 'REMOVE';
export const CANCEL_TEXT = 'CANCEL';
export const RESET_TEXT = 'RESET';
export const GO_TO_GAME_TEXT = 'GO TO GAME';
export const JOIN_GAME_TEXT = 'JOIN GAME';
export const RETURN_TO_GAME_TEXT = 'RETURN TO GAME';
export const CREATE_GAME_TEXT = 'CREATE GAME';
export const PASS_TEXT = 'PASS';
export const ADD_VEHICLE_TEXT = 'ADD VEHICLE';
export const START_GAME_TEXT = 'START GAME';
export const YES_TEXT = 'YES';
export const NO_TEXT = 'NO';
export const APPLY_TEXT = 'APPLY';
export const DO_IT_TEXT = 'DO IT';
export const STABILIZE_TEXT = 'STABILIZE';
export const INVITE_PLAYER_TEXT = 'INVITE PLAYER';
export const ADD_ANOTHER_TEXT = 'INVITE ANOTHER';

// ----------------------------------------------- CHARACTER CREATION STEPPER --------------------------------------------- //

export const PLAYBOOK_TITLE = 'Playbook';
export const NAME_TITLE = 'Name';
export const LOOKS_TITLE = 'Looks';
export const STATS_TITLE = 'Stats';
export const GEAR_TITLE = 'Gear';
export const MOVES_TITLE = 'Moves';
export const VEHICLES_TITLE = 'Vehicles';
export const BATTLE_VEHICLES_TITLE = 'Battle Vehicles';
export const HX_TITLE = 'Hx';

export const IMPROVE_DRIVER_FOR_WORKSPACE_TEXT = 'Improve Driver to get workspace';

export const START_PLAY_WITH_VEHICLE_TEXT = 'If you’d like to start play with a vehicle, get with the MC.';

export const START_PLAY_WITH_BATTLE_VEHICLE_TEXT = 'If you’d like to start play with a battle vehicle, get with the MC.';

export const INCREASED_BY_IMPROVEMENT_TEXT = '(increased by improvement)';
export const INCREASED_BY_IMPROVEMENT_WITH_LIFE_SUPPORT_TEXT = '(increased by improvement, life support already included)';
export const DECREASED_BY_IMPROVEMENT_TEXT = '(decreased by improvement)';

export const LIFE_SUPPORT_TEXT = 'a life support unit';

export const HOLDING_SOULS_SMALL = '50-60 souls';
export const HOLDING_SOULS_MEDIUM = '75-150 souls';
export const HOLDING_SOULS_LARGE = '200-300 souls';

export const YOUR_GAMES_TITLE = 'YOUR GAMES';

export const YOUR_INVITATIONS_TITLE = 'YOUR INVITATIONS';

export const NO_INVITATIONS_TEXT = 'No invitations yet';

export const COOL_TEXT = 'COOL';
export const HARD_TEXT = 'HARD';
export const HOT_TEXT = 'HOT';
export const SHARP_TEXT = 'SHARP';
export const WEIRD_TEXT = 'WEIRD';

export const NEW_GAME_TEXT = 'NEW GAME';
export const WELCOME_JUNGLE_TEXT = 'Welcome to the jungle, baby.';
export const GET_STARTED_TEXT = "Once everyone's ready, punch NEXT to get started.";

export const CHOOSE_YOUR_PLAYBOOK_TEXT = 'CHOOSE YOUR PLAYBOOK';
export const NEW_PLAYER_INTRO_TEXT =
  'You should probably wait for your MC and the rest of your crew, tho. No headstarts for nobody in Apocalypse World.';
export const CHANGED_PLAYBOOK_INTRO_TEXT =
  "You've chosen to change your playbook. Do it now, before continuing... you don't wanna throw yourself back out there half-cocked.";

export const CHOOSE_STAT_SET_TEXT = 'Choose a set:';

export const GEAR_FORM_INSTRUCTIONS = 'Select an item to add, edit or delete it, or just type your own.';
export const OPTIONS_TITLE = 'Options';

export const DEFAULT_MOVES_TITLE = 'Default moves';

export const HX_VALIDATION_TEXT = 'Enter digits from -2 to 3';

export const PRE_GAME_INCOMPLETE_TITLE = 'Game not started';
export const PRE_GAME_INCOMPLETE_TEXT_MC = 'Pre-game stage is not complete. Go to pre-game page?';

// ----------------------------------------------- SCRIPT CHANGE --------------------------------------------- //
export const SCRIPT_CHANGE_TITLE = 'Script Change';
export const SCRIPT_CHANGE_FAST_FORWARD_TITLE = 'Fast forward';
export const SCRIPT_CHANGE_PAUSE_TITLE = 'Pause';
export const SCRIPT_CHANGE_FRAME_TITLE = 'Frame by frame';
export const SCRIPT_CHANGE_RESUME_TITLE = 'Resume';
export const SCRIPT_CHANGE_REPLAY_TITLE = 'Instant replay';
export const SCRIPT_CHANGE_REWIND_TITLE = 'Rewind';
export const SCRIPT_CHANGE_FAST_FORWARD_CONTENT =
  'When you fast forward, you fade to black and advance time as needed to avoid content or elements of play, or just to move forward in time.';
export const SCRIPT_CHANGE_PAUSE_CONTENT =
  "Call a pause if you need a break from an intense scene, to take a bio beak, or if you're seeking clarity or a discussion about the game or content.";
export const SCRIPT_CHANGE_FRAME_CONTENT =
  'Call frame-by-frame before scenes with content you want to play through with care. During the scene, players will call occasional pauses to check in, and take the scene slow.';
export const SCRIPT_CHANGE_RESUME_CONTENT =
  'Use resume to return to normal play at any time, as the player who called the original Script Change in effect.';
export const SCRIPT_CHANGE_REPLAY_CONTENT =
  'Call an instant replay right after a scene to share enthusiasm about what happened, or to clarify details of the narrative.';
export const SCRIPT_CHANGE_REWIND_CONTENT =
  'When you rewind, you back up to a specific point in a scene and do the scene over again avoiding whatever issue led to the rewind, and trying in a different way.';

export const SCRIPT_CHANGE_ATTRIBUTION_TEXT_1 = 'Script Change was created by ';
export const SCRIPT_CHANGE_ATTRIBUTION_TEXT_2 = 'Beau Jágr Sheldon ';
export const SCRIPT_CHANGE_ATTRIBUTION_TEXT_3 = 'and you can ';
export const SCRIPT_CHANGE_ATTRIBUTION_TEXT_4 = 'read more about it here';

// ----------------------------------------------- CUSTOM WEAPONS FORM --------------------------------------------- //
export const MIX_AND_MATCH_TEXT = "Mix'n'match. Edit directly if necessary.";

// ----------------------------------------------- PRE_GAME PAGE--------------------------------------------- //

export const MC_INSTRUCTIONS_1 = 'Use this time to build the world you will play in.';
export const MC_INSTRUCTIONS_2 = 'Ask your players lots of questions about their characters and the world.';
export const MC_INSTRUCTIONS_3 = 'While the players are making their characters, here are some things to get out up-front:';
export const CHARACTER_CREATION_TIP_1 = "Your characters don't have to be friends, but they should definitely be allies.";
export const CHARACTER_CREATION_TIP_2 = 'Your characters are unique in Apocalypse World.';
export const CHARACTER_CREATION_TIP_3 = '1-armor can be armor or clothing. 2-armor is armor.';
export const CHARACTER_CREATION_TIP_4 = 'Is ';
export const CHARACTER_CREATION_TIP_5 = 'barter';
export const CHARACTER_CREATION_TIP_6 = ' a medium of exchange? What do you use?';
export const CHARACTER_CREATION_TIP_7 = "I'm not out to get you. I'm here to find out what's going to happen. Same as you!";

export const PRE_GAME_SCRIPT_CHANGE_INSTRUCTIONS =
  'AW Central uses Script Change as a communication tool to help everyone feel safe and comfortable while they play. On AW Central, Script Change can be used via the Script Change icon (seen here), which sits in the bottom-right corner of the _**main game page**_. You can click the Script Change icon on _**this**_ page to get a preview of what Script Change is like.';
export const PRE_GAME_SCRIPT_CHANGE_MC_INSTRUCTIONS =
  'During character creation and world-building (ie, now) is a good time to tell your players about Script Change.';
export const PRE_GAME_SCRIPT_CHANGE_PLAYER_INSTRUCTIONS =
  'Once all the characters are created, your MC will start the game.';

// ----------------------------------------------- VEHICLE FORM --------------------------------------------- //
export const DEFAULT_VEHICLE_NAME = 'Unnamed vehicle';
export const GIVE_VEHICLE_NAME_TEXT = 'Give your vehicle a name';
export const GIVE_VEHICLE_NAME_EXAMPLES_TEXT = '(make/model, nickname, whatever)';
export const STRENGTHS_TEXT = 'Strengths';
export const WEAKNESSES_TEXT = 'Weaknesses';
export const LOOKS_TEXT = 'Looks';
export const BATTLE_OPTIONS_TEXT = 'Battle options';
export const CHOOSE_1_OR_2_TEXT = 'choose 1 or 2';

// ----------------------------------------------- WEAPONS FORM --------------------------------------------- //
export const BIG_GUNS_TEXT = 'Fuck-off big guns';
export const SERIOUS_GUNS_TEXT = 'Serious guns';
export const BACKUP_WEAPONS_TEXT = 'Backup weapons';

// ----------------------------------------------- ANGEL SPECIAL DIALOG --------------------------------------------- //
export const WITH_WHO_QUESTION = 'Who did you have sex with?';

// ----------------------------------------------- HARM BOX --------------------------------------------- //
export const HARM_TITLE = 'Harm';
export const STABILIZED_TEXT = 'Stabilized';
export const LIFE_UNTENABLE_INSTRUCTIONS = 'When life becomes untenable:';

// ----------------------------------------------- DEATH DIALOG --------------------------------------------- //
export const MAKE_CHANGE_TEXT = 'Make this change?';
export const ADD_HARD_MINUS_1_TEXT = 'reduce your HARD stat by 1';
export const REMOVE_HARD_MINUS_1_TEXT = 'increase your HARD stat by 1';
export const ADD_WEIRD_1_TEXT = 'increase your WEIRD stat by 1';
export const REMOVE_WEIRD_1_TEXT = 'reduce to your WEIRD stat by 1';
export const ADD_CHANGE_PLAYBOOK_TEXT_1 = 'change your playbook. You will lose your';
export const ADD_CHANGE_PLAYBOOK_TEXT_2 =
  "your default moves and your gear. You'll also lose your base stats, but you'll keep any stat bonus you might have. And you'll keep everything else, and will be able to add everything from a new playbook";
export const REMOVE_CHANGE_PLAYBOOK_TEXT = "have no effect. You can't un-change a playbook";
export const ADD_DIE_TEXT_1 = 'mark';
export const ADD_DIE_TEXT_2 = 'as dead';
export const REMOVE_DIE_TEXT_1 = 'bring';
export const REMOVE_DIE_TEXT_2 = 'back to life!';

// ----------------------------------------------- HX BOX --------------------------------------------- //
export const HX_RESET_TEXT = 'Hx reset, experience added';

// ----------------------------------------------- BARTER BOX --------------------------------------------- //
export const BARTER_TEXT = 'Barter';

// ----------------------------------------------- ANGEL KIT BOX --------------------------------------------- //
export const ANGEL_KIT_TEXT = 'Angel kit';
export const STOCK_TEXT = 'Stock';
export const SUPPLIER_TEXT = 'Supplier';

// ----------------------------------------------- STABILIZE DIALOG --------------------------------------------- //
export const HOW_MUCH_STOCK_TEXT = 'How much stock do you use?';
export const CURRENT_STOCK_1_TEXT = 'You currently have';
export const CURRENT_STOCK_2_TEXT = 'stock';

// ----------------------------------------------- GAME PANEL --------------------------------------------- //
export const PLAYERS_TEXT = 'Players';
export const INVITATIONS_TEXT = 'Invitations';
export const DELETE_PLAYER_WARNING_TEXT = 'This cannot be undone. Their character will be deleted.';
export const NO_PLAYER_TEXT = 'No players yet';
export const WARNING_DIALOG_TITLE = 'Remove player?';
export const NO_PENDING_INVITATIONS_TEXT = 'No pending invitations';
export const ALSO_PLAY_AT_TEXT = 'Also play at';
export const ALSO_PLAY_ON_TEXT = 'Also play on';

// ----------------------------------------------- MC PANEL --------------------------------------------- //
export const CORE_BOX_TITLE = 'The master of ceremonies';
export const HARM_RULES_TITLE = 'Harm rules';
export const SELECTED_MC_RULES_TEXT = 'Selected MC rules';
export const FIRST_SESSION_TEXT = 'First session';

// ----------------------------------------------- THREATS PANEL --------------------------------------------- //
export const THREATS_TEXT = 'Threats';

// ----------------------------------------------- NPCS PANEL --------------------------------------------- //
export const NPCS_TEXT = 'NPCs';
export const ADD_NPC_TEXT = 'Add NPC';
export const EDIT_TEXT = 'Edit';

// ----------------------------------------------- CHARACTER PREVIEW --------------------------------------------- //
export const HIGHLIGHTED_STATS_TEXT = 'Highlighted stats';
export const NO_STATS_HIGHLIGHTED_TEXT = 'No stats highlighted';

// ----------------------------------------------- INVITATION FORM --------------------------------------------- //
export const INVITE_A_PLAYER_TO_TEXT = 'Invite a player to';
export const ADD_EMAIL_ADDRESS_TEXT = "First, add the player's email address to the game";
export const TELL_HOW_JOIN_GAME_TEXT =
  'Let your player know how to join your game. You can edit the instructions below (if you want) and then copy and paste into an email, Discord chat etc.';

// ----------------------------------------------- FOLLOWERS FORM --------------------------------------------- //
export const CHARACTERIZE_THEM_TEXT = 'Characterize them';
export const IF_YOU_TRAVEL_TEXT = 'If you travel, they';

// ----------------------------------------------- ESTABLISHMENT FORM --------------------------------------------- //
export const ATTRACTIONS_INSTRUCTIONS =
  'Your establishment features one main attraction supported by 2 side attractions (like a bar features drinks, supported by music and easy food). Choose one to be your main act and 2 for lube:';

export const CAST_CREW_INSTRUCTIONS =
  "Your cast & crew can consist entirely of the other players' characters, with their agreement, or entirely of NPCs, or any mix. If it includes any NPCs, sketch them out - names and the 1-line descriptions - with the MC. Make sure they suit your establishment's scene.";

export const REGULARS_INSTRUCTIONS =
  '_**Your regulars**_ include these 5 NPCs (at least): Lamprey, Ba, Camo, Toyota and Lits.';

export const ATMOSPHERE_INSTRUCTIONS = "_**For your establishment's atmosphere**_, choose 3 or 4:";

export const INTERESTED_NPCS_INSTRUCTIONS =
  'These 3 NPCs (at least) have an _**interest in your establishment**_: Been, Rolfball, Gams.';

export const RESOLVED_INTEREST_TEXT = 'Interest resolved';

export const SELECT_SIDE_ATTRACTIONS = 'Select side attractions';

// ----------------------------------------------- WORKSPACE FORM --------------------------------------------- //
export const ITEMS_INSTRUCTIONS = 'Choose which of the following your workspace includes.';
export const PROJECTS_TITLE = 'Projects';

// ----------------------------------------------- SKINNER GEAR FORM --------------------------------------------- //
export const GRACIOUS_WEAPONS = 'Gracious weapons';
export const LUXE_GEAR = 'Luxe gear';
