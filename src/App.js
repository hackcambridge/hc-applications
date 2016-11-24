import React, { Component } from 'react';
import { Container, Jumbotron } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <Container>
        <Jumbotron>
          <h1>Hello World</h1>
        </Jumbotron>
      </Container>
    );
  }
}

export default App;
