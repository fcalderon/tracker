import React from 'react';
import {UserForm} from "./user-form.component";
import {UserService} from "../../service/user.service";
import {LoginActionTypes, SignUpActionTypes} from "../../../store";
import {connect} from "react-redux";

export const SignUpPage = connect((state) => { return {form: state.signUp}})((props) => {
    function update(ev) {
        let tgt = $(ev.target);
        let data = {};
        console.log(ev.target);
        data[tgt.attr('name')] = tgt.val();
        console.log(data);
        props.dispatch({
            type: SignUpActionTypes.UpdateForm,
            payload: data,
        });
    }
    function handleSubmit() {
        UserService.post(props.form).then(() => {
            UserService.authenticate(props.form);
        })
    }
    return (
        <div className={'row'}>
            <div className={'col'}>
                <div className={'row'}>
                    <div className={'col'}>
                        <UserForm model={{}}
                                  update={ update }
                                  onChange={ (model) => { console.log('Model changed', model)}}
                                  onSubmit={ (model) => { console.log('Submitted', model); handleSubmit() } }/>
                    </div>
                </div>
            </div>
        </div>
    );
});