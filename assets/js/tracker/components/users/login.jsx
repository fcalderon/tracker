import React from 'react';
import { UserService } from '../../service/user.service';
import { EditTaskPage } from '../tasks/edit-task-page';
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

  // function handleUsernameChanged(newUsername) {
  //     this.setState(Object.assign({}, this.state, { username: newUsername }));
  // }
  //
  // handlePasswordChanged(newPassword) {
  //     this.setState(Object.assign({}, this.state, { password: newPassword }));
  // }
  //
  function handleSubmit(ev) {
    console.log(props);
    UserService.authenticate(props.login).then(() => {
      props.history.push('/tasks');
    });
    // .then(authenticationResult => {
    //     localStorage.setItem('__TOKEN', authenticationResult.token);
    //     localStorage.setItem('__AUTH', JSON.stringify(authenticationResult))
    // }, error =>{
    //
    // });
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

// export default connect(state2props)(EditTaskPage);
