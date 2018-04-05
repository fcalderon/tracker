import React from 'react';

export const UserForm = props => {
  return (
    <form>
      <div className={'form-group'}>
        <label htmlFor="name-field">Name</label>
        <input
          type={'text'}
          name={'name'}
          className={'form-control'}
          id="name-field"
          disabled={props.readOnly}
          onChange={props.update}
        />
      </div>
      <div className={'form-group'}>
        <label htmlFor="email-field">Email</label>
        <input
          type={'email'}
          name={'username'}
          className={'form-control'}
          id="email-field"
          disabled={props.readOnly}
          onChange={props.update}
        />
      </div>
      <div className={'form-group'}>
        <label htmlFor="password-field">Password</label>
        <input
          type={'password'}
          name={'password'}
          className={'form-control'}
          id="password-field"
          disabled={props.readOnly}
          onChange={props.update}
        />
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => props.onSubmit(props.model)}
      >
        Submit
      </button>
    </form>
  );
};
