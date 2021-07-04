import React, {
  ChangeEvent,
  FC,
  Reducer,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { shuffle } from 'lodash';
import { useMutation, useQuery } from '@apollo/client';
import { Box, FormField, ResponsiveContext, Select, TextArea } from 'grommet';

import Spinner from '../Spinner';
import DialogWrapper from '../DialogWrapper';
import { StyledMarkdown } from '../styledComponents';
import {
  ButtonWS,
  TextInputWS,
  TextWS,
  threatDialogBackground,
} from '../../config/grommetConfig';
import THREAT_CREATOR, {
  ThreatCreatorData,
  ThreatCreatorVars,
} from '../../queries/threatCreator';
import ADD_THREAT, {
  AddThreatData,
  AddThreatVars,
} from '../../mutations/addThreat';
import { ThreatType } from '../../@types/enums';
import { ThreatInput } from '../../@types';
import { Threat } from '../../@types/dataInterfaces';
import { useGame } from '../../contexts/gameContext';
import { decapitalize } from '../../helpers/decapitalize';
import { SET_TEXT } from '../../config/constants';

interface ThreatDialogProps {
  handleClose: () => void;
  existingThreat?: Threat;
}

interface ThreatFormState {
  name: string;
  threatKind: ThreatType;
  impulse: string;
  description: string;
  stakes?: string;
}

interface Action {
  type: 'SET_NAME' | 'SET_KIND' | 'SET_IMPULSE' | 'SET_DESC' | 'SET_STAKES';
  payload?: any;
}

const threatFormReducer: Reducer<ThreatFormState, Action> = (
  state: ThreatFormState,
  action: Action
) => {
  switch (action.type) {
    case 'SET_KIND':
      return {
        ...state,
        threatKind: action.payload,
        impulse: '',
      };
    case 'SET_NAME':
      return {
        ...state,
        name: action.payload,
      };
    case 'SET_IMPULSE':
      return {
        ...state,
        impulse: action.payload,
      };
    case 'SET_DESC':
      return {
        ...state,
        description: action.payload,
      };
    case 'SET_STAKES':
      return {
        ...state,
        stakes: action.payload,
      };
    default:
      return state;
  }
};

const ThreatDialog: FC<ThreatDialogProps> = ({
  handleClose,
  existingThreat,
}) => {
  const initialState: ThreatFormState = {
    name: !!existingThreat ? existingThreat.name : '',
    threatKind: !!existingThreat
      ? existingThreat.threatKind
      : ThreatType.warlord,
    impulse: !!existingThreat ? existingThreat.impulse : '',
    description: !!existingThreat?.description
      ? existingThreat.description
      : '',
    stakes: !!existingThreat?.stakes ? existingThreat.stakes : '',
  };

  // ----------------------------- Component state ------------------------------ //
  const [{ name, threatKind, impulse, description, stakes }, dispatch] =
    useReducer(threatFormReducer, initialState);
  const [filteredNames, setFilteredNames] = useState<string[]>([]);

  // ----------------------------- Hooks ---------------------------------------- //
  const { mcGameRole } = useGame();

  // ----------------------------- 3rd party hooks ------------------------------- //
  const size = useContext(ResponsiveContext);

  // ----------------------------- GraphQL -------------------------------------- //
  const { data } = useQuery<ThreatCreatorData, ThreatCreatorVars>(
    THREAT_CREATOR
  );
  const threatCreator = data?.threatCreator;
  const [addThreat, { loading: addingThreat }] = useMutation<
    AddThreatData,
    AddThreatVars
  >(ADD_THREAT);
  // ----------------------------- Component functions ------------------------- //

  const handleSetThreat = async () => {
    if (!!mcGameRole) {
      const threat: ThreatInput = {
        id: existingThreat ? existingThreat.id : undefined,
        name,
        threatKind,
        impulse,
        description,
        stakes,
      };
      try {
        await addThreat({
          variables: { gameRoleId: mcGameRole.id, threat },
        });
        handleClose();
      } catch (error) {
        console.error(error);
      }
    }
  };

  // ----------------------------- Effects ---------------------------------------- //
  useEffect(() => {
    if (!!threatCreator) {
      const filteredNames = threatCreator.threatNames.filter((n) =>
        n.toLowerCase().includes(name.toLowerCase())
      );
      setFilteredNames(filteredNames);
    }
  }, [threatCreator, name]);

  // ----------------------------- Render ---------------------------------------- //
  const renderInstructions = () => (
    <>
      <StyledMarkdown>
        {!!threatCreator?.createThreatInstructions
          ? threatCreator.createThreatInstructions
          : '...'}
      </StyledMarkdown>
      <TextWS alignSelf="start">Essential threats:</TextWS>
      <StyledMarkdown>
        {!!threatCreator?.essentialThreatInstructions
          ? threatCreator.essentialThreatInstructions
          : '...'}
      </StyledMarkdown>
    </>
  );

  const renderNameForm = () => (
    <Box flex="grow">
      <FormField label="Name" name="threatName" width="100%">
        {!!threatCreator && (
          <TextInputWS
            placeholder="Type or select name"
            name="threatName"
            value={name}
            size="xlarge"
            suggestions={
              name === '' ? shuffle(threatCreator.threatNames) : filteredNames
            }
            onChange={(e) =>
              dispatch({ type: 'SET_NAME', payload: e.target.value })
            }
            // @ts-ignore
            onSuggestionSelect={({ suggestion }) =>
              dispatch({ type: 'SET_NAME', payload: suggestion })
            }
          />
        )}
      </FormField>
    </Box>
  );

  const renderTypeForm = () => (
    <Box flex="grow">
      <FormField label="Kind" name="threatType" width="100%">
        <Select
          placeholder="Select threat kind"
          name="threatType"
          options={Object.values(ThreatType)}
          value={threatKind}
          onChange={({ option }) =>
            dispatch({ type: 'SET_KIND', payload: option })
          }
        />
      </FormField>
    </Box>
  );

  const renderImpulseForm = () => {
    const impulses = threatCreator?.threats.find(
      (threat) => threat.threatType === threatKind
    )?.impulses;
    return (
      <Box flex="grow">
        <FormField label="Impulse" name="impulses" width="100%">
          {!!impulses && (
            <Select
              placeholder={`Select impulse for ${decapitalize(threatKind)}`}
              name="impulses"
              options={impulses}
              value={impulse}
              onChange={({ option }) =>
                dispatch({ type: 'SET_IMPULSE', payload: option })
              }
            />
          )}
        </FormField>
      </Box>
    );
  };

  const renderStakesForm = () => (
    <Box flex="grow">
      <FormField label="Stakes" name="stakes" width="100%">
        <TextArea
          placeholder="Edit or type threat stakes"
          name="stakes"
          fill
          size="xlarge"
          value={stakes}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            dispatch({ type: 'SET_STAKES', payload: e.target.value })
          }
          style={{ whiteSpace: 'pre-wrap' }}
        />
      </FormField>
    </Box>
  );

  const renderDescriptionForm = () => (
    <Box flex="grow">
      <FormField label="Description & cast" name="description" width="100%">
        <TextArea
          placeholder="Edit or type threat description"
          name="description"
          fill
          size="xlarge"
          value={description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            dispatch({ type: 'SET_DESC', payload: e.target.value })
          }
          style={{ whiteSpace: 'pre-wrap' }}
        />
      </FormField>
    </Box>
  );

  const renderSpacer = () => (
    <Box fill="horizontal" height="200px" flex="grow" />
  );

  const renderButton = () => (
    <ButtonWS
      primary
      fill="horizontal"
      label={
        addingThreat ? (
          <Spinner fillColor="#FFF" width="100%" height="36px" />
        ) : (
          SET_TEXT
        )
      }
      onClick={() =>
        !addingThreat &&
        !!name &&
        !!threatKind &&
        !!impulse &&
        handleSetThreat()
      }
      disabled={!!addingThreat || !name || !threatKind || !impulse}
    />
  );

  return (
    <DialogWrapper
      background={threatDialogBackground}
      handleClose={handleClose}
    >
      {size !== 'large' ? (
        <Box fill gap="12px" overflow="auto">
          {renderInstructions()}
          {renderTypeForm()}
          {renderNameForm()}
          {renderImpulseForm()}
          {renderDescriptionForm()}
          {renderStakesForm()}
          {renderButton()}
          {renderSpacer()}
        </Box>
      ) : (
        <Box fill direction="row" gap="12px">
          <Box
            style={{ minWidth: '60vw' }}
            direction="row"
            align="center"
            justify="around"
            wrap
          >
            <Box width="25vw">{renderTypeForm()}</Box>
            <Box width="25vw">{renderNameForm()}</Box>
            <Box width="25vw">{renderImpulseForm()}</Box>
            <Box width="25vw">{renderStakesForm()}</Box>
            <Box width="55vw">{renderDescriptionForm()}</Box>
          </Box>
          <Box style={{ minWidth: '30vw' }}>
            {renderInstructions()}
            {renderButton()}
          </Box>
        </Box>
      )}
    </DialogWrapper>
  );
};

export default ThreatDialog;
