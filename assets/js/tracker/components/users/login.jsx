import React from 'react';
import { UserService } from '../../service/user.service';
import { connect } from 'react-redux';
import { LoginActionTypes } from '../../../store';

export const Login = connect(({ login }) => {
  return { login };
})(props => {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    console.log(ev.target);
    data[tgt.attr('name')] = tgt.val();
    console.log(data);
    props.dispatch({
      type: LoginActionTypes.UpdateForm,
      payload: data,
    });
  }
  function handleSubmit(ev) {
    console.log(props);
    UserService.authenticate(props.login).then(() => {
      props.history.push('/tasks');
    });
  }

  return (
    <form>
      <div className={'form-group'}>
        <label htmlFor="email-field">Email</label>
        <input
          type={'email'}
          className={'form-control'}
          id="email-field"
          name={'username'}
          onChange={update}
        />
      </div>
      <div className={'form-group'}>
        <label htmlFor="password-field">Password</label>
        <input
          type={'password'}
          className={'form-control'}
          id="password-field"
          name={'password'}
          onChange={update}
        />
      </div>
      <button type="button" className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
});
