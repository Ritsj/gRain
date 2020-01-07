/**********************************************************************************
* MODULE - Encounter
**********************************************************************************/

/***********************************************
* STATE - Defines type of data in Redux store
*/

export interface EncounterDTO {
  level: Array<number>;
  difficulty?: Tier;
  budget?: number;
}

export type Tier = {
  name: string;
  value?: Array<number>;
};

export interface EncounterValue {
  Level: Array<number>;
  EncounterXpEasy: Array<number>;
  EncounterXpMedium: Array<number>;
  EncounterXpHard: Array<number>;
  EncounterXpDeadly: Array<number>;
  XpDay: Array<number>;
}

export interface EncounterMonster {
  _id: string;
  name: string;
  type: string;
  challengeRating: number;
  xp: number;
}

export interface EncounterState {
  isLoadingEncounter: boolean;
  isLoadingMonster: boolean;
  currentRequestData?: EncounterDTO;
  values?: EncounterValue;
  monsters?: EncounterMonster[];
}

/***********************************************
*  ACTIONS - Describes state changes that are going to happen
*/

export const REQUEST_ENCOUNTERVALUE = 'REQUEST_ENCOUNTERVALUE';
export const RECEIVE_ENCOUNTERVALUE = 'RECEIVE_ENCOUNTERVALUE';
export const ERROR_ENCOUNTERVALUE = 'ERROR_ENCOUNTERVALUE';

interface RequestEncounterValue {
  type: typeof REQUEST_ENCOUNTERVALUE;
  currentRequestData: EncounterDTO;
}

interface ReceiveEncounterValue {
  type: typeof RECEIVE_ENCOUNTERVALUE;
  currentRequestData: EncounterDTO;
  values: EncounterValue;
}

interface ErrorEncounterValue {
  type: typeof ERROR_ENCOUNTERVALUE;
  error: string;
}

export const REQUEST_ENCOUNTERMONSTER = 'REQUEST_ENCOUNTERMONSTER';
export const RECEIVE_ENCOUNTERMONSTER = 'RECEIVE_ENCOUNTERMONSTER';
export const ERROR_ENCOUNTERMONSTER = 'ERROR_ENCOUNTERMONSTER';

interface RequestEncounterMonster {
  type: typeof REQUEST_ENCOUNTERMONSTER;
  currentRequestData: EncounterDTO;
}

interface ReceiveEncounterMonster {
  type: typeof RECEIVE_ENCOUNTERMONSTER;
  currentRequestData: EncounterDTO;
  monsters: EncounterMonster[];
}

interface ErrorEncounterMonster {
  type: typeof ERROR_ENCOUNTERMONSTER;
  error: string;
}

/***********************************************
* KNOWN ACTION TYPES - Declare discriminated union type
*/

export type EncounterActionTypes =
RequestEncounterValue |
ReceiveEncounterValue |
ErrorEncounterValue |
RequestEncounterMonster|
ReceiveEncounterMonster|
ErrorEncounterMonster;
