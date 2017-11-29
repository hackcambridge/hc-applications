import React from 'react';
import { Input, Label} from 'reactstrap';

function parseCriterionValue(value) {
  const attemptedInteger = parseInt(value, 10);

  if (isNaN(attemptedInteger)) {
    return null;
  }

  return attemptedInteger;
}

export default function Criterion({ criterion: { id, label, maxValue }, onChange, score }) {
  const elementId = `criterion-${id}`;

  const criterionValues = [];

  for (let value = 0; value <= maxValue; value ++) {
    criterionValues.push(<option value={value} key={value}>{value}</option>);
  }

  return (
    <span key={id} className="d-inline-flex">
      <Label for={elementId}>{label}</Label>{' '}
      <Input type="select" value={score} id={elementId} onChange={(event) => onChange(parseCriterionValue(event.target.value))}>
        <option value={null}></option>
        {criterionValues}
      </Input>
      {' '}
    </span>
  );
}
