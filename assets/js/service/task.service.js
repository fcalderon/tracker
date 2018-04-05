import {API_URL} from "../util/constants";

const taskPath = API_URL + '/tasks';

import { CRUD } from "./crud.service";

function get(id) {
    return CRUD.get(taskPath + (!!id ? '/' + id : ''), true);
}

function post(task) {
    return CRUD.post(taskPath, {task: task}, true);
}

function put(task) {
    return CRUD.put(taskPath + '/' + task.id, { task: task }, true);
}

export const TaskService = {
    get,
    post,
    put
};
