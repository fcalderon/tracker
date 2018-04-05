import React from 'react';
import {TaskForm} from "./task-form";
import {TaskService} from "../../service/task.service";
import {UserService} from "../../service/user.service";
import {Link} from "react-router-dom";
import {connect} from "react-redux";


class EditTaskPageComponent extends React.Component {
    componentWillMount() {
        TaskService.getById(this.props.match.params.id, true);
        UserService.get();
    }

    handleSubmit(model) {
        TaskService.put(model).then(() => {
            this.props.history.push('/tasks/view/' + model.id)
        })
    }
    render() {
        return (<div>
            <h1>Edit task page</h1>
            <div className={'row'}>
                <div className={'col'}>
                    <Link to={'/tasks'}>Back to tasks</Link>
                </div>
            </div>
            {
                !this.props.task
                    ?
                    <div>Loading</div>
                    :
                    <div className={'row'}>
                        <div className={'col'}>
                            <TaskForm model={Object.assign({}, this.props.task)}
                                      users={this.props.users}
                                      onSubmit={(model) => { this.handleSubmit(model) }}/>
                        </div>
                    </div>
            }
        </div>)
    }
}

function state2props(state) {
    console.log("rerender", state);
    return {
        task: state.tasks.taskForm,
        users: state.users.users };
}

// Export the result of a curried function call.
export const EditTaskPage = connect(state2props)(EditTaskPageComponent);