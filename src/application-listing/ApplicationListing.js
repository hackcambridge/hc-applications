import React from 'react';
import { Form } from 'reactstrap';
import Table from 'rc-table';
import './application-listing.css';

class ApplicationList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      ratingCutoff: 0,
      ratingComparison: 1
    };
  }

  filter(changes) {
    this.setState(changes);
  }

  render () {
    const columns = [
      { title: 'First Name', dataIndex: 'firstName', key:'firstName' },
      { title: 'Last Name', dataIndex: 'lastName', key:'lastName' },
      { title: 'Country', dataIndex: 'country', key:'country' },
      { title: 'Rating', dataIndex: 'rating', key:'rating' },
    ];

    const applications = [
      { firstName: "Mark", lastName: "Otto", country: "GB", rating: 5 },
      { firstName: "Jacob", lastName: "Thornton", country: "GB", rating: 3.5 },
      { firstName: "Larry", lastName: "Bird", country: "FR", rating: 4 },
    ];

    const filteredApplications = applications.filter(appl => {
      return appl.rating * this.state.ratingComparison >= this.state.ratingCutoff * this.state.ratingComparison;
    }).sort((a, b) => {
      return b.rating - a.rating || a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase()) || a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase());
    });

    return (
      <div>
        <Form>
          <b>Filter</b>
          <br />
          <label>
            Rating
            <select onChange={ event => this.filter({ ratingComparison: event.target.value === "≥" ? 1 : -1 }) }>
              <option>≥</option>
              <option>≤</option>
            </select>
            <input id="rating-cutoff" type="number" min="0" max="10" defaultValue={this.state.ratingCutoff} onInput={ event => this.filter({ ratingCutoff: event.target.value }) } />
          </label>
        </Form>
        <Table className="table" columns={columns} data={filteredApplications} emptyText={() => <span className="empty-table">No applications match the current filter</span>} />
      </div>
    );
  }
}

export default ApplicationList;
