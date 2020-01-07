import { AppThunkAction } from '../store/index';
import {
  EncounterDTO,
  EncounterMonster,
  EncounterActionTypes,
  EncounterValue
} from '../types/encounterTypes';

/***********************************************
 * FUNCTIONS
 */

// should be written generically
const constructParam = (currentRequestData: EncounterDTO): string => {
  let tempParam = '?';
  let i = 0;
  // function to concat parameters from payload
  // add level=value, if there are more values, add '&' + value
  do {
    tempParam = tempParam.concat('level=' + currentRequestData.level[i]);

    if (i < currentRequestData.level.length - 1) {
      tempParam = tempParam.concat('&');
    }
    i++;
  } while (i < currentRequestData.level.length);

  // add difficulty if present
  if (currentRequestData.difficulty !== undefined) {
    tempParam = tempParam.concat('&difficulty=' + currentRequestData.difficulty.name);
  }
  if (currentRequestData.budget !== undefined) {
    tempParam = tempParam.concat('&budget=' + currentRequestData.budget);
  }

  return tempParam;
};

/***********************************************
* ACTION CREATORS - Functions exposed to UI that triggers state change
*/

export const actionCreators = {
  requestEncounterValue: (currentRequestData: EncounterDTO): AppThunkAction<EncounterActionTypes> => (dispatch, getState): void => {
    // Only load data if it is not in store or loading
    const appState = getState();
    // update with .env path
    const baseUrl = 'https://localhost:5001/api/encounter';
    // call function to create parameters
    const param = constructParam(currentRequestData);

    if (appState && appState.encounter && currentRequestData !== appState.encounter.currentRequestData) {
      fetch(baseUrl + param)
        .then(response => response.json() as Promise<EncounterValue>)
        .then(data => {
          dispatch({ type: 'RECEIVE_ENCOUNTERVALUE', currentRequestData: currentRequestData, values: data });
        });

      dispatch({ type: 'REQUEST_ENCOUNTERVALUE', currentRequestData: currentRequestData });
    }
  },
  requestEncounterMonster: (currentRequestData: EncounterDTO): AppThunkAction<EncounterActionTypes> => (dispatch, getState): void => {
    // Only load data if it is not in store or loading
    const appState = getState();
    // update with .env path
    const baseUrl = 'https://localhost:5001/api/encounter';
    // call function to create parameters
    const param = constructParam(currentRequestData);

    if (appState && appState.encounter && currentRequestData !== appState.encounter.currentRequestData) {
      fetch(baseUrl + param)
        .then(response => response.json() as Promise<EncounterMonster[]>)
        .then(data => {
          dispatch({ type: 'RECEIVE_ENCOUNTERMONSTER', currentRequestData: currentRequestData, monsters: data });
        });

      dispatch({ type: 'REQUEST_ENCOUNTERMONSTER', currentRequestData: currentRequestData });
    }
  }
};
