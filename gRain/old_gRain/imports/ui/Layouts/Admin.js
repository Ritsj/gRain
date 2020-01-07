import React, { Component } from 'react';
import { Segment, Button, Container, Accordion, Icon } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

// collections & related components
import { Skills } from '../../api/collections/DnD/skills.js';
import Skill from '../Components/Collections/Skill.js';
import { Abilities } from '../../api/collections/DnD/abilities.js';
import Ability from '../Components/Collections/Ability.js';
import { Classes } from '../../api/collections/DnD/classes.js';
import Class from '../Components/Collections/Class.js';
import { Subclasses } from '../../api/collections/DnD/subclasses.js';
// import Subclass from '../Components/Collections/Subclass.js';
import { Languages } from '../../api/collections/DnD/languages';
// import Language from '../Components/Collections/Language.js';
import { Proficiencies } from '../../api/collections/DnD/proficiencies';
// import Proficiency from '../Components/Collections/Proficiency.js';

// API requests
import { getDnd } from '../../api/http/getDnd.js';

class Admin extends Component {
  constructor (props) {
    super(props);

    this.state = {
      activeIndex: -1
    };
  }

  get = e => {
    getDnd.call({}, (err, res) => {
      if (err) {
        console.log('Error: ' + err);
      } else if (res) {
        console.log('Success: ');
        console.log(res);
      }
    });
  }

  renderSkills () {
    return this.props.skills.map((skill) => (
      <Skill key={skill._id} skill={skill} />
    ));
  }

  renderAbilities () {
    return this.props.abilities.map((ability) => (
      <Ability key={ability._id} ability={ability} />
    ));
  }

  renderClasses () {
    return this.props.classes.map((_class) => (
      <Class key={_class._id} class={_class} />
    ));
  }

  /* // functions to handle changes in UI
  handleChange = (e, { name, value }) => this.setState({ [name]: value }); */

  handleAccordion = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render () {
    const { activeIndex } = this.state;
    return (
      <Container>
        <Segment>
          <Button fluid type='button' onClick={this.get} content='Refresh Collection' />
        </Segment>
        <Segment>
          <h2>Databases:</h2>
          <Accordion >
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={this.handleAccordion}>
              <Icon name='dropdown' />
              Skills
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              {this.renderSkills()}
            </Accordion.Content>

            <Accordion.Title
              active={activeIndex === 1}
              index={1}
              onClick={this.handleAccordion}>
              <Icon name='dropdown' />
              Abilities
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 1} >
              {this.renderAbilities()}
            </Accordion.Content>

            <Accordion.Title
              active={activeIndex === 2}
              index={2}
              onClick={this.handleAccordion}>
              <Icon name='dropdown' />
              Classes
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 2} >
              {this.renderClasses()}
            </Accordion.Content>
          </Accordion>
        </Segment>
      </Container>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('skills');
  Meteor.subscribe('abilities');
  Meteor.subscribe('classes');
  /* Meteor.subscribe('subclasses');
  Meteor.subscribe('languages');
  Meteor.subscribe('proficiencies'); */
  return {
    skills: Skills.find({}).fetch(),
    abilities: Abilities.find({}).fetch(),
    classes: Classes.find({}).fetch(),
    /* subclasses: Subclasses.find({}).fetch(),
    languages: Languages.find({}).fetch(),
    proficiencies: Proficiencies.find({}).fetch() */
  };
})(Admin);

// global variables
