import React, { Component } from 'react';
import { Segment, Container, Form, Card, Header, Button, Label } from 'semantic-ui-react';

// import collection
import { AbilityCard } from '../Components/Collections/Ability';
import Race from '../Components/Collections/Race';

// import functions
import { statRoller } from '../Components/Functions/DiceRoller';

export default class Character extends Component {
  constructor (props) {
    super(props);

    this.state = {
      statMethodSel: null,
      assignMethodSel: null,
      selectedAbility: null,
      chname: '',
      level: '',
      race: null,
      subRace: null,
      chClass: '',
      subClass: null,
      gender: '',
      alignmentSel: '',
      subClassOptions: [
        {
          _id: 'x',
          value: null,
          text: 'Class not choosen'
        }
      ],
      subRaceOptions: [
        {
          _id: 'x',
          value: null,
          text: 'Race not choosen'
        }
      ],
      dice: [
        { _id: '0', value: '', used: 'f' },
        { _id: '1', value: '', used: 'f' },
        { _id: '2', value: '', used: 'f' },
        { _id: '3', value: '', used: 'f' },
        { _id: '4', value: '', used: 'f' },
        { _id: '5', value: '', used: 'f' }
      ],
      assignedStats: [
        { _id: 'STR', value: null },
        { _id: 'DEX', value: null },
        { _id: 'CON', value: null },
        { _id: 'INT', value: null },
        { _id: 'WIS', value: null },
        { _id: 'CHA', value: null }
      ]
    };
    this.handleChange = this.handleChange.bind(this);
    this.rollDice = this.rollDice.bind(this);
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }
  // handle changes to SubClass/SubRace
  handleDependentChanges = (e, { name, value }) => {
    let props;
    switch (name) {
      case 'chClass':
        props = this.props.subClasses;
        break;
      case 'race':
        props = this.props.subRaces;
        break;
    }
    this.setState({ [name]: value },
      this.setState(setSubOptions(name, props, value)));
  }
  // this.setState(ifRaceSetStats(this.props.races, race, this.props.subRaces, subRace));

  handleAbilitySelection = (e) => {
    this.setState({ selectedAbility: e.currentTarget.name });
    console.log(e.currentTarget.name);
  }

  /* handleDieSelection = (e) => {
    this.setState({ selectedDie: e.currentTarget.getAttribute('name') });
  } */

  rollDice = e => {
    const { statMethodSel, dice, assignedStats } = this.state;
    // check if methods for rolling/assigning are set.
    if (statMethodSel !== null) {
      const newDice = statRoller(statMethodSel);
      this.setState(setDice(newDice, dice),
        this.setState(setStats(initialStats, assignedStats)));
    } else {
      console.log('Please select methods to roll');
    }
  }
  assignStats = async (e) => {
    const { dice, assignedStats, assignMethodSel } = this.state;
    const tempStats = copyObjArr(assignedStats);
    const tempDice = copyObjArr(dice);
    const pick = setPick(assignMethodSel);

    const abilitySelection = () => {
      return new Promise(resolve => {
        const { selectedAbility } = this.state;
        if (selectedAbility !== null) {
          console.log(selectedAbility);
          resolve(selectedAbility);
        } else {
          console.log('Ability not selected');
          setTimeout(abilitySelection, 2000);
        }
      });
    };
    let x = 0;
    while (x < pick) {
      let selection = abilitySelection();
      selection.then(result => console.log(result));
      x++;
    }
    const newObjects = updateRemaining(tempStats, tempDice);
    this.setState(setStats(newObjects[0], assignedStats),
      this.setState(setUsed(newObjects[1], dice)));
  }

  renderRace () {
    const { race, subRace } = this.state;
    if (race !== null) {
      const raceObject = this.props.races.find(item => item.name === race);
      return (
        <Race race={raceObject} />
      );
    }
  }

  renderAbilityCards () {
    const { assignedStats, selectedAbility } = this.state;
    return this.props.abilities.map((ability) => (
      <AbilityCard
        key={ability._id}
        ability={ability}
        isSelected={ability.name === selectedAbility}
        onClickCapture={this.handleAbilitySelection}
        value={assignedStats.find(item => {
          return item._id === ability.name;
        })}
      />
    ));
  }

  renderDice () {
    return this.state.dice.map((die) => (
      <StatDieRenderer
        key={die._id}
        die={die}
        value={die.value}
      />
    ));
  }

