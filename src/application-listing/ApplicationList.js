import React from 'react';
import { Form } from 'reactstrap';
import Table from 'rc-table';
import './application-listing.css';

class ApplicationList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      ratingCutoff: 0,
      ratingComparison: 1,
      gender: null,
      inTeam: null,
    };
  }

  filter(changes) {
    this.setState(changes);
  }

  render () {
    const columns = [
      { title: 'ID', dataIndex: 'id', key: 'id' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Gender', dataIndex: 'gender', key: 'gender' },
      { title: 'Country', dataIndex: 'country', key: 'country' },
      { title: 'In a Team', dataIndex: 'inTeam', key: 'inTeam' },
      { title: 'Rating', dataIndex: 'rating', key: 'rating' },
      { title: 'Status', dataIndex: 'status', key: 'status' },
    ];

    const filteredApplications = this.props.applications.filter(appl => {
      return appl.rating * this.state.ratingComparison >= this.state.ratingCutoff * this.state.ratingComparison &&
        (this.state.gender === null || this.state.gender === appl.gender) &&
        (this.state.inTeam === null || this.state.inTeam === appl.inTeam)
      ;
    }).sort((a, b) => {
      return b.rating - a.rating || a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });

    const displayApplications = filteredApplications.map(appl => Object.assign({}, appl, { inTeam: appl.inTeam ? "✔" : "✘" }));

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
          <label>
            Gender:
            <select onChange={ event => this.filter({ gender: event.target.value !== "null" ? event.target.value : null }) }>
              <option value="null">Both</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </label>
          <label>
            In a team:
            <select onChange={ event => this.filter({ inTeam: event.target.value !== "null" ? event.target.value === "Yes" : null }) }>
              <option value="null">Either</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </label>
        </Form>
        <Table className="table" columns={columns} data={displayApplications} emptyText={() => <span className="empty-table">No applications match the current filter</span>} onRowClick={(record, index) => window.location = `applications/${record.id}`} />
      </div>
    );
  }
}

export default ApplicationList;
