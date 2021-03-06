import React from 'react';
import { UserService } from './service/user.service';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { SignUpPage } from './components/users/sign-up-page';
import { CreateTaskPage } from './components/tasks/create-task-page';

import { TasksPage } from './components/tasks/tasks-page';
import { EditTaskPage } from './components/tasks/edit-task-page';
import { ViewTaskPage } from './components/tasks/view-task-page';
import Nav from './components/layout/nav';
import { Login } from './components/users/login';
import * as ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';

let Tracker = connect(state => state)(() => {
  function handleRouteChange(previousRoute, newRoute) {
    console.log('Paths', previousRoute, newRoute);
  }

  return (
    <Router onChange={handleRouteChange}>
      <div>
        <Nav />
        <div className={'container mt-4'}>
          <Route
            path={'/'}
            exact={true}
            render={() => {
              return (
                <h1>
                  Welcome to tracker! Use the NavBar to{' '}
                  <Link to={'/login'}>login</Link> or{' '}
                  <Link to={'/signUp'}>Sign Up</Link>!
                </h1>
              );
            }}
          />
          <Route path={'/signUp'} exact={true} render={() => <SignUpPage />} />
          <Route
            path={'/tasks/new'}
            exact={true}
            render={props => <CreateTaskPage history={props.history} />}
          />
          <Route
            path={'/tasks/view/:id'}
            exact={true}
            component={ViewTaskPage}
          />
          <Route
            path={'/tasks/edit/:id'}
            exact={true}
            component={EditTaskPage}
          />
          <Route
            path={'/tasks'}
            exact={true}
            render={props => <TasksPage history={props.history} />}
          />
          <Route
            path={'/login'}
            exact={true}
            render={props => <Login history={props.history} />}
          />
        </div>
      </div>
    </Router>
  );
});

export default function tracker_init(store) {
  const auth = UserService.getAuth();
  if (auth && auth.token) {
    store.dispatch({
      type: TokenActionTypes.SetToken,
      payload: auth,
    });
  }
  ReactDOM.render(
    <Provider store={store}>
      <Tracker />
    </Provider>,
    document.getElementById('tracker')
  );
}
