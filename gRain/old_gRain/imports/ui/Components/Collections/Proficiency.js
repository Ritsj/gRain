import React, { Component } from 'react';
import { Button, Item, Image, Label, Segment, Container } from 'semantic-ui-react';

// import collection
import { deleteAbility } from '../../../api/collections/DnD/abilities.js';

export default class Ability extends Component {
  deleteThisAbility () {
    deleteAbility.call(this.props.ability._id);
  }

  render () {
    // Check gives different classname, use for CSS, probably remove
    const path = '/images/ui/_' + this.props.ability.name + '.svg';
    return (
      <Segment.Group horizontal raised >
        <Segment basic>
          <Image spaced='right' size='tiny' src={path} />
        </Segment>
        <Segment basic>
          <Item>
            <Item.Content>
              <Item.Header>{this.props.ability.full_name}</Item.Header>
              <Container text>
                <Item.Description>{this.props.ability.desc}</Item.Description>
              </Container>
              <Item.Extra>
                {this.props.ability.skills.map(item => (
                  <Label key={item} content={item} />
                ))}
              </Item.Extra>
            </Item.Content>
          </Item>
        </Segment>
        <Segment basic>
          <Button compact
            onClick={this.deleteThisAbility.bind(this)} >
            &times;
          </Button>
        </Segment>
      </Segment.Group>
    );
  }
}
