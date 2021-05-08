import { gql } from '@apollo/client';
import { FollowersInput } from '../@types';
import { Character, Followers, PlaybookUniques } from '../@types/dataInterfaces';
import { UniqueTypes } from '../@types/enums';

export interface SetFollowersData {
  setFollowers: {
    id: string;
    playbookUniques: {
      id: string;
      type: UniqueTypes;
      followers?: Followers;
    };
    __typename?: 'Character';
  };
  __typename?: 'Mutation';
}

export interface SetFollowersVars {
  gameRoleId: string;
  characterId: string;
  followers: FollowersInput;
}

export const getSetFollowerOR = (character: Character, followersInput: FollowersInput): SetFollowersData => {
  const optimisticPlaybookUniques: PlaybookUniques = {
    id: character.playbookUniques?.id ? character.playbookUniques.id : 'temp-id-1',
    type: UniqueTypes.followers,
    followers: {
      ...followersInput,
      id: followersInput.id ? followersInput.id : 'temp-id-2',
      uniqueType: UniqueTypes.followers,
      selectedStrengths: followersInput.selectedStrengths.map((opt) => ({ ...opt, __typename: 'FollowersOption' })),
      selectedWeaknesses: followersInput.selectedWeaknesses.map((opt) => ({ ...opt, __typename: 'FollowersOption' })),
      __typename: 'Followers',
    },
    __typename: 'PlaybookUniques',
  };

  return {
    setFollowers: {
      ...character,
      playbookUniques: optimisticPlaybookUniques,
      __typename: 'Character',
    },
    __typename: 'Mutation',
  };
};

const SET_FOLLOWERS = gql`
  mutation SetFollowers($gameRoleId: String!, $characterId: String!, $followers: FollowersInput!) {
    setFollowers(gameRoleId: $gameRoleId, characterId: $characterId, followers: $followers) {
      id
      playbookUniques {
        id
        type
        followers {
          id
          uniqueType
          description
          travelOption
          characterization
          followers
          fortune
          barter
          surplusBarter
          surplus
          wants
          strengthsCount
          weaknessesCount
          selectedStrengths {
            id
            description
            newNumberOfFollowers
            surplusBarterChange
            fortuneChange
            surplusChange
            wantChange
          }
          selectedWeaknesses {
            id
            description
            newNumberOfFollowers
            surplusBarterChange
            fortuneChange
            surplusChange
            wantChange
          }
        }
      }
    }
  }
`;

export default SET_FOLLOWERS;
