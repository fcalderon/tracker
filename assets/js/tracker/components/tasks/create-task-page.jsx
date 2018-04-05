import React from 'react';
import {TaskForm} from "./task-form";
import {TaskService} from "../../service/task.service";
import {connect} from "react-redux";
import {UserService} from "../../service/user.service";

export const CreateTaskPage
    = connect((state) => { return { form: state.tasks.form  }})
(class Clazz extends React.Component{
    componentWillMount() {
        UserService.get();
    }

    handleOnSubmit() {
        TaskService.post(this.props.form)
    }
    render(){
        return (<div>
            <h1>Create task page</h1>
            <TaskForm model={{}} onSubmit={() => { this.handleOnSubmit() }}/>
        </div>)
    }
});