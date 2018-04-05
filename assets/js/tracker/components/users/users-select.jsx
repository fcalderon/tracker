import React from 'react';

export const UsersSelect = (props) => {
    return (<div className={'form-group'}>
        <label>
            { props.label ? props.label : 'Select user'}
        </label>
        <select className={'form-control'}
                disabled={props.readOnly}
                onChange={ (event) => { console.log('Changed', event.target.value) ; props.onSelected(getUser(props.users, event.target.value)) }}
                value={props.selectedUserId}>
            {renderUsers(props.users, props.selectedUserId)}
        </select>
    </div>);
};

function renderUsers(users, selectedUserId) {
    const options = [];
    if (users) {
        for(let i = 0; i < users.length ; i++) {
            const user = users[i];
            options.push(<option key={user.id} value={user.id} selected={user.id === selectedUserId}>{user.name}</option>)
        }
    }
    return options;
}

function getUser(users, userId) {
    for(let i = 0; i < users.length ; i++) {
        const user = users[i];
        if (user.id === parseInt(userId)) {
            return user;
        }
    }
}