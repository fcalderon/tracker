import React from 'react';
import {UserForm} from "./user-form.component";
import {UserService} from "../../service/user.service";

export const SignUpPage = (props) => {
    return (
        <div className={'row'}>
            <div className={'col'}>
                <div className={'row'}>
                    <div className={'col'}>
                        <UserForm model={{}}
                                  onChange={ (model) => { console.log('Model changed', model)}}
                                  onSubmit={ (model) => { console.log('Submitted', model); UserService.post(model) } }/>
                    </div>
                </div>
            </div>
        </div>
    );
};