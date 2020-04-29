import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ThemeProvider as MuiThemeProvider, makeStyles } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import deepPurple from '@material-ui/core/colors/deepPurple';
import CssBaseline from '@material-ui/core/CssBaseline';

import * as userActions from './redux/actions/userActions';

import SideBar from './components/SideBar';
import Header from './components/Header';

import Home from './pages/Home';
import Login from './pages/Login';
import QuizCreate from './pages/QuizCreate';

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
  },
});

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function App({
  user,
  checkAuthentication,
}) {
  const classes = useStyles();
  const [sideBarOpen, setSideBarOpen] = useState(false);

  useEffect(() => {
    if (!user.isAuthenticated) {
      checkAuthentication();
    }
  }, [user.isAuthenticated]);

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
              ? <>
                <Header onOpenSideBar={handleOpenSideBar} />
                <SideBar sideBarOpen={sideBarOpen} onCloseSideBar={handleCloseSideBar} />
                <main className={classes.content}>
                  <div className={classes.toolbar} />
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/newquiz" component={QuizCreate} />
                  </Switch>
                </main>
              </>
              : <Login />
          }
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

App.propTypes = {
  user: PropTypes.object.isRequired,
  checkAuthentication: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  checkAuthentication: userActions.checkAuthentication,
};

export default connect(
  (state) => ({ user: state.user }),
  mapDispatchToProps,
)(App);
