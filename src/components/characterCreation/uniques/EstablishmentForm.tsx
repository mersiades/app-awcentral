import React, { ChangeEvent, FC, useEffect, useReducer, useState } from 'react';
import { omit } from 'lodash';
import { useMutation, useQuery } from '@apollo/client';
import { v4 as uuid } from 'uuid';
import { useHistory } from 'react-router-dom';
import { Box, CheckBox, Select, Text } from 'grommet';

import Spinner from '../../Spinner';
import { StyledMarkdown } from '../../styledComponents';
import { accentColors, ButtonWS, HeadingWS, ParagraphWS, RedBox, TextInputWS, TextWS } from '../../../config/grommetConfig';
import PLAYBOOK_CREATOR, { PlaybookCreatorData, PlaybookCreatorVars } from '../../../queries/playbookCreator';
import SET_ESTABLISHMENT, {
  getSetEstablishmentOR,
  SetEstablishmentData,
  SetEstablishmentVars,
} from '../../../mutations/setEstablishment';
import { CharacterCreationSteps, PlaybookType } from '../../../@types/enums';
import { EstablishmentInput } from '../../../@types';
import { SecurityOption } from '../../../@types/staticDataInterfaces';
import { useFonts } from '../../../contexts/fontContext';
import { useGame } from '../../../contexts/gameContext';
import { CastCrew } from '../../../@types/dataInterfaces';
import { ADJUST_MAESTROD_UNIQUE_2_NAME, INCREASED_BY_IMPROVEMENT_TEXT } from '../../../config/constants';
import EstablishmentInterestResolutionDialog from '../../dialogs/EstablishmentInterestResolutionDialog';

const ATTRACTIONS_INSTRUCTIONS =
  'Your establishment features one main attraction supported by 2 side attractions (like a bar features drinks, supported by music and easy food). Choose one to be your main act and 2 for lube:';

const CAST_CREW_INSTRUCTIONS =
  "Your cast & crew can consist entirely of the other players' characters, with their agreement, or entirely of NPCs, or any mix. If it includes any NPCs, sketch them out - names and the 1-line descriptions - with the MC. Make sure they suit your establishment's scene.";

const REGULARS_INSTRUCTIONS = '_**Your regulars**_ include these 5 NPCs (at least): Lamprey, Ba, Camo, Toyota and Lits.';

const ATMOSPHERE_INSTRUCTIONS = "_**For your establishment's atmosphere**_, choose 3 or 4:";

const INTERESTED_NPCS_INSTRUCTIONS =
  'These 3 NPCs (at least) have an _**interest in your establishment**_: Been, Rolfball, Gams.';

export const RESOLVED_INTEREST_TEXT = 'Interest resolved';

interface EstablishmentBoxWrapperProps {
  children: JSX.Element;
  title: string;
  width?: string;
}

export const EstablishmentBoxWrapper: FC<EstablishmentBoxWrapperProps> = ({ children, title, width = '200px' }) => (
  <Box
    data-testid={`${title.toLowerCase()}-box`}
    align="center"
    width={width}
    flex="grow"
    fill="vertical"
    style={{ maxWidth: width }}
  >
    <RedBox fill justify="center" pad="12px" gap="12px">
      {children}
    </RedBox>
    <TextWS weight={600}>{title}</TextWS>
  </Box>
);

interface AttractionsBoxProps {
  mainAttraction: string;
  sideAttractions: string[];
  width?: string;
}

export const AttractionsBox: FC<AttractionsBoxProps> = ({ mainAttraction, sideAttractions, width }) => (
  <EstablishmentBoxWrapper title="Attractions" width={width}>
    <>
      {!!mainAttraction && <TextWS>Main: {mainAttraction}</TextWS>}
      {sideAttractions.length > 0 && <TextWS>Side: {sideAttractions.join(', ')}</TextWS>}
    </>
  </EstablishmentBoxWrapper>
);

interface AtmosphereBoxProps {
  atmospheres: string[];
  width?: string;
}

export const AtmosphereBox: FC<AtmosphereBoxProps> = ({ atmospheres, width }) => (
  <EstablishmentBoxWrapper title="Atmosphere" width={width}>
    <>{atmospheres.length > 0 && <TextWS>{atmospheres.join(', ')}</TextWS>}</>
  </EstablishmentBoxWrapper>
);

