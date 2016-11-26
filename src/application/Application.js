import React from 'react';
import { connect } from 'react-redux';

function Application({ id, firstName, lastName }) {
  return <div>Application {id}: {firstName} {lastName} </div>;
}

function mapStateToProps({ application }) {
  return application;
}

export default connect(mapStateToProps)(Application);
