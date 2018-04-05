import React from 'react';
import { TaskService } from '../../service/task.service';
import { UsersSelect } from '../users/users-select';
import { Link } from 'react-router-dom';
import { TaskActionsTypes } from '../../../store';
import { connect } from 'react-redux';

export const TaskForm = connect(state => {
  return { users: state.users.users, form: state.tasks.taskForm };
})(props => {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    console.log(ev.target);
    data[tgt.attr('name')] = tgt.val();
    if (data[tgt.attr('name')] === 'on') {
      data[tgt.attr('name')] = true;
    } else if (data[tgt.attr('name')] === 'off') {
      data[tgt.attr('name')] = false;
    }
    console.log(data);
    props.dispatch({
      type: TaskActionsTypes.UpdateForm,
      payload: data,
    });
  }

  return (
    <form>
      <div className={'card'}>
        <div className={'card-header'}>
          {!!props.title ? props.title : 'Task form'}
        </div>
        <div className={'card-body'}>
          <div className={'form-group'}>
            <label htmlFor="title-field">Title</label>
            <input
              type={'text'}
              className={'form-control'}
              id="title-field"
              disabled={props.readOnly}
              name={'title'}
              onChange={update}
              value={props.form.title}
            />
          </div>
          <div className={'form-group'}>
            <label htmlFor="description-field">Description</label>
            <input
              type={'text'}
              className={'form-control'}
              id="description-field"
              disabled={props.readOnly}
              name={'description'}
              onChange={update}
              value={props.form.description}
            />
          </div>
          <div>
            {!!props.users && !props.readOnly ? (
              <UsersSelect
                users={props.users}
                readOnly={props.readOnly}
                selectedUserId={props.form.assignee_id}
                onSelected={user => {
                  props.dispatch({
                    type: TaskActionsTypes.UpdateForm,
                    payload: { assignee_id: user.id },
                  });
                }}
              />
            ) : props.readOnly && !!props.form.assignee ? (
              <div className={'form-group'}>
                <label htmlFor="assignee-field">Assignee</label>
                <input
                  type={'text'}
                  className={'form-control'}
                  id="assignee-field"
                  disabled={props.readOnly}
                  value={props.form.assignee.name}
                />
              </div>
            ) : (
              <div className={'form-group'}>
                <label htmlFor="assignee-field">Assignee</label>
                <input
                  type={'number'}
                  className={'form-control'}
                  id="assignee-field"
                  disabled={props.readOnly}
                  name={'assignee_id'}
                  onChange={update}
                  value={props.form.assignee_id}
                />
              </div>
            )}
          </div>

          {!!props.form.id ? (
            <div>
              <div className={'form-group'}>
                <label htmlFor="assignee-field">Time Spent (minutes)</label>
                <input
                  type={'number'}
                  className={'form-control'}
                  id="assignee-field"
                  disabled={props.readOnly}
                  step={15}
                  onChange={update}
                  name={'minutes_worked'}
                  value={props.form.minutes_worked || 0}
                />
              </div>
              <div className={'form-check'}>
                <input
                  type={'checkbox'}
                  className={'form-check-input'}
                  id="completed-check"
                  disabled={props.readOnly}
                  onChange={update}
                  name={'completed'}
                  checked={props.form.completed}
                />
                <label htmlFor="completed-check" className={'form-check-label'}>
                  Completed
                </label>
              </div>
            </div>
          ) : (
            <div />
          )}
        </div>
        <div className={'card-footer'}>
          {props.readOnly && props.form.id ? (
            <Link to={'/tasks/edit/' + props.form.id}>Edit</Link>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => props.onSubmit(props.form)}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </form>
  );
});
