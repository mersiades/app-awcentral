import { gql } from '@apollo/client';
import { NpcInput } from '../@types';
import { GameRole, Npc } from '../@types/dataInterfaces';

export interface AddNpcData {
  addNpc: {
    id: string;
    npcs: Npc[];
    __typename?: 'GameRole';
  };
}

export interface AddNpcVars {
  gameRoleId: string;
  npc: NpcInput;
}

export const getAddNpcOR = (gameRole: GameRole, npc: NpcInput): AddNpcData => {
  let optimisticNpcs: Npc[] = gameRole.npcs.map((npc2) => ({
    ...npc2,
    __typename: 'Npc',
  }));

  if (!!npc.id) {
    optimisticNpcs.forEach((npc1) => {
      if (npc.id === npc1.id) {
        npc1.name = npc.name;
        npc1.description = npc.description;
      }
      return npc1;
    });
  } else {
    optimisticNpcs = [
      ...optimisticNpcs,
      {
        id: 'temp-id',
        name: npc.name,
        description: npc.description,
        __typename: 'Npc',
      },
    ];
  }

  return {
    addNpc: {
      id: gameRole.id,
      npcs: optimisticNpcs,
      __typename: 'GameRole',
    },
  };
};

const ADD_NPC = gql`
  mutation AddNpc($gameRoleId: String!, $npc: NpcInput!) {
    addNpc(gameRoleId: $gameRoleId, npc: $npc) {
      id
      npcs {
        id
        name
        description
      }
    }
  }
`;

export default ADD_NPC;
