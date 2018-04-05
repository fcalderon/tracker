import React from 'react';

export const UserForm = (props) => {
    return (
        <form>
            <div className={'form-group'}>
                <label htmlFor="name-field">Name</label>
                <input type={'text'} className={'form-control'} id="name-field" disabled={props.readOnly}
                       onChange={ (event) => { props.model.name = event.target.value; onChange(props) }}/>
            </div>
            <div className={'form-group'}>
                <label htmlFor="email-field">Email</label>
                <input type={'email'} className={'form-control'} id="email-field" disabled={props.readOnly}
                       onChange={ (event) => { props.model.username = event.target.value; onChange(props) }}/>
            </div>
            <div className={'form-group'}>
                <label htmlFor="password-field">Password</label>
                <input type={'password'} className={'form-control'} id="password-field" disabled={props.readOnly}
                       onChange={ (event) => { props.model.password = event.target.value; onChange(props) }}/>
            </div>
            <button type="button" className="btn btn-primary" onClick={ () => props.onSubmit(props.model)}>Submit</button>
        </form>
    );
};

function onChange(props) {
    if (props.onChange) {
        props.onChange(props.model)
    }
}