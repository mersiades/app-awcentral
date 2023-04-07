import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { Box, Tip, Text } from 'grommet';

import Spinner from '../../Spinner';
import {
  accentColors,
  ButtonWS,
  HeadingWS,
  neutralColors,
  TextWS,
} from '../../../config/grommetConfig';
import PLAYBOOK_CREATOR, {
  PlaybookCreatorData,
  PlaybookCreatorVars,
} from '../../../queries/playbookCreator';
import SET_WEAPONS, {
  SetWeaponsData,
  SetWeaponsVars,
} from '../../../mutations/setWeapons';
import { CharacterCreationSteps, PlaybookType } from '../../../@types/enums';
import { useFonts } from '../../../contexts/fontContext';
import { useGame } from '../../../contexts/gameContext';
import {
  BACKUP_WEAPONS_TEXT,
  BIG_GUNS_TEXT,
  SERIOUS_GUNS_TEXT,
} from '../../../config/constants';
import { logAmpEvent } from '../../../config/amplitudeConfig';

export const WEAPONS_FORM_TEST_ID = 'weapons-form';

const WeaponsForm: FC = () => {
  // ----------------------------- Component state -------------------------- //
  const [fobGun, setFobGun] = useState('');
  const [seriousWeapons, setSeriousWeapons] = useState<string[]>([]);
  const [backupWeapon, setBackupWeapon] = useState('');
  // ----------------------------- Hooks ------------------------------------ //
  const { game, character, userGameRole } = useGame();
  const { crustReady } = useFonts();

  // ----------------------------- 3rd party hooks -------------------------- //
  const navigate = useNavigate();

  // ----------------------------- GraphQL ---------------------------------- //
  const { data: pbCreatorData } = useQuery<
    PlaybookCreatorData,
    PlaybookCreatorVars
  >(PLAYBOOK_CREATOR, {
    variables: { playbookType: PlaybookType.gunlugger },
  });

  const {
    bfoGunOptionCount,
    seriousGunOptionCount,
    backupWeaponsOptionCount,
    bigFuckOffGuns,
    seriousGuns,
    backupWeapons,
  } =
    pbCreatorData?.playbookCreator.playbookUniqueCreator?.weaponsCreator || {};
  const [setWeapons, { loading: settingWeapons }] = useMutation<
    SetWeaponsData,
    SetWeaponsVars
  >(SET_WEAPONS);

  // ----------------------------- Component functions ---------------------- //
  const handleSubmitWeapons = async () => {
    if (!!userGameRole && !!character && !!game) {
      try {
        await setWeapons({
          variables: {
            gameRoleId: userGameRole.id,
            characterId: character.id,
            weapons: [...seriousWeapons, fobGun, backupWeapon],
          },
        });

        if (!character.hasCompletedCharacterCreation) {
          logAmpEvent('set unique');
          navigate(
            `/character-creation/${game.id}?step=${CharacterCreationSteps.selectMoves}`
          );
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSeriousWeaponSelect = (weapon: string, isSelected: boolean) => {
    if (isSelected) {
      setSeriousWeapons(seriousWeapons.filter((sw) => sw !== weapon));
    } else {
      seriousWeapons.length < 2 &&
        setSeriousWeapons([...seriousWeapons, weapon]);
    }
  };
  // ----------------------------- Effects ---------------------------------------- //

  useEffect(() => {
    if (
      !!character?.playbookUniques?.weapons &&
      !!bigFuckOffGuns &&
      !!seriousGuns &&
      !!backupWeapons
    ) {
      let existingSeriousWeapons: string[] = [];
      character.playbookUniques.weapons.weapons.forEach((weapon) => {
        if (bigFuckOffGuns.includes(weapon)) {
          setFobGun(weapon);
        }

        if (backupWeapons.includes(weapon)) {
          setBackupWeapon(weapon);
        }

        if (seriousGuns.includes(weapon)) {
          existingSeriousWeapons = [...existingSeriousWeapons, weapon];
        }
      });
      setSeriousWeapons(existingSeriousWeapons);
    }
  }, [
    character?.playbookUniques?.weapons,
    bigFuckOffGuns,
    seriousGuns,
    backupWeapons,
  ]);

  // ----------------------------- Render ---------------------------------------- //

  const renderWeaponPill = (
    weapon: string,
    isSelected: boolean,
    onClick: () => void
  ) => {
    const tags = weapon.substring(weapon.indexOf('(') + 1, weapon.indexOf(')'));
    const weaponName = weapon.substring(0, weapon.indexOf(' ('));
    return (
      <Tip key={weapon} content={tags}>
        <Box
          data-testid={`${weapon}-pill`}
          height="fit-content"
          background={
            isSelected
              ? { color: accentColors[0], dark: true }
              : neutralColors[0]
          }
          round="medium"
          pad={{ top: '3px', bottom: '1px', horizontal: '12px' }}
          margin={{ vertical: '3px', horizontal: '3px' }}
          justify="center"
          onClick={onClick}
          hoverIndicator={{ color: '#698D70', dark: true }}
          style={{ cursor: 'pointer' }}
        >
          <Text weight="bold" size="medium">
            {weaponName}
          </Text>
        </Box>
      </Tip>
    );
  };

  const renderSeriousWeaponPill = (weapon: string) => {
    const isSelected = seriousWeapons.includes(weapon);
    const tags = weapon.substring(weapon.indexOf('(') + 1, weapon.indexOf(')'));
    const weaponName = weapon.substring(0, weapon.indexOf(' ('));

    return (
      <Tip key={weapon} content={tags}>
        <Box
          data-testid={`${weapon}-pill`}
          height="fit-content"
          background={
            isSelected
              ? { color: accentColors[0], dark: true }
              : neutralColors[0]
          }
          round="medium"
          pad={{ top: '3px', bottom: '1px', horizontal: '12px' }}
          margin={{ vertical: '3px', horizontal: '3px' }}
          justify="center"
          onClick={() => handleSeriousWeaponSelect(weapon, isSelected)}
          hoverIndicator={{ color: '#698D70', dark: true }}
          style={{ cursor: 'pointer' }}
        >
          <Text weight="bold" size="medium">
            {weaponName}
          </Text>
        </Box>
      </Tip>
    );
  };

  return (
    <Box
      data-testid={WEAPONS_FORM_TEST_ID}
      justify="start"
      width="85vw"
      align="start"
      style={{ maxWidth: '742px' }}
      margin={{ bottom: '24px' }}
    >
      <Box direction="row" fill="horizontal" align="center" justify="between">
        <HeadingWS
          crustReady={crustReady}
          level={2}
          style={{ maxWidth: 'unset', height: '34px', lineHeight: '44px' }}
        >{`${
          !!character?.name ? character.name?.toUpperCase() : '...'
        }'S WEAPONS`}</HeadingWS>
        <ButtonWS
          primary
          label={
            settingWeapons ? (
              <Spinner fillColor="#FFF" width="36px" height="36px" />
            ) : (
              'SET'
            )
          }
          onClick={() => !settingWeapons && handleSubmitWeapons()}
          disabled={
            settingWeapons ||
            seriousWeapons.length < 2 ||
            !fobGun ||
            !backupWeapon
          }
        />
      </Box>
      <Box fill="horizontal" align="center" gap="24px">
        <Box>
          <TextWS>
            <em>
              <strong>{BIG_GUNS_TEXT}</strong>
            </em>
            {` (choose ${bfoGunOptionCount})`}
          </TextWS>
          <Box direction="row" wrap>
            {bigFuckOffGuns?.map((weapon) => {
              const isSelected = weapon === fobGun;
              const onClick = () =>
                isSelected ? setFobGun('') : setFobGun(weapon);
              return renderWeaponPill(weapon, isSelected, onClick);
            })}
          </Box>
        </Box>
        <Box>
          <TextWS>
            <em>
              <strong>{SERIOUS_GUNS_TEXT}</strong>
            </em>
            {` (choose ${seriousGunOptionCount})`}
          </TextWS>
          <Box direction="row" wrap>
            {seriousGuns?.map((weapon) => renderSeriousWeaponPill(weapon))}
          </Box>
        </Box>
        <Box>
          <TextWS>
            <em>
              <strong>{BACKUP_WEAPONS_TEXT}</strong>
            </em>
            {` (choose ${backupWeaponsOptionCount})`}
          </TextWS>
          <Box direction="row" wrap>
            {backupWeapons?.map((weapon) => {
              const isSelected = weapon === backupWeapon;
              const onClick = () =>
                isSelected ? setBackupWeapon('') : setBackupWeapon(weapon);
              return renderWeaponPill(weapon, isSelected, onClick);
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WeaponsForm;
