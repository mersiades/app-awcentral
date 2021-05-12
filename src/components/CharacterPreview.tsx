import React, { FC } from 'react';
import { Box, Text } from 'grommet';

import HarmClock from './HarmClock';
import { Character, CharacterStat } from '../@types/dataInterfaces';
import { decapitalize } from '../helpers/decapitalize';
import { HeadingWS, RedBox } from '../config/grommetConfig';
import { useFonts } from '../contexts/fontContext';
import StatBox from './StatBox';
import { getCharacterNameString } from '../helpers/getCharacterNameString';

interface CharacterPreviewProps {
  character: Character;
  isMc: boolean;
}

const CharacterPreview: FC<CharacterPreviewProps> = ({ character, isMc }) => {
  const { crustReady } = useFonts();

  const highlightedStats: CharacterStat[] | undefined = character.statsBlock?.stats.filter(
    (stat) => stat.isHighlighted === true
  );

  return (
    <Box pad="12px" gap="12px">
      <Box align="start" justify="start">
        <Box direction="row" align="center" justify="start" gap="12px" fill="horizontal">
          <Box>
            <HarmClock
              harmValue={character.harm.value}
              isStabilized={character.harm.isStabilized}
              diameter={30}
              showNumbers={false}
              margin={10}
            />
          </Box>
          <Box data-testid="character-preview-name">
            <HeadingWS level={3} crustReady={crustReady} style={{ width: '100%' }}>
              {getCharacterNameString(character)}
            </HeadingWS>
          </Box>
        </Box>
        <Box>
          <Text data-testid="character-preview-looks">
            <em>{character.looks.map((look) => look.look).join(', ')}</em>
          </Text>
        </Box>
      </Box>
      {isMc && (
        <Box justify="center" gap="12px">
          <Box direction="row" justify="between" gap="24px">
            <Box align="center" justify="start" flex="grow">
              <HeadingWS level={4} margin={{ bottom: '6px' }}>
                Highlighted stats
              </HeadingWS>
              <Box fill direction="row" gap="12px" justify="center">
                {!!highlightedStats ? (
                  highlightedStats.map((stat) => <StatBox key={stat.id} stat={stat} />)
                ) : (
                  <Text>No stats highlighted</Text>
                )}
              </Box>
            </Box>
            <Box align="center" justify="start" flex="grow">
              <HeadingWS level={4} margin={{ bottom: '6px' }}>
                Barter
              </HeadingWS>
              <RedBox width="50px" align="center">
                <HeadingWS
                  crustReady={crustReady}
                  level="2"
                  margin={{ left: '9px', right: '9px', bottom: '3px', top: '9px' }}
                >
                  {character.barter}
                </HeadingWS>
              </RedBox>
            </Box>
            <Box align="center" justify="start" flex="grow">
              <HeadingWS level={4} margin={{ bottom: '6px' }}>
                Moves
              </HeadingWS>
              <ul style={{ margin: 0, paddingInlineStart: '28px' }}>
                {character.characterMoves.map((move) => (
                  <li key={move.id}>{decapitalize(move.name)}</li>
                ))}
              </ul>
            </Box>
          </Box>

          <Box align="start" justify="start" flex="grow">
            <HeadingWS level={4} margin={{ bottom: '6px' }}>
              Gear
            </HeadingWS>
            <ul style={{ margin: 0, paddingInlineStart: '28px' }}>
              {character.gear.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CharacterPreview;
