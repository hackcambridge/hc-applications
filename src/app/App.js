import React from 'react';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

export default function App({ children }) {
  return (
    <div>
      <header>
          Hack Cambridge - <em>Review System</em>
        </header>
      <Container>
        { children }
      </Container>
    </div>
  )
}
