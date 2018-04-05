import React from 'react';
import {TaskForm} from "./task-form";
import {TaskService} from "../../service/task.service";
import {CreateTimeBlock} from "./time-blocks/create-time-block";
import {TimeBlockForm} from "./time-blocks/time-block-form";
import {TimeBlocksService} from "../../service/time-block.service";
import {UserService} from "../../service/user.service";
import {Link} from "react-router-dom";

export class EditTaskPage extends React.Component {
    constructor(props) {
        super();
        this.state = {loading: true};

        TaskService.get(props.match.params.id)
            .then((taskRes) => {
                this.setState({ loading: false, task: taskRes.data, newTimeBlock: { start_time: '', end_time: '' }, time_blocksState : { loading: true } });
                this.getUsers();

                this.getTimeBlocks(taskRes.data.id);

            })
            .catch(error => {
                console.log('Error getting task', error);
            });

    }

    getUsers() {
        UserService.get().then(data => {
            this.setState(Object.assign({}, this.state, { users: data.data }));
            console.log('Got users', this.state.users);
        }).catch(error => {
            console.error('Error getting users', error);
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
                this.state.loading
                    ?
                    <div>Loading</div>
                    :
                    <div className={'row'}>
                        <div className={'col'}>
                            <TaskForm model={Object.assign({}, this.state.task)}
                                      users={this.state.users}
                                      onSubmit={(model) => { TaskService.put(model) }}
                                      onChange={(model) => { this.setState({task: model}) }} />
                        </div>
                    </div>
            }
        </div>)
    }
}
