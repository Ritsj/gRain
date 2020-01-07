import React, { useState, ChangeEvent, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ApplicationState } from '../../redux/store/index'; 
import { actionCreators } from '../../redux/actions/encounterActions';
import { EncounterDTO, Tier, EncounterMonster } from '../../redux/types/encounterTypes';

import { Encounter } from '../presentational/encounter';
import { EncounterContainerProps } from '../types/encounterTypes';

export default function EncounterContainer({
  initialLevel = [],
  initialSelectedLevel = '1',
  initialSelectedDifficulty = 'Easy',
}: EncounterContainerProps) {

/***
 * REDUX - APPLICATION STATE && ACTIONS
 */
  const encounterState = useSelector( (state: ApplicationState) => state.encounter);
  const dispatch = useDispatch();

  const requestEncounterValues = actionCreators.requestEncounterValue;

/*****
 * LOCAL STATE
 */
  const [level, setLevel] = useState(initialLevel);
  const [levelSelect, setLevelSelect] = useState(initialSelectedLevel);
  const [difficultySelect, setDifficultySelect] = useState(initialSelectedDifficulty);


/*****
* EVENT HANDLERS
*/
  const handleAddLevel = (e: MouseEvent<HTMLButtonElement>) => {
    setLevel([...level, Number(levelSelect)]);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case 'levelSelect':
        setLevelSelect(e.target.value)
        break;
      case 'difficultySelect':
        setDifficultySelect(e.target.value)
        break;
    };
  };
  const handleDispatchRequest = (e: MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget);
    if (level.length > 0) {
      const currentLevel = level;
      const currentRequestData: EncounterDTO = {
        level: currentLevel
      }
      if (difficultySelect !== undefined) {
        const currentDifficultyTier: Tier= {name: difficultySelect};
        currentRequestData.difficulty = currentDifficultyTier;
      }
      dispatch(requestEncounterValues(currentRequestData));
    } else {
      console.log('Error Level is not set');
    }
  };

/***
 * SELECTINPUT POPULATION
 */
  const levelOptions: Array<number> = Array.from(new Array(20), (val: any, index: number) => index +1);
  const levelSelection = {
    name: 'level', options: levelOptions
  };

  const difficultyOptions: Array<string> = ['Easy', 'Medium', 'Hard', 'Deadly'];
  const difficultySelection = {
    name: 'difficulty', options: difficultyOptions
  };

  // temp
  const tempBudget = (encounterState: ApplicationState['encounter']) => {
    let tempXpBudgetUsed = 0;
    if (encounterState!.values !== undefined) {
      tempXpBudgetUsed = encounterState!.values!.EncounterXpDeadly.reduce((a: number, b: number) => a + b, 0) /*/ 2*/;
    }
    return tempXpBudgetUsed;
  }
  let xpBudgetUsed = tempBudget(encounterState);

  return (
    <Encounter
      levelSelection={levelSelection}
      difficultySelection={difficultySelection}
      handleAddLevel={handleAddLevel}
      handleChange={handleChange}
      handleDispatchRequest={handleDispatchRequest}
      encounterState={encounterState}
      levelSelect={levelSelect}
      difficultySelect={difficultySelect}
      xpBudgetUsed={xpBudgetUsed}
      />
  );
}


