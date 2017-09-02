import _ from 'lodash';
import moment from 'moment'
import React from 'react';
import {
  Table,
  tbody,
  thead,
  th,
  tr,
  td,
} from 'material-ui/Table';

/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */
export class PlacesTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = { start: 0, limit: 20 };
  }

  render() {
    const { places, fields } = this.props;
    const { start, limit } = this.state;

    const headerColumns = _.map(fields, (field, f) => <th key={f}>{_.capitalize(field.replace('_', ' '))}</th>)
    const bodyRows = _.map(_.slice(places, start, limit), (place, p) => (
      <tr key={p}>
      {_.map(fields, (field, f) => <td key={f}>{field === 'updated_at' ? moment(place[field]).fromNow() : place[field]}</td>)}
      </tr>
    ));

    return (
      <div className="table-wrapper">
      <table className="table table-responsive">
        <thead>
          <tr>{headerColumns}</tr>
        </thead>
        <tbody>{bodyRows}</tbody>
      </table>
      </div>
    );
  }
}
