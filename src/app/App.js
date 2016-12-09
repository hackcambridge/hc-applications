import React from 'react';
import { Container } from 'reactstrap';
import { Header } from 'src/header';
import 'bootstrap/dist/css/bootstrap.css';

export default function App({ children }) {
  return (
    <div>
      <Header/>
      { children }
    </div>
  )
}
