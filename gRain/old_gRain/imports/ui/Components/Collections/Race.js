import React, { Component } from 'react';
import { Segment, Image, Item, Grid } from 'semantic-ui-react';

export default class Race extends Component {
  render () {
    const path = '/images/ui/' + this.props.race.name + '.svg';
    return (
      <Segment.Group horizontal as={Grid} >
        <Grid.Row columns='3'>
          <Grid.Column floated='left'>
            <Image spaced='right' size='tiny' src={path} />
          </Grid.Column>
          <Grid.Column>
            {this.props.race.name}
          </Grid.Column>
        </Grid.Row>
      </Segment.Group>
    );
  }
}