interface RegularsBoxProps {
  regulars: string[];
  bestRegular: string;
  worstRegular: string;
  width?: string;
}

export const RegularsBox: FC<RegularsBoxProps> = ({ regulars, bestRegular, worstRegular, width }) => (
  <EstablishmentBoxWrapper title="Regulars" width={width}>
    <>
      {regulars.length > 0 && <TextWS>{regulars.join(', ')}</TextWS>}
      {!!bestRegular && <TextWS>{bestRegular} is your best regular</TextWS>}
      {!!worstRegular && <TextWS>{worstRegular} is your worst regular</TextWS>}
    </>
  </EstablishmentBoxWrapper>
);

interface InterestedPartiesBoxProps {
  interestedParties: string[];
  wantsInOnIt: string;
  oweForIt: string;
  wantsItGone: string;
  width?: string;
}

export const InterestedPartiesBox: FC<InterestedPartiesBoxProps> = ({
  interestedParties,
  wantsInOnIt,
  oweForIt,
  wantsItGone,
  width,
}) => (
  <EstablishmentBoxWrapper title="Interested NPCs" width={width}>
    <>
      {interestedParties.length > 0 && <TextWS>{interestedParties.join(', ')}</TextWS>}
      {!!wantsInOnIt && <TextWS>{wantsInOnIt} wants in on it</TextWS>}
      {!!oweForIt && <TextWS>You owe {oweForIt} for it</TextWS>}
      {!!wantsItGone && <TextWS>{wantsItGone} wants it gone</TextWS>}
    </>
  </EstablishmentBoxWrapper>
);

interface SecurityBoxProps {
  securityOptions: SecurityOption[];
  width?: string;
}

export const SecurityBox: FC<SecurityBoxProps> = ({ securityOptions, width }) => (
  <EstablishmentBoxWrapper title="Security" width={width}>
    <>
      {securityOptions.length > 0 &&
        securityOptions.map((opt: SecurityOption) => <TextWS key={opt.id}>{opt.description}</TextWS>)}
    </>
  </EstablishmentBoxWrapper>
);

interface CastCrewBoxProps {
  castAndCrew: CastCrew[];
}

export const CastCrewBox: FC<CastCrewBoxProps> = ({ castAndCrew }) => (
  <EstablishmentBoxWrapper title="Cast & Crew">
    <>{castAndCrew.length > 0 && <TextWS>{castAndCrew.map((cc: CastCrew) => cc.name).join(', ')}</TextWS>}</>
  </EstablishmentBoxWrapper>
);

interface Action {
  type:
    | 'SET_EXISTING_ESTABLISHMENT'
    | 'SET_DEFAULT_ESTABLISHMENT'
    | 'SET_MAIN_ATTRACTION'
    | 'REMOVE_SIDE_ATTRACTION'
    | 'ADD_SIDE_ATTRACTION'
    | 'REMOVE_ATMOSPHERE'
    | 'ADD_ATMOSPHERE'
    | 'ADD_REGULAR'
    | 'SET_BEST_REGULAR'
    | 'SET_WORST_REGULAR'
    | 'ADD_INTERESTED_NPC'
    | 'SET_WANTS_IN'
    | 'SET_OWES_FOR_IT'
    | 'SET_WANTS_IT_GONE'
    | 'REMOVE_SECURITY_OPTION'
    | 'ADD_SECURITY_OPTION'
    | 'ADD_CREW';
  payload?: any;
}

