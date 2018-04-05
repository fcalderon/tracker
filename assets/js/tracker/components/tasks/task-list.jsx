import React from 'react'
import {Link} from "react-router-dom";

export const TaskList = (props) => {
    return (<div className={'row'}>
        <div className={'col'}>
            <div className={'row'}>
                <div className={'col'}>
                    <Link to={'/tasks/new'}>New task</Link>
                </div>
            </div>
            <div className={'row'}>
                <div className={'col'}>
                    <div className={'list-group'}>
                        {renderTasks(props.tasks || [])}
                    </div>
                </div>
            </div>

        </div>
    </div>);
};

function renderTasks(tasks) {
    const renderedTasks = [];

    for(let i = 0; i < tasks.length ; i++) {
        renderedTasks.push(renderTask(tasks[i]));
    }

    return renderedTasks;
}

function renderTask(task) {
    return <Link key={task.id} to={'/tasks/view/' + task.id} className={'list-group-item list-group-item-action flex-column align-items-start'}>
        <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{task.title}</h5>
        </div>
        <p className="mb-1">{task.description}</p>
        <small>{task.assignee.name}</small>
    </Link>
}
