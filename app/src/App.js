import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, makeStyles } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import CssBaseline from '@material-ui/core/CssBaseline';

import SideBar from './components/SideBar';
import Header from './components/Header';

import Home from './pages/Home';
import Login from './pages/Login';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#FF5722',
      dark: '#d50000',
      contrastText: '#fff',
    },
  },
});

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));

function App({
  user,
}) {
  const classes = useStyles();

  const [sideBarOpen, setSideBarOpen] = useState(false);

  const handleCloseSideBar = () => {
    setSideBarOpen(false);
  };

  const handleOpenSideBar = () => {
    setSideBarOpen(true);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          {
            user
            && user.isAuthenticated
            && <>
              <Header onOpenSideBar={handleOpenSideBar} />
              <SideBar sideBarOpen={sideBarOpen} onCloseSideBar={handleCloseSideBar} />
            </>
          }
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

App.propTypes = {
  user: PropTypes.object.isRequired,
};

export default connect(
  (state) => ({ user: state.user }),
)(App);
