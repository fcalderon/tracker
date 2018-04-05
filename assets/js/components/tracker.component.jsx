import React from 'react';
import {UserService} from "../service/user.service";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {SignUpPage} from "./users/sign-up-page";
import {CreateTaskPage} from "./tasks/create-task-page";

import {TasksPage} from "./tasks/tasks-page";
import {EditTaskPage} from "./tasks/edit-task-page";
import {ViewTaskPage} from "./tasks/view-task-page";
import {Nav} from "./layout/nav";
import {Login} from "./users/login";


export class Tracker extends React.Component {
    constructor() {
        super();
        UserService
            .get()
            .then(function (user) {
                console.log(user);
            }, function (error) {
                console.log(error)
            })
    }
    render() {
        return <Router>
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
    }
}