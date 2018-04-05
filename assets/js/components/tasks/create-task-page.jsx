import React from 'react';
import {TaskForm} from "./task-form";
import {TaskService} from "../../service/task.service";

export const CreateTaskPage = (props) => {
    return (<div>
        <h1>Create task page</h1>
        <TaskForm model={{}} onSubmit={(model) => { TaskService.post(model) }}/>
    </div>)
};