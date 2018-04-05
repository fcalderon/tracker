import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

/*  TODO update state layout
 *  state layout:
 *  {
 *   tasks: [... Posts ...],
 *   users: [... Users ...],
 *   form: {
 *     user_id: null,
 *     body: "",
 *   }
 * }
 *
 * */

export const TaskActionsTypes = {
    Add:    '[Tasks] Add',
    List:   '[Tasks] List',
    Remove: '[Tasks] Remove',
    Update: '[Tasks] Update',
    Select: '[Tasks] Select Task',
    UpdateForm: '[Tasks] UpdateForm'
};

function tasks(state = { tasks: [], taskForm: {} }, action) {
    switch (action.type) {
        case TaskActionsTypes.Add:
            return Object.assign({}, state, { tasks: [...state.tasks, action.payload ]});
        case TaskActionsTypes.List:
            return Object.assign({}, state, { tasks: [ ...action.payload ]});
        case TaskActionsTypes.Select:
            return Object.assign({}, state, { task: action.payload });
        case TaskActionsTypes.UpdateForm:
            return Object.assign({}, state, { taskForm: Object.assign({}, state.taskForm, action.payload)});
        case TaskActionsTypes.Remove:
        case TaskActionsTypes.Update:
        default:
            return state;
    }

}

export const UserActionTypes = {
    SetCurrent:    '[Users] Set Current',
    UpdateCurrent: '[Users] Update Current',
    RemoveCurrent: '[Users] Remove Auth',
    List:          '[Users] List'
};

function users(state = { users: [] }, action) {
    switch (action.type) {
        case UserActionTypes.List:
            return Object.assign({}, state, { users: [ ...action.payload ]});
        case UserActionTypes.UpdateCurrent:
        case UserActionTypes.SetCurrent:
            return Object.assign({}, state, { currentUser: action.user });
        case UserActionTypes.RemoveCurrent:
            return Object.assign({}, state, { currentUser: undefined });
        default:
            return state;
    }
}

export const TokenActionTypes = {
    SetToken:       '[Users] Set Auth',
    RemoveToken:    '[Users] Remove Auth',
};

function token(state = null, action) {
    switch (action.type) {
        case TokenActionTypes.SetToken:
            return Object.assign({}, { tokenWrapper: action.payload });
        case TokenActionTypes.RemoveToken:
            return Object.assign({}, { tokenWrapper: undefined });
        default:
            return state;
    }
}

let empty_login_form = {
    username: '',
    password: ''
};

export const LoginActionTypes = {
    UpdateForm: '[Login] Update Form'
};

function login(state = empty_login_form, action) {
    switch (action.type) {
        case LoginActionTypes.UpdateForm:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}

let empty_form = {
    user_id: "",
    body: "",
};

function form(state = empty_form, action) {
    switch (action.type) {
        case 'UPDATE_FORM':
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}

function root_reducer(state0, action) {
    console.log("reducer", action);
    // {tasks, users, form} is ES6 shorthand for
    // {tasks: tasks, users: users, form: form}
    let reducer = combineReducers({tasks, users, token, form, login});
    let state1 = reducer(state0, action);
    console.log("state1", state1);
    return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store;