  render () {
    const { chname, level, race, chClass, gender, alignmentSel, statMethodSel, assignMethodSel, subClassOptions, subClass, subRaceOptions, subRace } = this.state;
    return (
      <Container textAlign='center'>
        <Segment>
          <h1>Character creation</h1>
          <Form widths='equal'>
            <Form.Group>
              <Form.Input
                fluid
                label='Name'
                placeholder='Character Name'
                name='chname'
                value={chname}
                onChange={this.handleChange}
              />
              <Form.Dropdown
                label='Gender'
                placeholder='Select a Gender'
                selection
                options={genderOptions}
                name='gender'
                value={gender}
                onChange={this.handleChange}
              />
              <Form.Dropdown
                label='Alignment'
                placeholder='Select an Alignment'
                selection
                options={this.props.alignmentOptions}
                onChange={this.handleChange}
                name='alignmentSel'
                value={alignmentSel}
              />
              <Form.Dropdown
                selection
                label='Level'
                options={levelOptions}
                onChange={this.handleChange}
                name='level'
                value={level}
              />
            </Form.Group>
            <Form.Dropdown
              label='Race'
              placeholder='Select a Race'
              selection
              options={this.props.raceOptions}
              onChange={this.handleDependentChanges}
              name='race'
              value={race}
            />
            {this.renderRace()}
            <Form.Group>
              <Form.Dropdown
                label='SubRace'
                placeholder='Select a Subrace'
                selection
                options={subRaceOptions}
                onChange={this.handleChange}
                name='subRace'
                value={subRace}
              />
            </Form.Group>
            <Form.Group>
              <Form.Dropdown
                label='Class'
                placeholder='Select a Class'
                selection
                options={this.props.classOptions}
                onChange={this.handleDependentChanges}
                name='chClass'
                value={chClass}
              />
              <Form.Dropdown
                label='SubClass'
                placeholder='Select a SubClass'
                selection
                options={subClassOptions}
                onChange={this.handleChange}
                name='subClass'
                value={subClass}
              />
            </Form.Group>
            <Header as='h2' content='Ability Scores' />
            <Form.Group>
              <Form.Dropdown
                placeholder='Select Method'
                selection
                options={statMethod}
                onChange={this.handleChange}
                name='statMethodSel'
                value={statMethodSel}
              />
              <Form.Dropdown
                placeholder='Select a method to apply your ability scores'
                selection
                options={assignMethod}
                onChange={this.handleChange}
                name='assignMethodSel'
                value={assignMethodSel}
              />
            </Form.Group>
            <Segment.Group horizontal>
              <Segment>
                <Button
                  type='button'
                  content='Roll'
                  compact
                  onClick={this.rollDice}
                />
              </Segment>
              <Segment>
                {this.renderDice()}
              </Segment>
              <Segment>
                <Button
                  type='button'
                  content='Assign'
                  compact
                  onClick={this.assignStats}
                />
              </Segment>
            </Segment.Group>
            <Card.Group itemsPerRow='6'>
              {this.renderAbilityCards()}
            </Card.Group>
          </Form>
        </Segment>
      </Container>
    );
  }
}

// global variables
const PopulateLevels = Array.from(new Array(20), (val, index) => index + 1);
const levelOptions = PopulateLevels.map(val => {
  return (
    {
      key: val,
      text: val,
      value: val
    }
  );
});

const statMethod = [
  {
    key: '6d20',
    value: '6d20',
    text: "Roll 6 d20's"
  },
  {
    key: '4drop1',
    value: '4drop1',
    text: 'Roll 6*4d6 drop lowest'
  }
];

const genderOptions = [
  {
    key: 'f',
    value: 'f',
    text: 'Female'
  },
  {
    key: 'm',
    value: 'm',
    text: 'Male'
  },
  {
    key: 'o',
    value: 'o',
    text: 'Other'
  }
];

const assignMethod = [
  {
    key: 'allFree',
    value: 'allFree',
    text: 'Assign as you please'
  },
  {
    key: 'first3',
    value: 'first3',
    text: 'First three freely, remaining in order'
  },
  {
    key: 'allOrder',
    value: 'allOrder',
    text: 'Assign all in the order the were rolled'
  }
];

const initialStats = [
  { _id: 'STR', value: null },
  { _id: 'DEX', value: null },
  { _id: 'CON', value: null },
  { _id: 'INT', value: null },
  { _id: 'WIS', value: null },
  { _id: 'CHA', value: null }
];

// component
const StatDieRenderer = ({
  value, die
}) =>
  <Label
    circular
    name={die._id}
    content={value}
    size='big'
  />;

// functions
const setDice = (diceRes, dice) => {
  const newDice = dice.map((die, index) => {
    die.value = diceRes[index];
    die.used = 'f';
  });
  return newDice;
};

const setStats = (newAssigned, assigned) => {
  const newObject = assigned.map((stat, index) => {
    stat.value = newAssigned[index].value;
  });
  return newObject;
};

const setUsed = (newDice, dice) => {
  const newObject = dice.map((die, index) => {
    die.used = newDice[index].used;
  });
  return newObject;
};

/* set racialStats
 *  if SubRace has been chosen, apply those.
 */
const setRacial = (array, target, racialStats) => {
  const newRacialStats = copyObjArr(racialStats);
  const race = array.filter(item => item.name === target);
  const bonus = race[0].ability_bonuses;
  console.log(race);
  newRacialStats.map((item, i) => {
    item.value = item.value + bonus[i];
  });
  const newObject = { racialStats: newRacialStats };
  return newObject;
};

// populate subOptions depending on race/class
const setSubOptions = (target, props, value) => {
  let type;
  let filter;
  switch (target) {
    case 'chClass':
      type = 'subClassOptions';
      filter = item => item.class === value;
      break;
    case 'race':
      type = 'subRaceOptions';
      filter = item => item.race.name === value;
      break;
  }

  const newSubOptions = props
    .filter(filter)
    .map(item => {
      return (
        {
          key: item._id,
          value: item.name,
          text: item.name
        }
      );
    });
  if (!Array.isArray(newSubOptions) || !newSubOptions.length) {
    newSubOptions.push({ key: 'x', value: null, text: 'No Options' });
  }
  const newObject = { [type]: newSubOptions };
  return newObject;
};

// Functions for assignment

const copyObjArr = (arr) => {
  const newArr = [];
  arr.map((obj, i) => {
    newArr[i] = {};
    for (const prop in arr[i]) {
      newArr[i][prop] = arr[i][prop];
    }
  });
  return newArr;
};

const setPick = (method) => {
  let pick;
  switch (method) {
    case 'allFree':
      pick = 6;
      break;
    case 'first3':
      pick = 3;
      break;
    case 'allOrder':
      pick = 0;
      break;
  }
  return pick;
};

const updateRemaining = (stats, dice) => {
  // find first stat with value = null, assign value of first die with used = f
  stats.map(ability => {
    if (ability.value === null) {
      const unusedDie = dice.find(die => die.used === 'f');
      ability.value = unusedDie.value;
      unusedDie.used = 't';
    }
  });

  const results = [stats, dice];
  return results;
};
