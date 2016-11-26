import React from 'react';
import { Link } from 'react-router';
import { Button } from 'reactstrap';

export default function ApplicationListing() {
  return (
    <div>
      Dashboard <br />
      <Button tag={Link} to='/applications'>Applications</Button>
      <Button tag={Link} to='/applications/1234'>Review</Button>
    </div>
  );
}
