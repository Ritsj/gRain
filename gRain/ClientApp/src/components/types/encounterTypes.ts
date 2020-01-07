import { MouseEvent, ChangeEvent } from 'react';
import { ApplicationState } from '../../redux/store/index';

export interface EncounterContainerProps {
  initialLevel?: Array<number>;
  initialSelectedLevel?: string;
  initialSelectedDifficulty?: string;
}

export interface EncounterProps {
  levelSelection: selection;
  difficultySelection: selection;
  handleAddLevel: OnClick;
  handleChange: onChange;
  handleDispatchRequest: OnClick;
  encounterState: ApplicationState['encounter'];
  levelSelect: string;
  difficultySelect: string;
  xpBudgetUsed: number;
}

export type encounterState = ApplicationState['encounter'];

export type selection = {
  name: string;
  options: Array<number | string>;
}

export type OnClick = ((e: MouseEvent<HTMLButtonElement>) => void);
export type onChange = ((e: ChangeEvent<HTMLInputElement>) => void);
