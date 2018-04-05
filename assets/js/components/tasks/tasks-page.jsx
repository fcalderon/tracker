import React from 'react'
import {TaskService} from "../../service/task.service";
import {TaskList} from "./task-list";

export class TasksPage extends React.Component {
    constructor(props) {
        super();
        this.state = {tasks: []};
        TaskService
            .get()
            .then((res) => {
                console.log('Tasks: ', res);
                this.setState({ tasks: res.data })
            }, (error) => {

            })
    }
    render() {
        return (<div>
            <div>
                <TaskList tasks={this.state.tasks}/>
            </div>
        </div>);
    }
}