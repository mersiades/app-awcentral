import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Text } from 'grommet';
import { IconProps, Next, Previous } from 'grommet-icons';

import Spinner from '../Spinner';
import { CustomUL } from '../../config/grommetConfig';
import {
  CharacterCreationSteps,
  PlaybookType,
  UniqueTypes,
} from '../../@types/enums';
import { useGame } from '../../contexts/gameContext';
import { decapitalize } from '../../helpers/decapitalize';
import {
  PLAYBOOK_TITLE,
  NAME_TITLE,
  LOOKS_TITLE,
  STATS_TITLE,
  GEAR_TITLE,
  MOVES_TITLE,
  VEHICLES_TITLE,
  BATTLE_VEHICLES_TITLE,
  HX_TITLE,
  IMPROVE_DRIVER_FOR_WORKSPACE_TEXT,
} from '../../config/constants';

const NextWithHover = styled(
  Next as React.FC<IconProps & JSX.IntrinsicElements['svg']>
)(() => {
  return css`
    &:hover {
      stroke: #fff;
    }
  `;
});

const PreviousWithHover = styled(
  Previous as React.FC<IconProps & JSX.IntrinsicElements['svg']>
)(() => {
  return css`
    &:hover {
      stroke: #fff;
    }
  `;
});

interface UniqueBoxProps {
  uniqueType: UniqueTypes;
  testId: string;
  children: JSX.Element | JSX.Element[];
}

const UniqueBox: FC<UniqueBoxProps> = ({ uniqueType, testId, children }) => {
  return (
    <Box data-testid={testId} margin={{ bottom: '6px' }}>
      <Text color="white" weight="bold" textAlign="center">
        {decapitalize(uniqueType)}
      </Text>
      {children}
    </Box>
  );
};