const establishmentFormReducer = (state: EstablishmentInput, action: Action) => {
  switch (action.type) {
    case 'SET_EXISTING_ESTABLISHMENT':
      return {
        ...state,
        ...action.payload,
      };
    case 'SET_DEFAULT_ESTABLISHMENT':
      return {
        ...state,
        ...action.payload,
      };
    case 'SET_MAIN_ATTRACTION':
      return {
        ...state,
        mainAttraction: action.payload,
      };
    case 'REMOVE_SIDE_ATTRACTION':
      return {
        ...state,
        sideAttractions: state.sideAttractions.filter((attr) => attr !== action.payload),
      };
    case 'ADD_SIDE_ATTRACTION':
      return {
        ...state,
        sideAttractions: [...state.sideAttractions, action.payload],
      };
    case 'REMOVE_ATMOSPHERE':
      return {
        ...state,
        atmospheres: state.atmospheres.filter((atmos) => atmos !== action.payload),
      };
    case 'ADD_ATMOSPHERE':
      return {
        ...state,
        atmospheres: [...state.atmospheres, action.payload],
      };
    case 'ADD_REGULAR':
      return {
        ...state,
        regulars: [...state.regulars, action.payload],
      };
    case 'SET_BEST_REGULAR':
      return {
        ...state,
        bestRegular: action.payload,
      };
    case 'SET_WORST_REGULAR':
      return {
        ...state,
        worstRegular: action.payload,
      };
    case 'ADD_INTERESTED_NPC':
      return {
        ...state,
        interestedParties: [...state.interestedParties, action.payload],
      };
    case 'SET_WANTS_IN':
      return {
        ...state,
        wantsInOnIt: action.payload,
      };
    case 'SET_OWES_FOR_IT':
      return {
        ...state,
        oweForIt: action.payload,
      };
    case 'SET_WANTS_IT_GONE':
      return {
        ...state,
        wantsItGone: action.payload,
      };
    case 'REMOVE_SECURITY_OPTION':
      return {
        ...state,
        securityOptions: state.securityOptions.filter((opt) => opt.id !== action.payload.id),
      };
    case 'ADD_SECURITY_OPTION':
      return {
        ...state,
        securityOptions: [...state.securityOptions, action.payload],
      };
    case 'ADD_CREW':
      return {
        ...state,
        castAndCrew: [...state.castAndCrew, action.payload],
      };
    default:
      return state;
  }
};

const initialState: EstablishmentInput = {
  id: undefined,
  mainAttraction: '',
  bestRegular: '',
  worstRegular: '',
  wantsInOnIt: '',
  oweForIt: '',
  wantsItGone: '',
  securitiesCount: 2,
  sideAttractions: [],
  atmospheres: [],
  regulars: [],
  interestedParties: [],
  securityOptions: [],
  castAndCrew: [],
};

