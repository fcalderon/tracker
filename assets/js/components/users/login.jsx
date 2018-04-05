import React from 'react';
import {UserService} from "../../service/user.service";


export class Login extends React.Component {
    constructor() {
        super();
        this.state = {username: '', password: ''}
    }

    handleUsernameChanged(newUsername) {
        this.setState(Object.assign({}, this.state, { username: newUsername }));
    }

    handlePasswordChanged(newPassword) {
        this.setState(Object.assign({}, this.state, { password: newPassword }));
    }

    handleSubmit() {
        UserService.authenticate(this.state)
            .then(authenticationResult => {
                localStorage.setItem('__TOKEN', authenticationResult.token);
                localStorage.setItem('__AUTH', JSON.stringify(authenticationResult))
            }, error =>{

            });
    }


    render() {
        return (<form>
            <div className={'form-group'}>
                <label htmlFor="email-field">Email</label>
                <input type={'email'} className={'form-control'} id="email-field"
                       onChange={ (event) => { this.handleUsernameChanged(event.target.value) }}/>
            </div>
            <div className={'form-group'}>
                <label htmlFor="password-field">Password</label>
                <input type={'password'} className={'form-control'} id="password-field"
                       onChange={ (event) => { this.handlePasswordChanged(event.target.value) }}/>
            </div>
            <button type="button" className="btn btn-primary" onClick={ () => this.handleSubmit()}>Submit</button>
        </form>)
    }
}