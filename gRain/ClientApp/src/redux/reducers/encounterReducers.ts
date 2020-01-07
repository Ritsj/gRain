import {
  EncounterState,
  EncounterActionTypes
} from '../types/encounterTypes';
import { Action, Reducer } from 'redux';
/***********************************************
 * Initial State
*/

/***********************************************
* REDUCER - For given state and action, returns new state, but does not mutate old
*/

const initialState: EncounterState = {
  isLoadingEncounter: false,
  isLoadingMonster: false,
  values: undefined,
  currentRequestData: undefined,
  monsters: undefined
};

export const encounterReducer: Reducer<EncounterState> = (state: EncounterState | undefined, incomingAction: Action): EncounterState => {
  if (state === undefined) {
    return initialState;
  }

  const action = incomingAction as EncounterActionTypes;
  switch (action.type) {
    case 'REQUEST_ENCOUNTERVALUE':
      return {
        ...state,
        currentRequestData: action.currentRequestData,
        isLoadingEncounter: true
      };
    case 'RECEIVE_ENCOUNTERVALUE':
      if (action.currentRequestData === state.currentRequestData) {
        return {
          ...state,
          values: action.values,
          isLoadingEncounter: false
        };
      }
      break;
    case 'REQUEST_ENCOUNTERMONSTER':
      return {
        ...state,
        currentRequestData: action.currentRequestData,
        isLoadingMonster: true
      };
    case 'RECEIVE_ENCOUNTERMONSTER':
      if (action.currentRequestData === state.currentRequestData) {
        return {
          ...state,
          monsters: action.monsters,
          isLoadingMonster: false
        };
      }
      break;
  }
  return state;
};