const EstablishmentForm: FC = () => {
  // -------------------------------------------------- Component state ---------------------------------------------------- //
  const [
    {
      securitiesCount,
      mainAttraction,
      bestRegular,
      worstRegular,
      wantsInOnIt,
      oweForIt,
      wantsItGone,
      sideAttractions,
      atmospheres,
      regulars,
      interestedParties,
      securityOptions,
      castAndCrew,
    },
    dispatch,
  ] = useReducer(establishmentFormReducer, initialState);
  const [workingAttractions, setWorkingAttractions] = useState<string[]>([]);
  const [regularName, setRegularName] = useState('');
  const [interestedNpcName, setInterestedNpcName] = useState('');
  const [crewName, setCrewName] = useState('');
  const [crewDesc, setCrewDesc] = useState('');
  const [needsInterestResolution, setNeedsInterestResolution] = useState(false);
  const [hasResolveInterestImprovement, setHasResolveInterestImprovement] = useState(false);

  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { game, character, userGameRole } = useGame();
  const { crustReady } = useFonts();

  // -------------------------------------------------- 3rd party hooks ---------------------------------------------------- //
  const history = useHistory();

  // ------------------------------------------------------ graphQL -------------------------------------------------------- //
  const { data: pbCreatorData } = useQuery<PlaybookCreatorData, PlaybookCreatorVars>(PLAYBOOK_CREATOR, {
    variables: { playbookType: PlaybookType.maestroD },
  });
  const establishmentCreator = pbCreatorData?.playbookCreator.playbookUniqueCreator?.establishmentCreator;
  const [setEstablishment, { loading: settingEstablishment }] = useMutation<SetEstablishmentData, SetEstablishmentVars>(
    SET_ESTABLISHMENT
  );

  // ------------------------------------------------- Component functions -------------------------------------------------- //
  const securityValues = securityOptions.map((opt: SecurityOption) => opt.value);

  const isEstablishmentComplete = (): boolean => {
    if (hasResolveInterestImprovement) {
      let count = 0;
      if (wantsInOnIt) {
        count++;
      }

      if (oweForIt) {
        count++;
      }

      if (wantsItGone) {
        count++;
      }

      return (
        count === 2 &&
        !!mainAttraction &&
        !!bestRegular &&
        !!worstRegular &&
        sideAttractions.length === 2 &&
        [3, 4].includes(atmospheres.length) &&
        regulars.length >= 5 &&
        interestedParties.length >= 3 &&
        securityValues.length > 0 &&
        securityValues.reduce((a: number, b: number) => a + b) === securitiesCount &&
        castAndCrew.length > 0
      );
    } else {
      return (
        !!mainAttraction &&
        !!bestRegular &&
        !!worstRegular &&
        !!wantsInOnIt &&
        !!oweForIt &&
        !!wantsItGone &&
        sideAttractions.length === 2 &&
        [3, 4].includes(atmospheres.length) &&
        regulars.length >= 5 &&
        interestedParties.length >= 3 &&
        securityValues.length > 0 &&
        securityValues.reduce((a: number, b: number) => a + b) === securitiesCount &&
        castAndCrew.length > 0
      );
    }
  };

  const handleSubmitEstablishment = async () => {
    if (!!userGameRole && !!character && !!game && isEstablishmentComplete()) {
      // @ts-ignore
      const securityNoTypename = securityOptions.map((so: SecurityOption) => omit(so, ['__typename']));
      // @ts-ignore
      const crewNoTypename = castAndCrew.map((cc: CastCrew) => omit(cc, ['__typename']));

      const establishmentInput: EstablishmentInput = {
        id: character.playbookUniques?.establishment ? character.playbookUniques.establishment.id : undefined,
        mainAttraction,
        bestRegular,
        worstRegular,
        wantsInOnIt,
        oweForIt,
        wantsItGone,
        securitiesCount,
        sideAttractions,
        atmospheres,
        regulars,
        interestedParties,
        securityOptions: securityNoTypename,
        castAndCrew: crewNoTypename,
      };

      try {
        setEstablishment({
          variables: { gameRoleId: userGameRole.id, characterId: character.id, establishment: establishmentInput },
          optimisticResponse: getSetEstablishmentOR(character, establishmentInput),
        });
        if (!character.hasCompletedCharacterCreation) {
          history.push(`/character-creation/${game.id}?step=${CharacterCreationSteps.selectMoves}`);
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleMainAttractionSelect = (attraction: string) => {
    if (!!establishmentCreator) {
      setWorkingAttractions(() => establishmentCreator?.attractions.filter((attr) => attr !== attraction));
      dispatch({ type: 'SET_MAIN_ATTRACTION', payload: attraction });
      if (sideAttractions.includes(attraction)) {
        dispatch({ type: 'REMOVE_SIDE_ATTRACTION', payload: attraction });
      }
    }
  };

  const handleSelectSideAttraction = (attraction: string) => {
    if (!!establishmentCreator) {
      if (sideAttractions.includes(attraction)) {
        dispatch({ type: 'REMOVE_SIDE_ATTRACTION', payload: attraction });
      } else if (sideAttractions.length < establishmentCreator.sideAttractionCount) {
        dispatch({ type: 'ADD_SIDE_ATTRACTION', payload: attraction });
      }
    }
  };

  const handleAtmosphereSelect = (atmosphere: string) => {
    if (!!establishmentCreator) {
      if (atmospheres.includes(atmosphere)) {
        dispatch({ type: 'REMOVE_ATMOSPHERE', payload: atmosphere });
      } else if (atmospheres.length < 4) {
        dispatch({ type: 'ADD_ATMOSPHERE', payload: atmosphere });
      }
    }
  };

  const handleAddRegular = () => {
    dispatch({ type: 'ADD_REGULAR', payload: regularName });
    setRegularName('');
  };

  const handleAddInterestedNpc = () => {
    dispatch({ type: 'ADD_INTERESTED_NPC', payload: interestedNpcName });
    setInterestedNpcName('');
  };

  const handleSelectSecurity = (option: SecurityOption) => {
    if (securityOptions.includes(option)) {
      dispatch({ type: 'REMOVE_SECURITY_OPTION', payload: option });
    } else if (
      securityValues.length === 0 ||
      securityValues.reduce((a: number, b: number) => a + b) + option.value <= securitiesCount
    ) {
      dispatch({ type: 'ADD_SECURITY_OPTION', payload: option });
    }
  };

  const handleAddCrew = () => {
    const crew: CastCrew = {
      id: uuid(),
      name: crewName,
      description: crewDesc,
    };
    dispatch({ type: 'ADD_CREW', payload: crew });
    setCrewName('');
    setCrewDesc('');
  };

  // ------------------------------------------------------- Effects -------------------------------------------------------- //

  // Set workingAttractions when component mounts
  useEffect(() => {
    if (!!establishmentCreator && !character?.playbookUniques?.establishment) {
      setWorkingAttractions(establishmentCreator.attractions);
    } else if (!!establishmentCreator && !!character?.playbookUniques?.establishment) {
      const { mainAttraction } = character.playbookUniques.establishment;
      const filteredAttractions = establishmentCreator.attractions.filter((attr) => attr !== mainAttraction);
      setWorkingAttractions(filteredAttractions);
    }
  }, [character, establishmentCreator]);

  // Set existing or blank Establishment when component mounts
  useEffect(() => {
    if (!!character?.playbookUniques?.establishment) {
      dispatch({ type: 'SET_EXISTING_ESTABLISHMENT', payload: character.playbookUniques.establishment });
    } else if (!!establishmentCreator) {
      dispatch({
        type: 'SET_DEFAULT_ESTABLISHMENT',
        payload: {
          ...initialState,
          regulars: establishmentCreator.regularsNames,
          interestedParties: establishmentCreator.interestedPartyNames,
        },
      });
    }
  }, [character, establishmentCreator]);

  // Calculates whether the user needs to resolve an interest in the Establishment
  useEffect(() => {
    if (character?.improvementMoves.some((move) => move.name === ADJUST_MAESTROD_UNIQUE_2_NAME)) {
      setHasResolveInterestImprovement(true);
      if (!!wantsInOnIt && !!wantsItGone && !!oweForIt) {
        setNeedsInterestResolution(true);
      } else {
        setNeedsInterestResolution(false);
      }
    } else {
      setNeedsInterestResolution(false);
      setHasResolveInterestImprovement(false);
    }
  }, [character, oweForIt, wantsInOnIt, wantsItGone]);

  // ------------------------------------------------------ Render -------------------------------------------------------- //

  const renderPills = (atmosphere: string) => (
    <Box
      data-testid={`${atmosphere}-pill`}
      key={atmosphere}
      background={atmospheres.includes(atmosphere) ? { color: '#698D70', dark: true } : '#4C684C'}
      round="medium"
      pad={{ top: '3px', bottom: '1px', horizontal: '12px' }}
      margin={{ vertical: '3px', horizontal: '3px' }}
      justify="center"
      onClick={() => handleAtmosphereSelect(atmosphere)}
      style={{ boxShadow: '0 0 3px 0.5px #000' }}
      hoverIndicator={{ color: '#698D70', dark: true }}
    >
      <Text size="medium">{atmosphere}</Text>
    </Box>
  );

  return (
    <Box
      data-testid="establishment-form"
      justify="start"
      width="85vw"
      align="start"
      pad="24px"
      gap="18px"
      style={{ maxWidth: '763px' }}
    >
      {needsInterestResolution && (
        <EstablishmentInterestResolutionDialog oweForIt={oweForIt} wantsInOnIt={wantsInOnIt} wantsItGone={wantsItGone} />
      )}
      <Box direction="row" fill="horizontal" align="center" justify="between">
        <HeadingWS
          crustReady={crustReady}
          level={2}
          alignSelf="center"
          style={{ maxWidth: 'unset', height: '34px', lineHeight: '44px' }}
        >{`${!!character?.name ? character.name?.toUpperCase() : '...'}'S ESTABLISHMENT`}</HeadingWS>
        <ButtonWS
          primary
          label={settingEstablishment ? <Spinner fillColor="#FFF" width="36px" height="36px" /> : 'SET'}
          onClick={() => !settingEstablishment && handleSubmitEstablishment()}
          disabled={settingEstablishment || !isEstablishmentComplete()}
          style={{ height: '45px' }}
        />
      </Box>
      <Box fill="horizontal" direction="row" justify="between" gap="12px">
        <Box>
          <ParagraphWS style={{ maxWidth: '500px' }} margin={{ top: '0px', bottom: '3px' }}>
            {ATTRACTIONS_INSTRUCTIONS}
          </ParagraphWS>
          <Select
            id="main-attraction-input"
            aria-label="main-attraction-input"
            name="main-attraction"
            value={mainAttraction}
            placeholder="Main attraction"
            options={establishmentCreator?.attractions || []}
            onChange={(e) => handleMainAttractionSelect(e.value)}
          />

          <ParagraphWS margin={{ top: '12px', bottom: '3px' }}>Select side attractions:</ParagraphWS>
          <Box direction="row" wrap gap="6px">
            {workingAttractions.map((attr, index) => (
              <CheckBox
                key={attr + index.toString()}
                name={attr}
                checked={sideAttractions.includes(attr)}
                label={<TextWS style={{ minWidth: '90px', height: '20px' }}>{attr}</TextWS>}
                value={attr}
                onChange={(e) => handleSelectSideAttraction(e.target.value)}
                style={{ marginBottom: '3px' }}
              />
            ))}
          </Box>
        </Box>
        <AttractionsBox mainAttraction={mainAttraction} sideAttractions={sideAttractions} />
      </Box>
      <Box fill="horizontal" justify="between" gap="12px" margin={{ top: '6px' }}>
        <StyledMarkdown>{ATMOSPHERE_INSTRUCTIONS}</StyledMarkdown>
        <Box direction="row" gap="12px">
          <Box direction="row" wrap>
            {establishmentCreator?.atmospheres.map((atmosphere) => renderPills(atmosphere))}
          </Box>
          <AtmosphereBox atmospheres={atmospheres} />
        </Box>
      </Box>
      <Box fill="horizontal" justify="between" gap="12px" margin={{ top: '6px' }}>
        <StyledMarkdown>{REGULARS_INSTRUCTIONS}</StyledMarkdown>
        <Box direction="row" justify="between" align="center" gap="12px">
          <Box gap="12px">
            <Box direction="row" fill align="center" gap="12px">
              <TextInputWS
                aria-label="additional-regular-input"
                placeholder="Add regular (optional)"
                value={regularName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setRegularName(e.target.value)}
              />
              <ButtonWS
                id="add-additional-regular-button"
                secondary
                label="ADD"
                disabled={!regularName || regulars.includes(regularName)}
                fill="horizontal"
                style={{ outline: 'none', boxShadow: 'none', width: '100px' }}
                onClick={() => handleAddRegular()}
              />
            </Box>
            <Box direction="row" fill align="center" gap="12px">
              <TextWS style={{ minWidth: '250px' }}>{establishmentCreator?.regularsQuestions[0]}</TextWS>
              <Select
                aria-label="best-regular-input"
                placeholder="Select regular"
                value={bestRegular}
                options={regulars.filter((reg: string) => reg !== worstRegular)}
                onChange={(e) => dispatch({ type: 'SET_BEST_REGULAR', payload: e.value })}
              />
            </Box>
            <Box direction="row" fill align="center" gap="12px">
              <TextWS style={{ minWidth: '250px' }}>{establishmentCreator?.regularsQuestions[1]}</TextWS>
              <Select
                aria-label="worst-regular-input"
                placeholder="Select regular"
                value={worstRegular}
                options={regulars.filter((reg: string) => reg !== bestRegular)}
                onChange={(e) => dispatch({ type: 'SET_WORST_REGULAR', payload: e.value })}
              />
            </Box>
          </Box>
          <RegularsBox regulars={regulars} bestRegular={bestRegular} worstRegular={worstRegular} />
        </Box>
      </Box>
      <Box fill="horizontal" justify="between" gap="12px" margin={{ top: '6px' }}>
        <StyledMarkdown>{INTERESTED_NPCS_INSTRUCTIONS}</StyledMarkdown>
        <Box direction="row" justify="between" gap="12px">
          <Box gap="12px">
            <Box direction="row" fill align="center" gap="12px">
              <TextInputWS
                aria-label="additional-interested-npc-input"
                placeholder="Add interested NPC (optional)"
                value={interestedNpcName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setInterestedNpcName(e.target.value)}
              />
              <ButtonWS
                secondary
                id="add-additional-interest-npc-button"
                label="ADD"
                disabled={!interestedNpcName || interestedParties.includes(interestedNpcName)}
                fill="horizontal"
                style={{ outline: 'none', boxShadow: 'none', width: '100px' }}
                onClick={() => handleAddInterestedNpc()}
              />
            </Box>
            <Box direction="row" fill align="center" gap="12px">
              <TextWS style={{ minWidth: '250px' }}>{establishmentCreator?.interestedPartyQuestions[0]}</TextWS>
              {hasResolveInterestImprovement && !wantsInOnIt ? (
                <TextWS color={accentColors[0]}>{RESOLVED_INTEREST_TEXT}</TextWS>
              ) : (
                <Select
                  aria-label="wants-in-on-it-input"
                  placeholder="Select NPC"
                  value={wantsInOnIt}
                  options={interestedParties.filter((npc: string) => npc !== oweForIt && npc !== wantsItGone)}
                  onChange={(e) => dispatch({ type: 'SET_WANTS_IN', payload: e.value })}
                />
              )}
            </Box>
            <Box direction="row" fill align="center" gap="12px">
              <TextWS style={{ minWidth: '250px' }}>{establishmentCreator?.interestedPartyQuestions[1]}</TextWS>
              {hasResolveInterestImprovement && !oweForIt ? (
                <TextWS color={accentColors[0]}>{RESOLVED_INTEREST_TEXT}</TextWS>
              ) : (
                <Select
                  aria-label="owes-for-it-input"
                  placeholder="Select NPC"
                  value={oweForIt}
                  options={interestedParties.filter((npc: string) => npc !== wantsInOnIt && npc !== wantsItGone)}
                  onChange={(e) => dispatch({ type: 'SET_OWES_FOR_IT', payload: e.value })}
                />
              )}
            </Box>
            <Box direction="row" fill align="center" gap="12px">
              <TextWS style={{ minWidth: '250px' }}>{establishmentCreator?.interestedPartyQuestions[2]}</TextWS>
              {hasResolveInterestImprovement && !wantsItGone ? (
                <TextWS color={accentColors[0]}>{RESOLVED_INTEREST_TEXT}</TextWS>
              ) : (
                <Select
                  aria-label="wants-it-gone-input"
                  placeholder="Select NPC"
                  value={wantsItGone}
                  options={interestedParties.filter((npc: string) => npc !== wantsInOnIt && npc !== oweForIt)}
                  onChange={(e) => dispatch({ type: 'SET_WANTS_IT_GONE', payload: e.value })}
                />
              )}
            </Box>
          </Box>
          <InterestedPartiesBox
            interestedParties={interestedParties}
            wantsInOnIt={wantsInOnIt}
            oweForIt={oweForIt}
            wantsItGone={wantsItGone}
          />
        </Box>
      </Box>
      <Box fill="horizontal" justify="between" gap="12px" margin={{ top: '6px' }}>
        <Box direction="row" align="center" gap="12px">
          <strong>
            <em>
              <ParagraphWS>{`For security, choose ${securitiesCount}`}</ParagraphWS>
            </em>
          </strong>
          {!!establishmentCreator && securitiesCount > establishmentCreator?.defaultSecuritiesCount && (
            <ParagraphWS color={accentColors[0]}>{INCREASED_BY_IMPROVEMENT_TEXT}</ParagraphWS>
          )}
        </Box>
        <Box direction="row" justify="between">
          <Box gap="12px">
            {establishmentCreator?.securityOptions.map((option) => (
              <CheckBox
                key={option.id}
                checked={securityOptions.map((opt: SecurityOption) => opt.id).includes(option.id)}
                label={
                  <TextWS>
                    {option.description}
                    {option.value > 1 && ` (counts as ${option.value})`}
                  </TextWS>
                }
                onChange={() => handleSelectSecurity(option)}
              />
            ))}
          </Box>
          <SecurityBox securityOptions={securityOptions} />
        </Box>
      </Box>
      <Box fill="horizontal" justify="between" gap="12px" margin={{ top: '6px' }}>
        <StyledMarkdown>{CAST_CREW_INSTRUCTIONS}</StyledMarkdown>
        <Box direction="row" justify="between" gap="12px">
          <Box gap="12px" flex="grow">
            <Box direction="row" fill="horizontal" align="center" gap="12px">
              <TextInputWS
                aria-label="crew-name-input"
                placeholder="Name"
                value={crewName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setCrewName(e.target.value)}
              />
              <ButtonWS
                id="add-crew-member-button"
                secondary
                label="ADD"
                disabled={!crewName}
                fill="horizontal"
                style={{ outline: 'none', boxShadow: 'none', width: '100px' }}
                onClick={() => handleAddCrew()}
              />
            </Box>
            <TextInputWS
              aria-label="crew-description-input"
              placeholder="Short description"
              value={crewDesc}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCrewDesc(e.target.value)}
            />
          </Box>
          <CastCrewBox castAndCrew={castAndCrew} />
        </Box>
      </Box>
    </Box>
  );
};

export default EstablishmentForm;
