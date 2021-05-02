import React, { FC, useEffect, useState } from 'react';
import { Box, Tab, Tabs } from 'grommet';

import Spinner from '../Spinner';
import AngelKitForm from './uniques/AngelKitForm';
import CustomWeaponsForm from './uniques/CustomWeaponsForm';
import BrainerGearForm from './uniques/BrainerGearForm';
import { CharacterCreationSteps, PlaybookType, UniqueTypes } from '../../@types/enums';
import { useGame } from '../../contexts/gameContext';
import { useHistory } from 'react-router-dom';
import GangForm from './uniques/GangForm';
import WeaponsForm from './uniques/WeaponsForm';
import HoldingForm from './uniques/HoldingForm';
import FollowersForm from './uniques/FollowersForm';
import SkinnerGearForm from './uniques/SkinnerGearForm';
import EstablishmentForm from './uniques/EstablishmentForm';
import WorkspaceForm from './uniques/WorkspaceForm';
import { PlaybookUniqueTypes } from '../../@types/dataInterfaces';
import { decapitalize } from '../../helpers/decapitalize';

interface UniqueFormSelectorProps {
  unique: PlaybookUniqueTypes;
}

const UniqueFormSelector: FC<UniqueFormSelectorProps> = ({ unique }) => {
  switch (unique.uniqueType) {
    case UniqueTypes.angelKit:
      return <AngelKitForm />;
    case UniqueTypes.customWeapons:
      return <CustomWeaponsForm />;
    case UniqueTypes.brainerGear:
      return <BrainerGearForm />;
    case UniqueTypes.gang:
      return <GangForm />;
    case UniqueTypes.weapons:
      return <WeaponsForm />;
    case UniqueTypes.holding:
      return <HoldingForm />;
    case UniqueTypes.followers:
      return <FollowersForm />;
    case UniqueTypes.establishment:
      return <EstablishmentForm />;
    case UniqueTypes.workspace:
      return <WorkspaceForm />;
    case UniqueTypes.skinnerGear:
      return <SkinnerGearForm />;
    default:
      return null;
  }
};

/**
 * This component acts as a router/switcher, to render the correct
 * PlaybookUnique form for the given PlaybookType.
 *
 * Each PlaybookType has its own property that is unique to it. These are
 * called PlayBookUniques and a different form is required for each one.
 *
 * For example, only the BATTLEBABE has a Custom Weapons property,
 * so only the BATTLEBABE needs a CustomWeaponsForm.
 *
 * Also, characters can earn additional PlaybookUniques,
 * so when the character has more than one PlaybookUnique it
 * renders tabs so the user can select the different forms.
 */
const PlaybookUniqueRouter: FC = () => {
  // -------------------------------------------------- Component state ---------------------------------------------------- //
  const [activeTab, setActiveTab] = useState(0);
  const [uniques, setUniques] = useState<PlaybookUniqueTypes[]>([]);

  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { game, character } = useGame();

  // -------------------------------------------------- 3rd party hooks ---------------------------------------------------- //
  const history = useHistory();

  // ------------------------------------------------------ Effects -------------------------------------------------------- //
  useEffect(() => {
    if (!!character?.playbookUniques) {
      setUniques(Object.values(character.playbookUniques).filter((elem) => !!elem && !!elem.uniqueType));
    }
  }, [character]);

  useEffect(() => {
    if (character?.playbook === PlaybookType.driver) {
      !!game && history.push(`/character-creation/${game.id}?step=${CharacterCreationSteps.selectMoves}`);
    }
  }, [game, character, history]);

  // ------------------------------------------------------ Render -------------------------------------------------------- //

  if (uniques.length === 0) {
    return <Spinner />;
  }

  const tabs = (
    <Tabs activeIndex={activeTab} onActive={(tab) => setActiveTab(tab)}>
      {uniques.map((uq) => (
        <Tab key={uq.id} title={decapitalize(uq.uniqueType)}>
          <UniqueFormSelector unique={uq} />
        </Tab>
      ))}
    </Tabs>
  );

  return (
    <Box
      fill
      direction="column"
      animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}
      pad="12px"
      align="center"
      justify="start"
    >
      {uniques.length === 1 ? <UniqueFormSelector unique={uniques[0]} /> : tabs}
    </Box>
  );
};

export default PlaybookUniqueRouter;
