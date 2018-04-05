import {API_URL} from "../util/constants";
import store, {TokenActionTypes, UserActionTypes} from '../../store';

const userPath = API_URL + '/users';

import { CRUD } from "./crud.service";

function get() {
    return CRUD.get(userPath, true)
        .then(res => {
            console.log('Got res', res);
            store.dispatch({
                type: UserActionTypes.List,
                payload: res.data
            })
        })
        .catch(err => {
            console.error('Error getting users', err)
        });
}

function getById(userId) {
    return CRUD.get(userPath + '/' + userId, true)
        .then(res => {
            store.dispatch({
                type: UserActionTypes.SetCurrent,
                user: res.data
            })
        })
        .catch(err => {
            console.error('Error getting user', userId, err)
        });
}

function post(user) {
    return CRUD.post(userPath, {user: user}, false)
        .then(res => {
            store.dispatch({
                type: '[User] POST_USER',
                user: res.data
            })
        }).catch(err => {
            console.error('Error posting user', user, err)
        });
}

function authenticate(credentials) {
    return CRUD.post(userPath, {credentials: credentials})
        .then(res => {
            store.dispatch({
                type: TokenActionTypes.SetToken,
                payload: res
            })
        }).catch(err => {
            console.error('Error posting user', err)
        });
}

export const UserService = {
    get,
    post,
    authenticate,
    getAuth,
    getById
};

export function getAuth() {
    const auth = localStorage.getItem('__AUTH');
    if (auth) {
        return JSON.parse(auth);
    }
}