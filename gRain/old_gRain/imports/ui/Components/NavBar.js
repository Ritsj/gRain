import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
  state = { activeItem: 'Index' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render () {
    const { activeItem } = this.state;
    return (
      <div>
        <Menu pointing>
          <Menu.Item
            as={Link}
            to='/'
            name='Index'
            active={activeItem === 'Index'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to='/admin'
            name='Admin'
            active={activeItem === 'Admin'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to='/charactercreation'
            name='Character Creation'
            active={activeItem === 'Character Creation'}
            onClick={this.handleItemClick}
          />
        </Menu>
      </div>
    );
  }
}
