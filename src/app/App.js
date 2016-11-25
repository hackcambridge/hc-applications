import React from 'react';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

export default function App({ children }) {
  return (
    <Container>
      { children }
    </Container>
  )
}
