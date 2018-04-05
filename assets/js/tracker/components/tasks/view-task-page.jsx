import React from 'react';
import { TaskForm } from './task-form';
import { TaskService } from '../../service/task.service';
import { connect } from 'react-redux';

class ViewTaskPageComponent extends React.Component {
  componentWillMount() {
    console.log('Component will mount');
    const id = this.props.match.params.id;
    console.log(id);
    if (!this.props.userLoggedIn) {
      this.props.history.push('/login');
    } else {
      TaskService.getById(id, true);
    }
  }
  render() {
    return (
      <div>
        <h1>View task page</h1>
        {!this.props.tasks.taskForm ? (
          <div>Loading</div>
        ) : (
          <TaskForm
            model={Object.assign({}, this.props.tasks.taskForm)}
            readOnly={true}
          />
        )}
      </div>
    );
  }
}
export const ViewTaskPage = connect(state => {
  return { tasks: state.tasks, userLoggedIn: state.token };
})(ViewTaskPageComponent);
