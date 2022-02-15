import React, { FC, useState } from 'react';
import { omit } from 'lodash';
import { useMutation, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { Box, FormField, TextInput } from 'grommet';

import Spinner from '../Spinner';
import StatsBox from '../playbookPanel/StatsBox';
import {
  ButtonWS,
  HeadingWS,
  RedBox,
  TextWS,
} from '../../config/grommetConfig';
import PLAYBOOK_CREATOR, {
  PlaybookCreatorData,
  PlaybookCreatorVars,
} from '../../queries/playbookCreator';
import FINISH_CHARACTER_CREATION, {
  FinishCharacterCreationData,
  FinishCharacterCreationVars,
  getFinishCharacterCreationOR,
} from '../../mutations/finishCharacterCreation';
import ADJUST_CHARACTER_HX, {
  AdjustCharacterHxData,
  AdjustCharacterHxVars,
  getAdjustCharacterHxOR,
} from '../../mutations/adjustCharacterHx';
import { HxInput } from '../../@types';
import { Character } from '../../@types/dataInterfaces';
import { useFonts } from '../../contexts/fontContext';
import { useGame } from '../../contexts/gameContext';
import { decapitalize } from '../../helpers/decapitalize';
import { GO_TO_GAME_TEXT, HX_VALIDATION_TEXT } from '../../config/constants';
import { logAmpEvent } from '../../config/amplitudeConfig';

const StyledMarkdown = styled(ReactMarkdown)`
  & p {
    margin-top: 6px;
    margin-bottom: 6px;
    margin-left: 0px;
    margin-right: 0px;
  }
`;

const CharacterHxForm: FC = () => {
  // ----------------------------- Component state ------------------------------ //
  const [errorIds, setErrorIds] = useState<string[]>([]);
  // ----------------------------- Hooks ---------------------------------------- //
  const { game, character, userGameRole, otherPlayerGameRoles } = useGame();
  const { crustReady } = useFonts();

  // ----------------------------- 3rd party hooks ------------------------------- //
  const history = useHistory();

  // ----------------------------- GraphQL -------------------------------------- //
  const { data: pbCreatorData } = useQuery<
    PlaybookCreatorData,
    PlaybookCreatorVars
  >(PLAYBOOK_CREATOR, {
    // @ts-ignore
    variables: { playbookType: character?.playbook },
    skip: !character?.playbook,
  });
  const hxInstructions = pbCreatorData?.playbookCreator.hxInstructions;
  const [adjustCharacterHx, { loading: adjustingHx }] = useMutation<
    AdjustCharacterHxData,
    AdjustCharacterHxVars
  >(ADJUST_CHARACTER_HX);
  const [finishCharacterCreation, { loading: finishingCreation }] = useMutation<
    FinishCharacterCreationData,
    FinishCharacterCreationVars
  >(FINISH_CHARACTER_CREATION);

  // ----------------------------- Component functions ------------------------- //
  let characters: Character[] = [];
  otherPlayerGameRoles?.forEach((gameRole) => {
    if (!!gameRole.characters && gameRole.characters.length === 1) {
      characters = [...characters, gameRole.characters[0]];
    }
  });

  const handleAdjustHx = async (hxInput: HxInput) => {
    if (!!userGameRole && !!character && !character.isDead) {
      try {
        await adjustCharacterHx({
          variables: {
            gameRoleId: userGameRole.id,
            characterId: character.id,
            hxStat: hxInput,
          },
          optimisticResponse: getAdjustCharacterHxOR(
            character,
            hxInput
          ) as AdjustCharacterHxData,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };
  const setUntouchedCharactersToZero = async (
    character: Character
  ): Promise<boolean> => {
    const touchedCharacterIds = character.hxBlock.map(
      (hxStat) => hxStat.characterId
    );
    const untouchedCharacters = characters.filter(
      (c) => !touchedCharacterIds.includes(c.id)
    );

    await Promise.all(
      untouchedCharacters.map(async (char) => {
        const hxInput: HxInput = {
          id: undefined,
          characterId: char.id,
          characterName: char.name as string,
          hxValue: 0,
        };

        await handleAdjustHx(hxInput);
      })
    );
    return true;
  };

  const handleFinishCreation = async () => {
    if (!!userGameRole && !!character && !!game) {
      const hasHandledUntouchedCharacters = await setUntouchedCharactersToZero(
        character
      );
      if (hasHandledUntouchedCharacters) {
        try {
          if (!character.hasCompletedCharacterCreation) {
            await finishCharacterCreation({
              variables: {
                gameRoleId: userGameRole.id,
                characterId: character.id,
              },
              optimisticResponse: getFinishCharacterCreationOR(
                character
              ) as FinishCharacterCreationData,
            });
            logAmpEvent('complete character creation');
          }
          history.push(`/pre-game/${game.id}`);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  const disableGoToGame = (): boolean => {
    if (character) {
      if (character.hxBlock) {
        return character.hxBlock.length === 0;
      } else {
      }

      if (character.statsBlock) {
        return (
          character.statsBlock.stats.filter(
            (stat) => stat.isHighlighted === true
          ).length !== 2
        );
      }
    }

    return true;
  };

  const disabled = disableGoToGame();

  return (
    <Box
      data-testid="character-hx-form"
      fill
      align="center"
      justify="start"
      animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}
    >
      <Box
        width="85vw"
        align="start"
        style={{ maxWidth: '742px' }}
        margin={{ bottom: '24px' }}
      >
        <Box
          direction="row"
          fill="horizontal"
          justify="between"
          align="center"
          wrap={true}
        >
          <HeadingWS
            level={2}
            crustReady={crustReady}
            style={{ maxWidth: 'unset', height: '34px', lineHeight: '44px' }}
          >{`WHAT HISTORY DOES ${
            !!character?.name ? character.name.toUpperCase() : '...'
          } HAVE?`}</HeadingWS>
          <ButtonWS
            primary
            label={
              finishingCreation ? (
                <Spinner fillColor="#FFF" width="138px" height="36px" />
              ) : (
                GO_TO_GAME_TEXT
              )
            }
            style={{ minHeight: '52px' }}
            disabled={disabled}
            onClick={() => !finishingCreation && handleFinishCreation()}
          />
        </Box>
        <Box direction="row" wrap justify="around">
          {characters.map((char) => {
            const looks = char.looks?.map((look) => look.look);
            let hxStat: HxInput;
            const existingHxStat = character?.hxBlock.find(
              (hxStat) => hxStat.characterId === char.id
            );
            if (!!existingHxStat) {
              hxStat = omit(existingHxStat, ['__typename']) as HxInput;
            } else {
              // Create new HxStat
              hxStat = {
                id: undefined,
                characterId: char.id,
                characterName: char.name as string,
                hxValue: 0,
              };
            }
            return (
              !!char.name && (
                <RedBox
                  data-testid={`${char.name}-hx-box`}
                  key={char.id}
                  direction="row"
                  width="350px"
                  margin={{ right: '12px', bottom: '12px' }}
                >
                  <Box
                    pad="12px"
                    fill="vertical"
                    justify="center"
                    width="100px"
                    align="center"
                  >
                    <HeadingWS
                      level={4}
                      style={{ marginTop: '6px', marginBottom: '6px' }}
                    >
                      {char.name}
                    </HeadingWS>
                    <FormField name={char.id}>
                      <TextInput
                        name={char.id}
                        aria-label={`${char.name}-hx-input`}
                        size="xlarge"
                        textAlign="center"
                        type="text"
                        maxLength={2}
                        defaultValue={existingHxStat?.hxValue.toString() || '0'}
                        onChange={(e) => {
                          const match = e.target.value.match(/^-?[0-3]$/gm);
                          if (!!match) {
                            setErrorIds(
                              errorIds.filter((id) => id !== char.id)
                            );
                            match.length === 1 &&
                              !adjustingHx &&
                              handleAdjustHx({
                                ...hxStat,
                                hxValue: parseInt(match[0]),
                              });
                          } else {
                            e.preventDefault();
                            if (!['', '-'].includes(e.target.value)) {
                              setErrorIds([...errorIds, char.id]);
                            } else {
                              setErrorIds(
                                errorIds.filter((id) => id !== char.id)
                              );
                            }
                          }
                        }}
                      />
                    </FormField>
                  </Box>
                  <Box width="250px" pad="12px">
                    <HeadingWS
                      level={4}
                      style={{ marginTop: '6px', marginBottom: '6px' }}
                    >
                      {!!char.playbook && 'the ' + decapitalize(char.playbook)}
                    </HeadingWS>
                    {!!looks && (
                      <TextWS size="small">{looks.join(', ')}</TextWS>
                    )}
                    {errorIds.includes(char.id) && (
                      <TextWS color="accent-3" size="small">
                        {HX_VALIDATION_TEXT}
                      </TextWS>
                    )}
                  </Box>
                </RedBox>
              )
            );
          })}
        </Box>
        <Box pad="6px" style={{ maxWidth: '812px' }}>
          <StyledMarkdown>
            {!!hxInstructions ? hxInstructions : '...'}
          </StyledMarkdown>
        </Box>
        <RedBox pad="12px" alignSelf="center">
          <HeadingWS
            level={4}
            style={{ marginTop: '6px', marginBottom: '6px' }}
          >
            {`${!!character?.name && character.name} the ${
              !!character?.playbook && decapitalize(character.playbook)
            }`}
          </HeadingWS>
          {!!character?.looks && (
            <TextWS size="small">
              {character?.looks.map((look) => look.look).join(', ')}
            </TextWS>
          )}
        </RedBox>

        {!!character?.statsBlock &&
          !character.hasCompletedCharacterCreation && <StatsBox />}
      </Box>
    </Box>
  );
};

export default CharacterHxForm;
