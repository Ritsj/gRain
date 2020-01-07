import React, { FC } from 'react';
import { InputSelect, ClickButton } from '../global/global';
import { XpValueCard } from '../subComponents/xpValueCard';

import { EncounterProps } from '../types/encounterTypes';

import { 
  Form,

} from 'reactstrap';

export const Encounter: FC<EncounterProps> = ({ 
  levelSelection,
  difficultySelection,
  handleAddLevel,
  handleChange,
  handleDispatchRequest,
  encounterState,
  levelSelect,
  difficultySelect,
  xpBudgetUsed
}: EncounterProps ) =>  {
  return (
    <>
      <Form>
        <InputSelect 
          name={levelSelection.name}
          options={levelSelection.options}
          onChange={handleChange}
          value={levelSelect}
          children={<ClickButton name='addLevel' onClick={handleAddLevel} label='Add'/>}
        />
        <InputSelect 
          name={difficultySelection.name}
          options={difficultySelection.options}
          onChange={handleChange}
          value={difficultySelect}
        />
        <ClickButton name='encounterValues' onClick={handleDispatchRequest} label='Send Request'/>
      </Form>
      {JSON.stringify(encounterState)}
      <XpValueCard applicationState={encounterState} xpBudgetUsed={xpBudgetUsed}/>
     
    </>
  );
}

