import {API_URL} from "../util/constants";

const taskPath = API_URL + '/tasks';

import { CRUD } from "./crud.service";
import store, {TaskActionsTypes, UserActionTypes} from "../../store";

function get() {
    return CRUD.get(taskPath, true)
        .then(res => {
            console.log('Got res', res);
            store.dispatch({
                type: TaskActionsTypes.List,
                payload: res.data
            })
        })
        .catch(err => {
            console.error('Error getting users', err)
        });
}

function getById(id, forForm = false) {
    return CRUD.get(taskPath + '/' + id, true)
        .then(res => {
            console.log('Got res', res);
            store.dispatch({
                type: forForm ? TaskActionsTypes.UpdateForm : TaskActionsTypes.Select,
                payload: res.data
            })
        })
        .catch(err => {
            console.error('Error getting users', err)
        });
}

function post(task) {
    return CRUD.post(taskPath, {task: task}, true)
        .then(res => {
            console.log('Got res', res);
            store.dispatch({
                type: TaskActionsTypes.Add,
                payload: res.data
            })
        })
        .catch(err => {
            console.error('Error getting users', err)
        });
}

function put(task) {
    return CRUD.put(taskPath + '/' + task.id, { task: task }, true)
        .then(res => {
            console.log('Got res', res);
            store.dispatch({
                type: TaskActionsTypes.Update,
                payload: res.data
            })
        })
        .catch(err => {
            console.error('Error getting users', err)
        });
}

export const TaskService = {
    get,
    post,
    put,
    getById
};
