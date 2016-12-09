import React from 'react';
import { Link } from 'react-router';
import './header.css';

export default function Header() {
  return (
    <header>
      <Link to='/'>Hack Cambridge - <em>Review System</em></Link>
    </header>
  );
}
