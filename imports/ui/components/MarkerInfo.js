import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Chip from 'material-ui/Chip';
import CommunicationCall from 'material-ui/svg-icons/communication/call';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

export const MarkerInfo = props => {
  const {
    type,
    updatedBy,
    updatedAt,
    name,
    description,
    address,
    city,
    county,
    lng,
    lat,
    contact_name,
    contact_number,
    accepting_refugees,
    accepting_pets,
    accepting_volunteers,
    volunteer_needs,
    accepting_supplies,
    supply_needs,
  } = props;

  return (
    <div>
      <List>
        <Subheader>{name}</Subheader>
        <ListItem primaryText={address} />
        <ListItem
          leftIcon={<CommunicationCall />}
          primaryText={contact_name ? contact_name : contact_number}
        />
      </List>
      <div style={styles.wrapper}>
      {accepting_refugees ? <Chip style={styles.chip}>Accepting Refugees</Chip> : null}
      {accepting_pets ? <Chip style={styles.chip}>Accepting Pets</Chip> : null}
      </div>
      <Divider />
      {accepting_volunteers ? <Subheader>Volunteers Needed</Subheader> : null}
      <div style={styles.wrapper}>
      {_.map(volunteer_needs, (need, i) => (<Chip key={i} style={styles.chip}>{need}</Chip>))}
      </div>
      {accepting_supplies ? <Subheader>Supplies Needed</Subheader> : null}
      <div style={styles.wrapper}>
      {_.map(supply_needs, (need, i) => (<Chip key={i} style={styles.chip}>{need}</Chip>))}
      </div>
    </div>
  )
}
