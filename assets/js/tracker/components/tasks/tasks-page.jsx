import React from 'react';
import { TaskService } from '../../service/task.service';
import { TaskList } from './task-list';
import { connect } from 'react-redux';

export class TasksPageComponent extends React.Component {
  componentWillMount() {
    if (!this.props.userLoggedIn) {
      this.props.history.push('/login');
    } else {
      TaskService.get();
    }
  }
  render() {
    return (
      <div>
        <div>
          <TaskList tasks={this.props.tasks} />
        </div>
      </div>
    );
  }
}
export const TasksPage = connect(state => {
  return { tasks: state.tasks.tasks, userLoggedIn: !!state.token };
})(TasksPageComponent);
