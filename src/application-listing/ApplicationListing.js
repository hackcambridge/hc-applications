import React from 'react';
import { Table, Form, FormGroup, Input, Button } from 'reactstrap';

export default function ApplicationListing() {
  return (
    <div>
      <Form>
        <Input type="text" placeholder="Search"/>
        <Button color="primary">Search</Button>
      </Form>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>GB</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>GB</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>FR</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
