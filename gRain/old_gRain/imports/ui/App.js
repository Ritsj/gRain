import React, { Component } from 'react';
import '../../semantic/dist/semantic.css';
import { Container, Header } from 'semantic-ui-react';
import NavBar from './Components/NavBar';

// App component - represents the whole app
export default class App extends Component {
  render () {
    return (
      <Container>
        <Header>
          gRain
          <NavBar />
          <div>
            { this.props.children }
          </div>
        </Header>
      </Container>
    );
  }
}
