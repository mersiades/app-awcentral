import { gql, TypedDocumentNode } from '@apollo/client';
import { EstablishmentInput } from '../@types';
import {
  Character,
  Establishment,
  PlaybookUniques,
} from '../@types/dataInterfaces';
import { UniqueTypes } from '../@types/enums';

export interface SetEstablishmentData {
  setEstablishment: {
    id: string;
    playbookUniques: {
      id: string;
      type: UniqueTypes;
      establishment?: Establishment;
    };
    __typename?: 'Character';
  };
}

export interface SetEstablishmentVars {
  gameRoleId: string;
  characterId: string;
  establishment: EstablishmentInput;
}

export const getSetEstablishmentOR = (
  character: Character,
  establishmentInput: EstablishmentInput
): SetEstablishmentData => {
  let optimisticPlaybookUniques: PlaybookUniques = {
    id: !!character.playbookUniques?.id
      ? character.playbookUniques.id
      : 'temp-id-1',
    type: UniqueTypes.establishment,
    establishment: {
      ...establishmentInput,
      uniqueType: UniqueTypes.establishment,
      id: !establishmentInput.id ? 'temporary-id' : establishmentInput.id,
    },
    __typename: 'PlaybookUniques',
  };
  return {
    setEstablishment: {
      ...character,
      playbookUniques: optimisticPlaybookUniques,
      __typename: 'Character',
    },
  };
};

const SET_ESTABLISHMENT = gql`
  mutation SetEstablishment(
    $gameRoleId: String!
    $characterId: String!
    $establishment: EstablishmentInput!
  ) {
    setEstablishment(
      gameRoleId: $gameRoleId
      characterId: $characterId
      establishment: $establishment
    ) {
      id
      playbookUniques {
        id
        type
        establishment {
          id
          uniqueType
          mainAttraction
          bestRegular
          worstRegular
          wantsInOnIt
          oweForIt
          wantsItGone
          sideAttractions
          atmospheres
          regulars
          interestedParties
          securityOptions {
            id
            description
            value
          }
          castAndCrew {
            id
            name
            description
          }
        }
      }
    }
  }
` as TypedDocumentNode<SetEstablishmentData, SetEstablishmentVars>;

export default SET_ESTABLISHMENT;
