import { gql, TypedDocumentNode } from '@apollo/client';
import { HxInput } from '../@types';
import { Character, HxStat } from '../@types/dataInterfaces';

export interface AdjustCharacterHxData {
  adjustCharacterHx: {
    id: string;
    hxBlock: HxStat[];
    __typename?: 'Character';
  };
}

export interface AdjustCharacterHxVars {
  gameRoleId: string;
  characterId: string;
  hxStat: HxInput;
}

export const getAdjustCharacterHxOR = (
  character: Character,
  hxInput: HxInput
): AdjustCharacterHxData => {
  const index = character.hxBlock.findIndex(
    (hxStat) => hxStat.id === hxInput.id
  );
  let optimisticHxBlock = [...character.hxBlock];
  if (index > -1) {
    optimisticHxBlock[index] = { ...hxInput, __typename: 'HxStat' } as HxStat;
  } else {
    optimisticHxBlock = [
      ...optimisticHxBlock,
      { ...hxInput, __typename: 'HxStat' } as HxStat,
    ];
  }
  optimisticHxBlock.forEach((hxStat1) => ({
    ...hxStat1,
    __typename: 'HxStat',
  }));
  return {
    adjustCharacterHx: {
      id: character.id,
      hxBlock: optimisticHxBlock,
      __typename: 'Character',
    },
  };
};

const ADJUST_CHARACTER_HX = gql`
  mutation AdjustCharacterHx(
    $gameRoleId: String!
    $characterId: String!
    $hxStat: HxInput!
  ) {
    adjustCharacterHx(
      gameRoleId: $gameRoleId
      characterId: $characterId
      hxStat: $hxStat
    ) {
      id
      hxBlock {
        id
        characterId
        characterName
        hxValue
      }
    }
  }
` as TypedDocumentNode<AdjustCharacterHxData, AdjustCharacterHxVars>;

export default ADJUST_CHARACTER_HX;
