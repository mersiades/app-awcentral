
import { MoveKinds, PlayBooks, Roles, Stats, WebsocketRequests, WebsocketResponses } from './enums';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface DiscordUser {
  discordId?: string;
  username?: string;
  avatarHash?: string;
}

export interface Game {
  id: string;
  name: string;
  textChannelId: string;
  voiceChannelId?: string;
  gameRoles: GameRole[]
}

export interface GameContext {
  game?: Game;
  setGame: (game: Game) => void;
}

export interface Character {
  id: string
  name: string
}

export interface GameRole {
  id: string;
  role: Roles;
  game?: Game;
  characters?: Character[]
}

interface RequestBody {
  type: WebsocketRequests
}

export interface GameRequest extends RequestBody {
  id?: string
  discordId?: string
  name?: string
  textChannelId?: string;
  voiceChannelId?: string;
}

interface ResponseBody {
  type: WebsocketResponses
}

export interface GameResponse extends ResponseBody {
  id?: string
  discordId?: string
  name?: string
  textChannelId?: string;
  voiceChannelId?: string;
}

export interface Move {
  id?: string
  name: string
  description: string
  stat?: Stats
  kind: MoveKinds
  playbook?: PlayBooks
}

export interface User {
  id: string
  discordId: string
  gameRoles: GameRole[]
}

export interface Playbook {
  id: string
  playbookType: PlayBooks
  barterInstructions: string
  intro: string
  introComment: string
  playbookImageUrl: string
}