import React, { FC, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Box } from 'grommet';

import Spinner from '../Spinner';
import { ButtonWS, HeadingWS } from '../../config/grommetConfig';
import PLAYBOOK_CREATOR, {
  PlaybookCreatorData,
  PlaybookCreatorVars,
} from '../../queries/playbookCreator';
import SET_CHARACTER_STATS, {
  SetCharacterStatsData,
  SetCharacterStatsVars,
} from '../../mutations/setCharacterStats';
import { CharacterCreationSteps, StatType } from '../../@types/enums';
import { StatsOption } from '../../@types/staticDataInterfaces';
import { useFonts } from '../../contexts/fontContext';
import { useGame } from '../../contexts/gameContext';
import { StatsBlock } from '../../@types/dataInterfaces';
import {
  CHOOSE_STAT_SET_TEXT,
  COOL_TEXT,
  HARD_TEXT,
  HOT_TEXT,
  SET_TEXT,
  SHARP_TEXT,
  WEIRD_TEXT,
} from '../../config/constants';
import { logAmpEvent } from '../../config/amplitudeConfig';

const CharacterStatsForm: FC = () => {
  // ----------------------------- Hooks ---------------------------------------- //
  const { game, character, userGameRole } = useGame();
  const { crustReady } = useFonts();

  // ----------------------------- Component state ------------------------------ //
  const existingStatsOptionId = character?.statsBlock?.statsOptionId;
  const [selectedStatsOption, setSelectedStatsOption] = useState<
    StatsOption | undefined
  >();

  // ----------------------------- 3rd party hooks ------------------------------- //
  const navigate = useNavigate();

  // ----------------------------- GraphQL -------------------------------------- //
  const { data: pbCreatorData } = useQuery<
    PlaybookCreatorData,
    PlaybookCreatorVars
  >(PLAYBOOK_CREATOR, {
    // @ts-ignore
    variables: { playbookType: character?.playbook },
    skip: !character?.playbook,
  });

  const statsOptions = pbCreatorData?.playbookCreator.statsOptions;

  const [setCharacterStats, { loading: settingStats }] = useMutation<
    SetCharacterStatsData,
    SetCharacterStatsVars
  >(SET_CHARACTER_STATS);

  // ----------------------------- Component functions ------------------------- //
  const handleSubmitStats = async (statsOption: StatsOption) => {
    if (!!userGameRole && !!character && !character.isDead && !!game) {
      // Optimistic response is not working
      const optimisticStatsBlock: StatsBlock = {
        id: 'temp-id',
        statsOptionId: statsOption.id,
        stats: [
          {
            id: 'temp-id-1',
            stat: StatType.cool,
            value: statsOption.COOL,
            isHighlighted: false,
            __typename: 'CharacterStat',
          },
          {
            id: 'temp-id-1',
            stat: StatType.hard,
            value: statsOption.HARD,
            isHighlighted: false,
            __typename: 'CharacterStat',
          },
          {
            id: 'temp-id-1',
            stat: StatType.hot,
            value: statsOption.HOT,
            isHighlighted: false,
            __typename: 'CharacterStat',
          },
          {
            id: 'temp-id-1',
            stat: StatType.sharp,
            value: statsOption.SHARP,
            isHighlighted: false,
            __typename: 'CharacterStat',
          },
          {
            id: 'temp-id-1',
            stat: StatType.weird,
            value: statsOption.WEIRD,
            isHighlighted: false,
            __typename: 'CharacterStat',
          },
        ],
        __typename: 'StatsBlock',
      };
      try {
        await setCharacterStats({
          variables: {
            gameRoleId: userGameRole.id,
            characterId: character.id,
            statsOptionId: statsOption.id,
          },
          optimisticResponse: {
            __typename: 'Mutation',
            setCharacterStats: {
              ...character,
              statsBlock: optimisticStatsBlock,
              __typename: 'Character',
            },
          },
        });
        !character.hasCompletedCharacterCreation && logAmpEvent('set stats');
        navigate(
          `/character-creation/${game.id}?step=${CharacterCreationSteps.selectGear}`
        );
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      } catch (error) {
        console.error(error);
      }
    }
  };

  // ----------------------------- Effects ---------------------------------------- //
  useEffect(() => {
    if (
      !!statsOptions &&
      !!character &&
      !!character.statsBlock?.statsOptionId
    ) {
      const existingStatsOption: StatsOption | undefined = statsOptions.find(
        (so) => so.id === character.statsBlock?.statsOptionId
      );
      !!existingStatsOption && setSelectedStatsOption(existingStatsOption);
    }
  }, [character, statsOptions]);

  // ----------------------------- Render ---------------------------------------- //
  return (
    <Box
      data-testid="character-stats-form"
      fill
      pad="24px"
      align="center"
      justify="start"
      animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}
    >
      <Box width="85vw" align="start" style={{ maxWidth: '763px' }}>
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
          >{`WHAT ARE ${
            !!character?.name ? character.name.toUpperCase() : '...'
          }'S STRENGTHS AND WEAKNESSES?`}</HeadingWS>
          <ButtonWS
            primary
            data-testid="set-stats-button"
            label={
              settingStats ? (
                <Spinner fillColor="#FFF" width="37px" />
              ) : (
                SET_TEXT
              )
            }
            onClick={() =>
              !!selectedStatsOption &&
              !settingStats &&
              handleSubmitStats(selectedStatsOption)
            }
            disabled={!selectedStatsOption || settingStats}
            style={{ minHeight: '52px' }}
          />
        </Box>
        <HeadingWS level={4} textAlign="start" margin={{ vertical: '6px' }}>
          {CHOOSE_STAT_SET_TEXT}
        </HeadingWS>
        <Box fill="horizontal" margin={{ bottom: '12px' }} gap="6px">
          {!!statsOptions &&
            statsOptions.map((opt, index) => (
              <Box
                data-testid={`stats-option-box-${index}`}
                key={opt.id}
                direction="row"
                justify="around"
                align="center"
                border={
                  opt.id === selectedStatsOption?.id ||
                  opt.id === existingStatsOptionId
                }
                background={{
                  color: 'neutral-1',
                  opacity: opt.id === selectedStatsOption?.id ? 0.5 : 0,
                }}
                hoverIndicator={{ color: 'neutral-1', opacity: 0.4 }}
                onClick={() => setSelectedStatsOption(opt)}
                gap="6px"
                style={{ minHeight: '52px' }}
              >
                <Box direction="row" align="center" gap="12px">
                  <HeadingWS level={4} margin={{ top: '7px', bottom: '6px' }}>
                    {`${COOL_TEXT}:`}
                  </HeadingWS>
                  <HeadingWS
                    crustReady={crustReady}
                    color="brand"
                    level={3}
                    margin={{ vertical: '6px' }}
                  >
                    {opt.COOL}
                  </HeadingWS>
                </Box>
                <Box direction="row" align="center" gap="12px">
                  <HeadingWS level={4} margin={{ top: '7px', bottom: '6px' }}>
                    {`${HARD_TEXT}:`}
                  </HeadingWS>
                  <HeadingWS
                    crustReady={crustReady}
                    color="brand"
                    level={3}
                    margin={{ vertical: '6px' }}
                  >
                    {opt.HARD}
                  </HeadingWS>
                </Box>
                <Box direction="row" align="center" gap="12px">
                  <HeadingWS level={4} margin={{ top: '7px', bottom: '6px' }}>
                    {`${HOT_TEXT}:`}
                  </HeadingWS>
                  <HeadingWS
                    crustReady={crustReady}
                    color="brand"
                    level={3}
                    margin={{ vertical: '6px' }}
                  >
                    {opt.HOT}
                  </HeadingWS>
                </Box>
                <Box direction="row" align="center" gap="12px">
                  <HeadingWS level={4} margin={{ top: '7px', bottom: '6px' }}>
                    {`${SHARP_TEXT}:`}
                  </HeadingWS>
                  <HeadingWS
                    crustReady={crustReady}
                    color="brand"
                    level={3}
                    margin={{ vertical: '6px' }}
                  >
                    {opt.SHARP}
                  </HeadingWS>
                </Box>
                <Box direction="row" align="center" gap="12px">
                  <HeadingWS level={4} margin={{ top: '7px', bottom: '6px' }}>
                    {`${WEIRD_TEXT}:`}
                  </HeadingWS>
                  <HeadingWS
                    crustReady={crustReady}
                    color="brand"
                    level={3}
                    margin={{ vertical: '6px' }}
                  >
                    {opt.WEIRD}
                  </HeadingWS>
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CharacterStatsForm;
