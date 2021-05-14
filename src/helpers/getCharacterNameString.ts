import { Character } from '../@types/dataInterfaces';
import { decapitalize } from './decapitalize';

export const getCharacterNameString = (character: Character): string => {
  let nameString = `${character.name} the ${decapitalize(character.playbook)}`;

  if (character.isDead) {
    nameString += ' [RIP]';
  }
  return nameString;
};
