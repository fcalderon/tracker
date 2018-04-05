import React from 'react';
import {TaskService} from "../../service/task.service";
import {UsersSelect} from "../users/users-select";
import {Link} from "react-router-dom";


export const TaskForm = (props) => {
    return (
        <form>
            <div className={'card'}>
                <div className={'card-header'}>
                    { !!props.title ? props.title : 'Task form'}
                </div>
                <div className={'card-body'}>
                    <div className={'form-group'}>
                        <label htmlFor="title-field">Title</label>
                        <input type={'text'}
                               className={'form-control'} id="title-field"
                               disabled={props.readOnly}
                               onChange={ (event) => { props.model.title = event.target.value; onChange(props) }}
                               value={props.model.title}/>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor="description-field">Description</label>
                        <input type={'text'}
                               className={'form-control'}
                               id="description-field"
                               disabled={props.readOnly}
                               onChange={ (event) => { props.model.description = event.target.value; onChange(props) }}
                               value={props.model.description}/>
                    </div>
                    <div>
                        {
                            !!props.users
                                ?
                                <UsersSelect users={ props.users }
                                             readOnly={props.readOnly}
                                             selectedUserId={props.model.assignee_id}
                                             onSelected={ (user) => {props.model.assignee_id =  user.id; onChange(props)}}/>
                                :
                                !!props.readOnly

                                    ?
                                    <div className={'form-group'}>
                                        <label htmlFor="assignee-field">Assignee</label>
                                        <input type={'text'}
                                               className={'form-control'}
                                               id="assignee-field"
                                               disabled={props.readOnly}
                                               value={props.model.assignee.name}/>
                                    </div>
                                    :
                                <div className={'form-group'}>
                                    <label htmlFor="assignee-field">Assignee</label>
                                    <input type={'number'}
                                           className={'form-control'}
                                           id="assignee-field"
                                           disabled={props.readOnly}
                                           onChange={ (event) => { props.model.assignee_id = event.target.value; onChange(props) }}
                                           value={props.model.assignee_id}/>
                                </div>
                        }
                    </div>

                    {
                        !!props.model.id
                            ?
                            <div>
                                <div className={'form-group'}>
                                    <label htmlFor="assignee-field">Time Spent (minutes)</label>
                                    <input type={'number'}
                                           className={'form-control'}
                                           id="assignee-field"
                                           disabled={props.readOnly}
                                           step={15}
                                           onChange={ (event) => { props.model.minutes_worked = event.target.value; onChange(props) }}
                                           value={props.model.minutes_worked || 0}/>
                                </div>
                                <div className={'form-check'}>
                                    <input type={'checkbox'} className={'form-check-input'} id="completed-check" disabled={props.readOnly}
                                           onChange={ (event) => { props.model.completed = event.target.checked; onChange(props) }}
                                           checked={props.model.completed}/>
                                    <label htmlFor="completed-check" className={'form-check-label'}>Completed</label>
                                </div>
                            </div>

                            :
                            <div></div>
                    }
                </div>
                <div className={'card-footer'}>
                    {
                        props.readOnly && props.model.id
                            ?
                            <Link to={'/tasks/edit/' + props.model.id } >Edit</Link>
                            :
                            <button type="button" className="btn btn-primary" onClick={ () => props.onSubmit(props.model)}>Submit</button>
                    }
                </div>
            </div>
        </form>
    );
};

function onChange(props) {
    console.log(props);

    if (props.onChange) {
        props.onChange(props.model)
    }
}