import React, { Component } from 'react';
import { Grid, Item, Image, Label, Segment, Container, GridColumn } from 'semantic-ui-react';

// import collection
import { deleteAbility } from '../../../api/collections/DnD/abilities.js';

export default class Class extends Component {
  deleteThisAbility () {
    deleteAbility.call(this.props.ability._id);
  }

  render () {
    // const path = '/images/ui/_' + this.props.ability.name + '.svg';
    return (
      <Segment >
        {this.props.class.name}
      </Segment>
    );
  }
}
