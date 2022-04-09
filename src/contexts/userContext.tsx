import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { Action } from '../@types';

interface UserState {
  userId?: string;
  displayName?: string;
  email?: string;
}

const initialState = {};

interface UserContext extends UserState {}

const initialContext = {
  ...initialState,
};

export interface UserProviderProps {
  injectedState?: Partial<UserState>;
}

/* eslint-disable  @typescript-eslint/no-redeclare */
const UserContext = createContext<UserContext>(initialContext);

export const useUser = () => useContext(UserContext);

export const UserConsumer = UserContext.Consumer;

interface SetUserAction extends Action<'SET_USER'> {
  payload: UserState;
}

type Actions = SetUserAction;

const userReducer = (state: UserState, action: Actions): UserState => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const UserProvider: FC<PropsWithChildren<UserProviderProps>> = ({
  children,
  injectedState,
}) => {
  const [state, dispatch] = useReducer(userReducer, {
    ...initialContext,
    ...injectedState,
  });
  const { user } = useAuth0();

  useEffect(() => {
    if (user) {
      const displayName =
        user['https://app.aw-central.com/username'] || user.nickname || '';

      dispatch({
        type: 'SET_USER',
        payload: {
          email: user.email,
          userId: user.sub,
          displayName,
        },
      });
    }
  }, [user]);

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};
