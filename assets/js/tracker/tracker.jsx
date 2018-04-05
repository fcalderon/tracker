import React from 'react';
import {UserService} from "./service/user.service";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {SignUpPage} from "./components/users/sign-up-page";
import {CreateTaskPage} from "./components/tasks/create-task-page";

import {TasksPage} from "./components/tasks/tasks-page";
import {EditTaskPage} from "./components/tasks/edit-task-page";
import {ViewTaskPage} from "./components/tasks/view-task-page";
import Nav from "./components/layout/nav";
import {Login} from "./components/users/login";
import * as ReactDOM from "react-dom";
import {connect, Provider} from "react-redux";
import {TaskForm} from "./components/tasks/task-form";
import {TaskService} from "./service/task.service";
import store, {TokenActionTypes} from "../store";


let Tracker = connect((state) => state)((props) => {
    function handleRouteChange(previousRoute, newRoute) {
        console.log('Paths', previousRoute, newRoute);
    }

    function renderViewTasks(routeProps) {
        console.log(routeProps);
        // TaskService.get(routeProps.match.params.id);
        return (<ViewTaskPage/>);
    }
    return <Router onChange={handleRouteChange}>
        <div>
            <Nav />
            <div className={'container'}>
                <Route path={'/signUp'} exact={true} render={() => <SignUpPage/>}/>
                <Route path={'/tasks/new'} exact={true} render={() => <CreateTaskPage/>}/>
                <Route path={'/tasks/:id'} exact={true} component={ViewTaskPage}/>
                <Route path={'/tasks/edit/:id'} exact={true} component={EditTaskPage}/>
                <Route path={'/tasks'} exact={true} render={() => <TasksPage/>}/>
                <Route path={'/login'} exact={true} render={() => <Login />}/>
            </div>
        </div>
    </Router>;
});

export default function tracker_init(store) {
    const auth = UserService.getAuth();
    if (auth && auth.token) {
        store.dispatch({
            type: TokenActionTypes.SetToken,
            payload: auth
        })
    }
    ReactDOM.render(
        <Provider store={store}>
            <Tracker />
        </Provider>,
        document.getElementById('tracker'),
    );
}