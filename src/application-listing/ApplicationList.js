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
      country: "",
      institution: "",
      gender: null,
      inTeam: null,
      needsVisaOnly: null,
      showDisqualified: false
    };
  }

  filter(changes) {
    this.setState(changes);
  }

  render () {
    const emailLink = app => app.email != null ? <span> <a href={`mailto:${app.email}`}>✉</a></span> : '';
    // Use `Number(x.toFixed(n))` to avoid trailing zeros
    const ratingWithStdev = app => app.rating != null ? <span>{Number(app.rating.toFixed(2))} ± {Number(app.ratingStdev.toFixed(1))}</span> : '';

    const columns = [
      { title: 'ID', dataIndex: 'id', key: 'id' },
      { title: 'Name', dataIndex: '', key: 'name', render: (_value, app) => (<span>{app.name}{emailLink(app)}</span>) },
      { title: 'Gender', dataIndex: 'gender', key: 'gender' },
      { title: 'Country', dataIndex: 'country', key: 'country' },
      { title: 'Institution', dataIndex: 'institution', key: 'institution' },
      { title: 'In a Team', dataIndex: 'inTeam', key: 'inTeam' },
      { title: 'Visa Needed By', dataIndex: 'visaNeededBy', key: 'visaNeededBy' },
      { title: 'Rating', dataIndex: '', key: 'rating', render: (_value, app) => ratingWithStdev(app) },
      { title: 'Status', dataIndex: 'status', key: 'status' },
    ];

    const filteredApplications = this.props.applications.filter(appl =>
      appl.rating * this.state.ratingComparison >= this.state.ratingCutoff * this.state.ratingComparison &&
        (this.state.country === "" || appl.country.toUpperCase() === this.state.country.toUpperCase()) &&
        (this.state.institution === "" || appl.institution.toLowerCase().indexOf(this.state.institution.toLowerCase()) !== -1) &&
        (this.state.gender === null || this.state.gender === appl.gender) &&
        (this.state.inTeam === null || this.state.inTeam === appl.inTeam) &&
        (this.state.needsVisaOnly === null || this.state.needsVisaOnly === true && appl.visaNeededBy !== null ||
          this.state.needsVisaOnly === false && appl.visaNeededBy === null) &&
        (this.state.showDisqualified || !appl.isDisqualified)
    ).sort((a, b) =>
      b.rating - a.rating || a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );

    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const displayApplications = filteredApplications.map(appl => Object.assign({}, appl, {
      inTeam: appl.inTeam ? "✔" : "✘",
      visaNeededBy: appl.visaNeededBy !== null ? (new Date(appl.visaNeededBy)).toLocaleDateString(undefined, dateOptions) : null
    }));

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
            Country:
            <input id="country-preference" type="text" placeholder="All Countries" onInput={ event => this.filter({ country: event.target.value }) } />
          </label>
          <label>
            Institution:
            <input id="institution-preference" type="text" placeholder="All Institutions" onInput={ event => this.filter({ institution: event.target.value }) } />
          </label>
          <label>
            Gender:
            <select onChange={ event => this.filter({ gender: event.target.value !== "null" ? event.target.value : null }) }>
              <option value="null">Show All</option>
              <option>Male</option>
              <option>Female</option>
              <option>Non-Binary</option>
              <option value="I prefer not to say">Unknown</option>
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
          <label>
            Needs visa:
            <select onChange={ event => this.filter({ needsVisaOnly: event.target.value !== "null" ? event.target.value === "Yes" : null }) }>
              <option value="null">Show All</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </label>
          <label>
            Show disqualified:
            <input type="checkbox" defaultValue={this.state.isDisqualified} onChange={ event => this.filter({ showDisqualified: event.target.value }) } />
          </label>
          <button className="btn btn-sm btn-danger" onClick={ event => event.preventDefault() }>Turn Down All</button>
          <button className="btn btn-sm btn-success" onClick={ event => event.preventDefault() }>Invite All</button>
        </Form>
        <Table className="table" columns={columns} data={displayApplications} emptyText={() => <span className="empty-table">No applications match the current filter</span>} onRowClick={(record, index) => window.location = `applications/${record.id}`} />
      </div>
    );
  }
}

export default ApplicationList;
