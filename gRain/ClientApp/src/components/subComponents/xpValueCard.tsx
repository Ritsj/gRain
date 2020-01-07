import React from 'react';
import { encounterState } from '../types/encounterTypes';

import { 
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Badge,
  Spinner,
  Progress,
  Row,
  Col,
  Container
} from 'reactstrap';

function isLoading (state: encounterState) {
  return state !== undefined && state.isLoadingEncounter;
}

const CenterSpinner = () => {
  return (
    <div className='justify-content-center'>
      <Spinner color='primary'/>
    </div>
  )
}


function hasValues (state: encounterState) {
  return state !== undefined && state.values !== undefined;
}

function PlayerLevelBadge ({ applicationState }: XpValueCardProps): JSX.Element | null {
  if (hasValues(applicationState)) {
    const level = applicationState!.values!.Level;
    const renderBadge = level.map((player, index) => {
      return (
        <Badge className='ml-1' key={index} color='info'>{player}</Badge>
      )
    });
    return (
      <Container className='d-inline border text-left'>
        <Row className='ml-1'>
          <h5>
            Players:
              {renderBadge}
          </h5>
        </Row>
      </Container>
    );
  } else {
    return <></>;
  }
}

function DifficultyBar ({ applicationState, xpBudgetUsed } : XpValueCardProps ): JSX.Element | null {
  if (hasValues(applicationState) && xpBudgetUsed !== undefined) {

    const arraySum = (array: Array<number>) => array.reduce((a: number, b: number) => a + b, 0);

    // adds individual scores from playerLvl to combined PartyXpTotals
    // meter total value is deadlyTotal and easyTotal
    const meterTotal = (arraySum(applicationState!.values!.EncounterXpEasy) / 2) + arraySum(applicationState!.values!.EncounterXpDeadly);

    const total: Array<number> = [
      arraySum(applicationState!.values!.EncounterXpEasy),
      arraySum(applicationState!.values!.EncounterXpMedium),
      arraySum(applicationState!.values!.EncounterXpHard),
      arraySum(applicationState!.values!.EncounterXpDeadly),
      meterTotal
    ];

    const percent = meterTotal / 100;
    const budgetPercent = xpBudgetUsed / percent;

    const barPercentage: Array<number> = [
      total[0] / percent,
      total[1] / percent,
      total[2] / percent,
      total[3] / percent,
      total[4] / percent
    ]

    const setBarValues = (barPercentage: Array<number>, budgetPercent: number) => {
      const result = [0,0,0,0,0]

      for (var x = 0; x < barPercentage.length ; x++) {
        //if budget is above threshhold, set max lvl for that bar
        if (budgetPercent >= barPercentage[x]) {
          if (x !== 0) {
            result[x] = barPercentage[x] - barPercentage[x-1]
            } else {
              result[x] = barPercentage[x]
            }
          }
        //if budget is higher than previous value, but lower then current, set value to difference
        if (budgetPercent > barPercentage[x-1] && budgetPercent < barPercentage[x]) {
            result[x] = budgetPercent - barPercentage[x-1];
          }
      }
      console.log(result);
      return result;
    }

    const barValues: Array<number> = setBarValues(barPercentage, budgetPercent);

    return (
      <>
        
        <Progress multi>
        <Progress bar value={barValues[0]}  >Up to Easy</Progress>
        <Progress bar value={barValues[1]} color='success'>Easy to Medium</Progress>
        <Progress bar value={barValues[2]} color='warning'>Medium to Hard</Progress>
        <Progress bar value={barValues[3]} color='danger'>Hard to Deadly</Progress>
        <Progress bar value={barValues[4]} >Above deadly</Progress>
        </Progress>
      </>
    );
  } else {
    return <></>;
  }
}

interface XpValueCardProps {
applicationState?: encounterState,
xpBudgetUsed?: number
}

export function XpValueCard ({applicationState, xpBudgetUsed}: XpValueCardProps): JSX.Element {
  if (applicationState !== undefined) {
    return (
      <>
      <Card body className='text-center'>
        <CardTitle><h3>Xp Values</h3></CardTitle>
        {isLoading(applicationState)?< CenterSpinner />: null }
        <PlayerLevelBadge applicationState={applicationState} />
        <DifficultyBar applicationState={applicationState} xpBudgetUsed={xpBudgetUsed}/>
      </Card>
      </>
    )
  } else {
    return <></>;
  }
}