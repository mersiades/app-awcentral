import { gql, TypedDocumentNode } from '@apollo/client';
import { Character } from '../@types/dataInterfaces';
import { UniqueTypes } from '../@types/enums';

export interface ResolveEstablishmentInterestData {
  resolveEstablishmentInterest: {
    id: string;
    playbookUniques: {
      id: string;
      type: UniqueTypes;
      establishment: {
        id: string;
        oweForIt: string;
        wantsInOnIt: string;
        wantsItGone: string;
        __typename?: 'Establishment';
      };
    };
    __typename?: 'Character';
  };
}

export interface ResolveEstablishmentInterestVars {
  gameRoleId: string;
  characterId: string;
  oweForIt: string;
  wantsInOnIt: string;
  wantsItGone: string;
}

export const getResolveEstablishmentInterestOR = (
  character: Character,
  oweForIt: string,
  wantsInOnIt: string,
  wantsItGone: string
): ResolveEstablishmentInterestData => {
  let optimisticPlaybookUniques = {
    id: !!character.playbookUniques?.id
      ? character.playbookUniques.id
      : 'temp-id-1',
    establishment: {
      uniqueType: UniqueTypes.establishment,
      id: !character.playbookUniques?.establishment?.id
        ? 'temporary-id'
        : character.playbookUniques.establishment.id,
      oweForIt,
      wantsInOnIt,
      wantsItGone,
    },
    __typename: 'PlaybookUniques',
  };
  return {
    resolveEstablishmentInterest: {
      id: character.id,
      // @ts-ignore
      playbookUniques: optimisticPlaybookUniques,
      __typename: 'Character',
    },
  };
};

const RESOLVE_ESTABLISHMENT_INTEREST = gql`
  mutation ResolveEstablishmentInterest(
    $gameRoleId: String!
    $characterId: String!
    $oweForIt: String!
    $wantsInOnIt: String!
    $wantsItGone: String!
  ) {
    resolveEstablishmentInterest(
      gameRoleId: $gameRoleId
      characterId: $characterId
      oweForIt: $oweForIt
      wantsInOnIt: $wantsInOnIt
      wantsItGone: $wantsItGone
    ) {
      id
      playbookUniques {
        id
        establishment {
          id
          uniqueType
          wantsInOnIt
          oweForIt
          wantsItGone
        }
      }
    }
  }
` as TypedDocumentNode<ResolveEstablishmentInterestData, ResolveEstablishmentInterestVars>;

export default RESOLVE_ESTABLISHMENT_INTEREST;
