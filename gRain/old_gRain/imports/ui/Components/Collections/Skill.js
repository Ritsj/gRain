import React, { Component } from 'react';
import { Button, Item, Label, Image, Segment, Container } from 'semantic-ui-react';

// import collection
import { deleteSkill } from '../../../api/collections/DnD/skills.js';

export default class Skill extends Component {
  deleteThisSkill () {
    deleteSkill.call(this.props.skill._id);
  }

  render () {
    const path = '/images/ui/_' + this.props.skill.ability_name + '.svg';
    return (
      <Segment.Group horizontal raised >
        <Segment basic>
          <Image spaced='right' size='tiny' src={path} />
        </Segment>
        <Segment basic>
          <Item>
            <Item.Content>
              <Item.Header>{this.props.skill.name}</Item.Header>
              <Container text>
                <Item.Description>{this.props.skill.desc}</Item.Description>
              </Container>
              <Item.Extra>
                <Label content={this.props.skill.ability_name} />
              </Item.Extra>
            </Item.Content>
          </Item>
        </Segment>
        <Segment basic>
          <Button compact
            onClick={this.deleteThisSkill.bind(this)} >
            &times;
          </Button>
        </Segment>
      </Segment.Group>
    );
  }
}
