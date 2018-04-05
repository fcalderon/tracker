import React from 'react';
import { TaskForm } from './task-form';
import { TaskService } from '../../service/task.service';
import { connect } from 'react-redux';
import { UserService } from '../../service/user.service';
import store, { TaskActionsTypes } from '../../../store';

export const CreateTaskPage = connect(state => {
  return { form: state.tasks.taskForm };
})(
  class Clazz extends React.Component {
    componentWillMount() {
      console.log(this.props);
      UserService.get();
      store.dispatch({
        type: TaskActionsTypes.ClearForm,
      });
    }

    handleOnSubmit() {
      console.log('On submit', this.props);
      TaskService.post(this.props.form).then(createdTask => {
        this.props.history.push('/tasks/view/' + createdTask.id);
      });
    }
    render() {
      return (
        <div>
          <h1>Create task page</h1>
          <TaskForm
            model={{}}
            onSubmit={() => {
              this.handleOnSubmit();
            }}
          />
        </div>
      );
    }
  }
);
