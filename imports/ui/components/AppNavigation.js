import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import container from '../../modules/container';
import AppBar from 'material-ui/AppBar';

const AppNavigation = ({ hasUser }) => (
  <AppBar
    title="Harvey Admin"
    showMenuIconButton={false}
  />
);

AppNavigation.propTypes = {
  hasUser: PropTypes.object,
};

export default container((props, onData) => {
  onData(null, { hasUser: Meteor.user() });
}, AppNavigation);
