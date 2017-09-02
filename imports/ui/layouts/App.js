import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap';
import AppNavigation from '../components/AppNavigation';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = ({ children }) => (
  <MuiThemeProvider>
  <div>
    <AppNavigation />
    <Grid>
      { children }
    </Grid>
  </div>
  </MuiThemeProvider>
);

App.propTypes = {
  children: PropTypes.node,
};

export default App;
