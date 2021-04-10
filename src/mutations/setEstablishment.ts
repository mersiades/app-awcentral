import { gql } from '@apollo/client';
import { EstablishmentInput } from '../@types';
import { Character, Establishment, PlaybookUnique } from '../@types/dataInterfaces';
import { UniqueTypes } from '../@types/enums';

export interface SetEstablishmentData {
  setEstablishment: {
    id: string;
    playbookUnique: {
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
  let optimisticPlaybookUnique: PlaybookUnique = {
    id: !!character.playbookUnique?.id ? character.playbookUnique.id : 'temp-id-1',
    type: UniqueTypes.establishment,
    establishment: { ...establishmentInput, id: !establishmentInput.id ? 'temporary-id' : establishmentInput.id },
    __typename: 'PlaybookUnique',
  };
  return {
    setEstablishment: {
      ...character,
      playbookUnique: optimisticPlaybookUnique,
      __typename: 'Character',
    },
  };
};

const SET_ESTABLISHMENT = gql`
  mutation SetEstablishment($gameRoleId: String!, $characterId: String!, $establishment: EstablishmentInput!) {
    setEstablishment(gameRoleId: $gameRoleId, characterId: $characterId, establishment: $establishment) {
      id
      playbookUnique {
        id
        type
        establishment {
          id
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
`;

export default SET_ESTABLISHMENT;
