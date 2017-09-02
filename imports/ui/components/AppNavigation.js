import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import PublicNavigation from './PublicNavigation.js';
import AuthenticatedNavigation from './AuthenticatedNavigation.js';
import container from '../../modules/container';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const renderNavigation = hasUser => (hasUser ? <AuthenticatedNavigation /> : <FlatButton href="/add" label="Add" />);

const AppNavigation = ({ hasUser }) => (
  <AppBar
    title="Harvey Relief & Recovery"
    showMenuIconButton={false}
    iconElementRight={renderNavigation(hasUser)}
  />
);

AppNavigation.propTypes = {
  hasUser: PropTypes.object,
};

export default container((props, onData) => {
  onData(null, { hasUser: Meteor.user() });
}, AppNavigation);
