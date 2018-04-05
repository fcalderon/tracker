import {API_URL} from "../util/constants";

const userPath = API_URL + '/users';

import { CRUD } from "./crud.service";

function get() {
    return CRUD.get(userPath, true);
}

function post(user) {
    return CRUD.post(userPath, {user: user}, false);
}

function authenticate(credentials) {
    return CRUD.post(userPath, {credentials: credentials}, true);
}

export const UserService = {
    get: get,
    post: post,
    authenticate,
    getAuth
};

export function getAuth() {
    const auth = localStorage.getItem('__AUTH');
    if (auth) {
        return JSON.parse(auth);
    }
}