const CharacterCreationStepper: FC = () => {
  // ----------------------------- Hooks ---------------------------------------- //
  const { character, game } = useGame();

  // ----------------------------- 3rd party hooks ------------------------------- //
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const step = query.get('step');
  const currentStep = !!step ? parseInt(step) : undefined;

  // ----------------------------- Component functions ------------------------- //
  let reversedLooks: string[] = [];
  if (!!character && !!character.looks) {
    reversedLooks = character.looks.map((look) => look.look).reverse();
  }

  const changeStep = (nextStep: number) => {
    !!game && navigate(`/character-creation/${game.id}?step=${nextStep}`);
  };

  const handlePrevious = () => {
    if (!!character?.name && !!character.playbook && !!currentStep) {
      // Skip over playbookUniques page if null (usually for Driver)
      if (
        currentStep === CharacterCreationSteps.selectMoves &&
        !character.playbookUniques
      ) {
        changeStep(currentStep - 2);
      } else {
        changeStep(currentStep - 1);
      }
    }
  };

  const handleNext = () => {
    if (!!character?.name && !!character.playbook && !!currentStep) {
      // Skip over playbookUniques page if null (usually for Driver)
      if (
        currentStep === CharacterCreationSteps.selectGear &&
        !character.playbookUniques
      ) {
        changeStep(currentStep + 2);
      } else {
        changeStep(currentStep + 1);
      }
    }
  };

  // ----------------------------- Render ---------------------------------------- //
  const box0Step1 = (
    <Box
      margin={{ left: 'xsmall', right: 'xsmall' }}
      justify="between"
      width="11em"
      height="10rem"
      gap="small"
    >
      <Box
        data-testid="playbook-box"
        align="center"
        fill="horizontal"
        pad="small"
        height="5rem"
        border
        background={{
          color: 'neutral-1',
          opacity:
            CharacterCreationSteps.selectPlaybook === currentStep ? 1 : 0.5,
        }}
        onClick={(e: any) => {
          e.currentTarget.blur();
          !!character && changeStep(CharacterCreationSteps.selectPlaybook);
        }}
        style={{ cursor: !character ? 'default' : 'pointer' }}
      >
        <Text color="white" weight="bold">
          {PLAYBOOK_TITLE}
        </Text>
        {!!character?.playbook ? (
          <Text>{decapitalize(character?.playbook)}</Text>
        ) : (
          <Text>...</Text>
        )}
      </Box>
      <Box
        data-testid="name-box"
        align="center"
        fill="horizontal"
        pad="small"
        border
        height="5rem"
        background={{
          color: 'neutral-1',
          opacity: CharacterCreationSteps.selectName === currentStep ? 1 : 0.5,
        }}
        onClick={(e: any) => {
          e.currentTarget.blur();
          !!character?.playbook &&
            changeStep(CharacterCreationSteps.selectName);
        }}
        style={{
          cursor: !character || !character.playbook ? 'default' : 'pointer',
        }}
      >
        <Text color="white" weight="bold">
          {NAME_TITLE}
        </Text>
        {!!character?.name ? <Text>{character.name}</Text> : <Text>...</Text>}
      </Box>
    </Box>
  );

  const box1Step3 = (
    <Box
      data-testid="looks-box"
      margin={{ left: 'xsmall', right: 'xsmall' }}
      justify="start"
      width="11rem"
      height="10rem"
      gap="small"
      align="center"
      pad="small"
      border
      background={{
        color: 'neutral-1',
        opacity: CharacterCreationSteps.selectLooks === currentStep ? 1 : 0.5,
      }}
      onClick={(e: any) => {
        e.currentTarget.blur();
        !!character?.name &&
          !!character?.playbook &&
          changeStep(CharacterCreationSteps.selectLooks);
      }}
      style={{
        cursor: !character || !character.playbook ? 'default' : 'pointer',
      }}
    >
      <Text color="white" weight="bold">
        {LOOKS_TITLE}
      </Text>
      {reversedLooks.length > 0 ? (
        <CustomUL>
          {reversedLooks.map((look) => (
            <li
              key={look}
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {look}
            </li>
          ))}
        </CustomUL>
      ) : (
        <Text>...</Text>
      )}
    </Box>
  );

  const box2Step4 = (
    <Box
      data-testid="stats-box"
      margin={{ left: 'xsmall', right: 'xsmall' }}
      justify="start"
      width="11rem"
      height="10rem"
      gap="small"
      align="center"
      pad="small"
      border
      background={{
        color: 'neutral-1',
        opacity: CharacterCreationSteps.selectStats === currentStep ? 1 : 0.5,
      }}
      onClick={(e: any) => {
        e.currentTarget.blur();
        !!character?.name &&
          !!character?.playbook &&
          changeStep(CharacterCreationSteps.selectStats);
      }}
      style={{
        cursor: !character || !character.playbook ? 'default' : 'pointer',
      }}
    >
      <Text color="white" weight="bold">
        {STATS_TITLE}
      </Text>
      {!!character &&
      !!character.playbook &&
      !!character.statsBlock &&
      character.statsBlock.stats.length > 0 ? (
        <>
          {character.statsBlock.stats.map((stat) => (
            <Box
              key={stat.id}
              direction="row"
              fill="horizontal"
              justify="between"
              align="center"
            >
              <Text>{stat.stat}</Text>
              <Text>{`${'--'.repeat(9 - stat.stat.length)}`}</Text>
              <Text>{stat.value}</Text>
            </Box>
          ))}
        </>
      ) : (
        <Text>...</Text>
      )}
    </Box>
  );

  const box3Step5 = (
    <Box
      data-testid="gear-box"
      margin={{ left: 'xsmall', right: 'xsmall' }}
      justify="start"
      width="11rem"
      height="10rem"
      gap="small"
      align="center"
      pad="small"
      border
      background={{
        color: 'neutral-1',
        opacity: CharacterCreationSteps.selectGear === currentStep ? 1 : 0.5,
      }}
      onClick={(e: any) => {
        e.currentTarget.blur();
        !!character?.name &&
          !!character?.playbook &&
          changeStep(CharacterCreationSteps.selectGear);
      }}
      style={{
        cursor: !character || !character.playbook ? 'default' : 'pointer',
      }}
    >
      <Text color="white" weight="bold">
        {GEAR_TITLE}
      </Text>
      {!!character && character.gear?.length > 0 ? (
        <CustomUL>
          {character.gear.map((item, index) => (
            <li
              key={index}
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {item}
            </li>
          ))}
        </CustomUL>
      ) : (
        <Text>...</Text>
      )}
    </Box>
  );

  const renderUnique = () => {
    const splitItem = (item: string) => item.substring(0, item.indexOf(' ('));

    if (!!character?.playbookUniques) {
      const angelKit = character.playbookUniques.angelKit;
      const customWeapons = character.playbookUniques.customWeapons;
      const weaponsBB = customWeapons?.weapons || [];
      const brainerGear = character.playbookUniques.brainerGear;
      const concatGear =
        brainerGear?.brainerGear.map((gear) => gear.split('(')) || [];
      const gang = character.playbookUniques.gang;
      const weapons = character.playbookUniques.weapons;
      const holding = character.playbookUniques.holding;
      const followers = character.playbookUniques.followers;
      const establishment = character.playbookUniques.establishment;
      const workspace = character.playbookUniques.workspace;
      const skinnerGear = character.playbookUniques.skinnerGear;

      return (
        <CustomUL>
          {!!angelKit && (
            <UniqueBox uniqueType={angelKit.uniqueType} testId="angel-kit-box">
              <li key={1}>{`Stock: ${angelKit.stock}`}</li>
              <li key={2}>
                {angelKit.hasSupplier ? 'Has supplier' : 'No supplier yet'}
              </li>
            </UniqueBox>
          )}
          {!!brainerGear && (
            <UniqueBox
              uniqueType={brainerGear.uniqueType}
              testId="brainer-gear-box"
            >
              {concatGear.map((item, index) => (
                <li
                  key={index}
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item[0]}
                </li>
              ))}
            </UniqueBox>
          )}
          {!!customWeapons && (
            <UniqueBox
              uniqueType={customWeapons.uniqueType}
              testId="custom-weapons-box"
            >
              {weaponsBB.map((weapon, index) => (
                <li
                  key={index}
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {weapon}
                </li>
              ))}
            </UniqueBox>
          )}
          {!!gang && (
            <UniqueBox uniqueType={gang.uniqueType} testId="gang-box">
              <li>Size: {gang.size}</li>
              <li>Harm: {gang.harm}</li>
              <li>Armor: {gang.armor}</li>
              <li>Tags: {gang.tags.join(', ')}</li>
            </UniqueBox>
          )}
          {!!weapons && (
            <UniqueBox uniqueType={weapons.uniqueType} testId="weapons-box">
              {weapons.weapons.map((weapon) => {
                const weaponName = weapon.substring(0, weapon.indexOf(' ('));
                return <li key={weapon}>{weaponName}</li>;
              })}
            </UniqueBox>
          )}
          {!!holding && (
            <UniqueBox uniqueType={holding.uniqueType} testId="holding-box">
              <li>Holding size: {decapitalize(holding.holdingSize)}</li>
              <li>Gang size: {decapitalize(holding.gangSize)}</li>
              <li>Barter: {holding.barter}</li>
              <li>Wants: {holding.wants.join(', ')}</li>
            </UniqueBox>
          )}
          {!!followers && (
            <UniqueBox uniqueType={followers.uniqueType} testId="followers-box">
              <li>{followers.description}</li>
            </UniqueBox>
          )}
          {!!establishment && (
            <UniqueBox
              uniqueType={establishment.uniqueType}
              testId="establishment-box"
            >
              <li>Main: {establishment.mainAttraction}</li>
              <li>Sides: {establishment.sideAttractions.join(', ')}</li>
              <li>Atmosphere: {establishment.atmospheres.join(', ')}</li>
            </UniqueBox>
          )}
          {!!workspace && (
            <UniqueBox uniqueType={workspace.uniqueType} testId="workspace-box">
              {workspace.workspaceItems.map((item) => {
                return <li key={item}>{item}</li>;
              })}
            </UniqueBox>
          )}
          {!!skinnerGear && (
            <UniqueBox
              uniqueType={skinnerGear.uniqueType}
              testId="skinner-gear-box"
            >
              <>
                <li>
                  {!!skinnerGear.graciousWeapon &&
                    splitItem(skinnerGear.graciousWeapon.item)}
                </li>
                {skinnerGear.luxeGear.map((item) => (
                  <li key={item.id}>{splitItem(item.item)}</li>
                ))}
              </>
            </UniqueBox>
          )}
        </CustomUL>
      );
    } else {
      if (character?.playbook === PlaybookType.driver) {
        return (
          <Text color="white" alignSelf="center">
            {IMPROVE_DRIVER_FOR_WORKSPACE_TEXT}
          </Text>
        );
      }
    }
  };

  const box4Step6 = (
    <Box
      margin={{ left: 'xsmall', right: 'xsmall' }}
      justify="start"
      width="11rem"
      height="10rem"
      gap="small"
      align="center"
      pad="small"
      border
      background={{
        color: 'neutral-1',
        opacity: CharacterCreationSteps.setUnique === currentStep ? 1 : 0.5,
      }}
      onClick={(e: any) => {
        e.currentTarget.blur();
        if (!character?.playbookUniques) {
          e.preventDefault();

          return;
        }

        !!character?.name &&
          !!character?.playbook &&
          changeStep(CharacterCreationSteps.setUnique);
      }}
      style={{
        cursor: !character || !character.playbook ? 'default' : 'pointer',
      }}
    >
      {!!character && renderUnique()}
    </Box>
  );

  const box5Step7 = (
    <Box
      data-testid="moves-box"
      margin={{ left: 'xsmall', right: 'xsmall' }}
      justify="start"
      width="11rem"
      height="10rem"
      gap="small"
      align="center"
      pad="small"
      border
      background={{
        color: 'neutral-1',
        opacity: CharacterCreationSteps.selectMoves === currentStep ? 1 : 0.5,
      }}
      onClick={(e: any) => {
        e.currentTarget.blur();
        !!character?.name &&
          !!character?.playbook &&
          changeStep(CharacterCreationSteps.selectMoves);
      }}
    >
      <Text color="white" weight="bold" alignSelf="center">
        {MOVES_TITLE}
      </Text>
      {!!character &&
      !!character.characterMoves &&
      character.characterMoves.length > 0 ? (
        <CustomUL>
          {character.characterMoves.map((move) => {
            if (move.isSelected) {
              return (
                <li
                  key={move.id}
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {decapitalize(move.name)}
                </li>
              );
            }
            return null;
          })}
        </CustomUL>
      ) : (
        <Text>...</Text>
      )}
    </Box>
  );

  const box6Step8 = (
    <Box
      data-testid="vehicles-box"
      margin={{ left: 'xsmall', right: 'xsmall' }}
      justify="start"
      width="11rem"
      height="10rem"
      gap="small"
      align="center"
      pad="small"
      border
      background={{
        color: 'neutral-1',
        opacity: CharacterCreationSteps.setVehicle === currentStep ? 1 : 0.5,
      }}
      onClick={(e: any) => {
        e.currentTarget.blur();
        !!character?.name &&
          !!character?.playbook &&
          changeStep(CharacterCreationSteps.setVehicle);
      }}
      style={{
        cursor: !character || !character.playbook ? 'default' : 'pointer',
      }}
    >
      <Text color="white" weight="bold" alignSelf="center">
        {VEHICLES_TITLE}
      </Text>
      {!!character && !!character.vehicles && character.vehicles.length > 0 ? (
        <CustomUL>
          {character.vehicles.map((vehicle) => {
            return (
              <li
                key={vehicle.id}
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {vehicle.name}
              </li>
            );
          })}
        </CustomUL>
      ) : (
        <Text>...</Text>
      )}
    </Box>
  );

  const box7Step9 = (
    <Box
      data-testid="battle-vehicles-box"
      margin={{ left: 'xsmall', right: 'xsmall' }}
      justify="start"
      width="11rem"
      height="10rem"
      gap="small"
      align="center"
      pad="small"
      border
      background={{
        color: 'neutral-1',
        opacity:
          CharacterCreationSteps.setBattleVehicle === currentStep ? 1 : 0.5,
      }}
      onClick={(e: any) => {
        e.currentTarget.blur();
        !!character?.name &&
          !!character?.playbook &&
          changeStep(CharacterCreationSteps.setBattleVehicle);
      }}
      style={{
        cursor: !character || !character.playbook ? 'default' : 'pointer',
      }}
    >
      <Text color="white" weight="bold" alignSelf="center">
        {BATTLE_VEHICLES_TITLE}
      </Text>
      {!!character &&
      !!character.battleVehicles &&
      character.battleVehicles.length > 0 ? (
        <CustomUL>
          {character.battleVehicles.map((vehicle) => {
            return (
              <li
                key={vehicle.id}
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {vehicle.name}
              </li>
            );
          })}
        </CustomUL>
      ) : (
        <Text>...</Text>
      )}
    </Box>
  );

  const box8Step10 = (
    <Box
      data-testid="hx-box"
      margin={{ left: 'xsmall', right: 'xsmall' }}
      justify="start"
      width="11rem"
      height="10rem"
      gap="small"
      align="center"
      pad="small"
      border
      background={{
        color: 'neutral-1',
        opacity: CharacterCreationSteps.setHx === currentStep ? 1 : 0.5,
      }}
      onClick={(e: any) => {
        e.currentTarget.blur();
        !!character?.name &&
          !!character?.playbook &&
          changeStep(CharacterCreationSteps.setHx);
      }}
      style={{
        cursor: !character || !character.playbook ? 'default' : 'pointer',
      }}
    >
      <Text color="white" weight="bold" alignSelf="center">
        {HX_TITLE}
      </Text>
      {!!character && !!character.hxBlock && character.hxBlock.length > 0 ? (
        <CustomUL>
          {character.hxBlock.map((hxStat) => {
            return (
              <Box
                key={hxStat.characterId}
                direction="row"
                fill="horizontal"
                justify="between"
                align="center"
              >
                <Text>{hxStat.characterName}</Text>
                <Text>{`${'--'.repeat(
                  hxStat.characterName.length > 9
                    ? 1
                    : 10 - hxStat.characterName.length
                )}`}</Text>
                <Text>{hxStat.hxValue}</Text>
              </Box>
            );
          })}
        </CustomUL>
      ) : (
        <Text>...</Text>
      )}
    </Box>
  );

  const boxesArray = [
    box0Step1,
    box1Step3,
    box2Step4,
    box3Step5,
    box4Step6,
    box5Step7,
    box6Step8,
    box7Step9,
    box8Step10,
  ];

  const renderBoxesSmall = () => {
    if (currentStep !== undefined) {
      switch (currentStep) {
        case 0:
        // Intentionally falls through
        case 1:
        // Intentionally falls through
        case 2:
          return (
            <>
              {boxesArray[0]}
              {boxesArray[1]}
              {boxesArray[2]}
            </>
          );
        case 8:
          return (
            <>
              {boxesArray[5]}
              {boxesArray[6]}
              {boxesArray[7]}
            </>
          );
        default:
          return (
            <>
              {boxesArray[currentStep - 3]}
              {boxesArray[currentStep - 2]}
              {boxesArray[currentStep - 1]}
            </>
          );
      }
    }
  };

  const renderBoxes = () => {
    if (currentStep !== undefined) {
      switch (currentStep) {
        case 0:
        // Intentionally falls through
        case 1:
        // Intentionally falls through
        case 2:
          return (
            <>
              {boxesArray[0]}
              {boxesArray[1]}
              {boxesArray[2]}
              {boxesArray[3]}
            </>
          );
        case 3:
          return (
            <>
              {boxesArray[0]}
              {boxesArray[1]}
              {boxesArray[2]}
              {boxesArray[3]}
            </>
          );
        case 4:
          return (
            <>
              {boxesArray[0]}
              {boxesArray[1]}
              {boxesArray[2]}
              {boxesArray[3]}
            </>
          );

        case 9:
          return (
            <>
              {boxesArray[5]}
              {boxesArray[6]}
              {boxesArray[7]}
              {boxesArray[8]}
            </>
          );
        case 10:
          return (
            <>
              {boxesArray[5]}
              {boxesArray[6]}
              {boxesArray[7]}
              {boxesArray[8]}
            </>
          );

        default:
          return (
            <>
              {boxesArray[currentStep - 4]}
              {boxesArray[currentStep - 3]}
              {boxesArray[currentStep - 2]}
              {boxesArray[currentStep - 1]}
            </>
          );
      }
    }
  };

  if (currentStep === undefined || !game) {
    return <Spinner />;
  }

  return (
    <Box
      data-testid="character-creation-stepper"
      direction="row"
      fill="horizontal"
      justify="center"
      pad="12px"
      align="center"
      flex="grow"
      style={{ maxHeight: '180px' }}
    >
      {!!currentStep && currentStep > 1 ? (
        <PreviousWithHover
          cursor="pointer"
          onClick={() => handlePrevious()}
          size="large"
          color="accent-1"
        />
      ) : (
        <div style={{ height: 48, width: 48, background: 'transparent' }} />
      )}
      {window.innerWidth < 800 ? renderBoxesSmall() : renderBoxes()}
      {!!currentStep &&
      currentStep < 9 &&
      currentStep > 1 &&
      !!character?.name ? (
        <NextWithHover
          cursor="pointer"
          onClick={() => handleNext()}
          size="large"
          color="accent-1"
        />
      ) : (
        <div style={{ height: 48, width: 48, background: 'transparent' }} />
      )}
    </Box>
  );
};

export default CharacterCreationStepper;
