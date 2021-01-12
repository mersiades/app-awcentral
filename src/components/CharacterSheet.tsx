import { useQuery } from '@apollo/client';
import { Box, Heading, Text } from 'grommet';
import { CaretDownFill, CaretUpFill, FormDown, FormUp } from 'grommet-icons';
import React, { FC, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Character, CharacterStat } from '../@types/dataInterfaces';
import { CharacterMove, Look } from '../@types/staticDataInterfaces';
import { accentColors, RedBox } from '../config/grommetConfig';
import { decapitalize } from '../helpers/decapitalize';
import PLAYBOOK, { PlaybookData, PlaybookVars } from '../queries/playbook';

interface CharacterSheetHeaderBoxProps {
  playbook: string;
  name: string;
  description?: string;
  looks: Look[];
}

const CharacterSheetHeaderBox: FC<CharacterSheetHeaderBoxProps> = ({ name, playbook, description, looks }) => {
  const [showDescription, setShowDescription] = useState(false);

  const looksLooks = looks.map((look) => look.look);

  let looksString = looksLooks.join(', ');

  return (
    <Box fill="horizontal" align="center" justify="start">
      <Box fill="horizontal" direction="row" justify="between" align="center" pad="12px">
        <Box>
          <Heading level="2" margin={{ bottom: '3px' }}>{`${name + ' '}the ${playbook}`}</Heading>
          <Text>{looksString}</Text>
        </Box>
        {showDescription ? (
          <FormUp onClick={() => setShowDescription(false)} />
        ) : (
          <FormDown onClick={() => setShowDescription(true)} />
        )}
      </Box>
      {showDescription && !!description && (
        <Box fill="horizontal" pad="12px" animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}>
          <ReactMarkdown>{description}</ReactMarkdown>
        </Box>
      )}
    </Box>
  );
};

interface CharacterSheetStatsBoxProps {
  stats: CharacterStat[];
}

const CharacterSheetStatsBox: FC<CharacterSheetStatsBoxProps> = ({ stats }) => {
  const statBoxStyle = (isHighlighted: boolean) => ({
    backgroundColor: isHighlighted ? accentColors[2] : '#000',
    cursor: 'pointer',
  });

  return (
    <Box fill="horizontal" direction="row" align="center" justify="around" pad="12px" gap="12px" wrap>
      {stats.map((stat) => {
        return (
          <RedBox key={stat.id} align="center" width="76px" style={statBoxStyle(stat.isHighlighted)}>
            <Heading level="2" margin={{ left: '6px', right: '6px', bottom: '3px', top: '9px' }}>
              {stat.value}
            </Heading>
            <Heading level="3" margin={{ left: '6px', right: '6px', bottom: '3px', top: '3px' }}>
              {stat.stat}
            </Heading>
          </RedBox>
        );
      })}
    </Box>
  );
};

interface CharacterSheetMovesBoxProps {
  moves: CharacterMove[];
}

const CharacterSheetMovesBox: FC<CharacterSheetMovesBoxProps> = ({ moves }) => {
  const [showMove, setShowMove] = useState<string>('');
  return (
    <Box fill="horizontal" align="center" justify="start">
      {moves.map((move) => {
        return (
          <Box key={move.id} fill="horizontal">
            <Box key={move.id} fill="horizontal" direction="row" justify="between" align="center" pad="12px">
              <Heading level="3" margin={{ top: '3px', bottom: '3px' }}>
                {move.name}
              </Heading>

              {showMove === move.id ? (
                <FormUp onClick={() => setShowMove('')} />
              ) : (
                <FormDown onClick={() => setShowMove(move.id)} />
              )}
            </Box>

            {showMove === move.id && (
              <Box fill="horizontal" pad="12px" animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}>
                <ReactMarkdown>{move.description}</ReactMarkdown>
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

interface CharacterSheetBarterBoxProps {
  barter: number;
  instructions: string;
  settingBarter: boolean;
  handleSetBarter: (amount: number) => void;
}

const CharacterSheetBarterBox: FC<CharacterSheetBarterBoxProps> = ({
  barter,
  instructions,
  handleSetBarter,
  settingBarter,
}) => {
  const [showInstructions, setShowInstructions] = useState(false);
  const increaseBarter = () => {
    handleSetBarter(barter + 1);
  };

  const decreaseBarter = () => {
    handleSetBarter(barter - 1);
  };

  return (
    <Box fill="horizontal" align="center" justify="start">
      <Box fill="horizontal" direction="row" justify="between" align="center" pad="12px">
        <Heading level="3">Barter</Heading>
        <Box direction="row" align="center" gap="12px">
          {showInstructions ? (
            <FormUp onClick={() => setShowInstructions(false)} />
          ) : (
            <FormDown onClick={() => setShowInstructions(true)} />
          )}
          <RedBox width="50px" align="center" margin={{ left: '12px' }}>
            <Heading level="2" margin={{ left: '9px', right: '9px', bottom: '3px', top: '9px' }}>
              {barter}
            </Heading>
          </RedBox>
          <Box align="center" justify="around">
            {settingBarter ? (
              <Box width="48px" height="80px" />
            ) : (
              <Box align="center" justify="around" animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}>
                <CaretUpFill size="large" color="brand" onClick={increaseBarter} style={{ height: '40px' }} />
                <CaretDownFill size="large" color="brand" onClick={decreaseBarter} style={{ height: '40px' }} />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      {showInstructions && (
        <Box fill="horizontal" pad="12px" animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}>
          <ReactMarkdown>{instructions}</ReactMarkdown>
        </Box>
      )}
    </Box>
  );
};

interface CharacterSheetProps {
  character: Character;
  settingBarter: boolean;
  handleSetBarter: (amount: number) => void;
}

const CharacterSheet: FC<CharacterSheetProps> = ({ character, handleSetBarter, settingBarter }) => {
  const { data } = useQuery<PlaybookData, PlaybookVars>(PLAYBOOK, { variables: { playbookType: character.playbook } });
  return (
    <Box direction="row" wrap gap="12px" pad="12px" overflow="auto">
      <CharacterSheetHeaderBox
        name={character.name ? character.name : ''}
        playbook={decapitalize(character.playbook)}
        description={data?.playbook.intro}
        looks={character.looks}
      />
      {character.statsBlock.length > 0 && <CharacterSheetStatsBox stats={character.statsBlock} />}
      {character.characterMoves.length > 0 && <CharacterSheetMovesBox moves={character.characterMoves} />}
      {!!character.barter && data?.playbook.barterInstructions && (
        <CharacterSheetBarterBox
          barter={character.barter}
          instructions={data?.playbook.barterInstructions}
          settingBarter={settingBarter}
          handleSetBarter={handleSetBarter}
        />
      )}
    </Box>
  );
};

export default CharacterSheet;
