import React from 'react';
import {TaskForm} from "./task-form";
import {TaskService} from "../../service/task.service";

export class ViewTaskPage extends React.Component {
    constructor(props) {
        super();
        this.state = {loading: true};

        TaskService.get(props.match.params.id)
            .then((taskRes) => {
                this.setState({ loading: false, task: taskRes.data })
            })
            .catch(error => {
                console.log('Error getting task', error);
            })

    }


    render() {
        return (<div>
            <h1>View task page</h1>
            {
                this.state.loading
                    ?
                    <div>Loading</div>
                    :
                    <TaskForm model={Object.assign({}, this.state.task)}
                              readOnly={true} />

            }
        </div>)
    }
}
