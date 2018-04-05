import {getAuth} from "./user.service";
import store from '../../store';

function get(url, secured) {
    let headers = setAuthToken({
        'content-type': 'application/json'
    }, secured);

    console.log('Getting', url);
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'GET',
            headers: headers,
        }).then(function (res) {
            if (res.ok) {
                resolve(res.json());
            } else {
                console.log(res);
                switch (res.status) {
                    case 404 : {
                        reject(new NotFoundError());
                        break;
                    }
                    case 500 : {
                        reject(new ServerError());
                        break;
                    }
                }
            }

        }).catch(function (error) {
            console.log('Error with request', url, error)
        })
    })
}

function deleteEntity(url, secured) {
    let headers = setAuthToken({
        'content-type': 'application/json'
    }, secured);

    console.log('Getting', url);
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'DELETE',
            headers: headers,
        }).then(function (res) {
            if (res.ok) {
                resolve();
            } else {
                console.log(res);
                switch (res.status) {
                    case 404 : {
                        reject(new NotFoundError());
                        break;
                    }
                    case 500 : {
                        reject(new ServerError());
                        break;
                    }
                }
            }

        }).catch(function (error) {
            console.log('Error with request', url, error)
        })
    })
}

function post(url, data, secured) {
    let headers = setAuthToken({
        'content-type': 'application/json'
    }, secured);

    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: headers,
        }).then(function (res) {
            if (res.ok) {
                resolve(res.json());
            } else {
                console.log(res);
                switch (res.status) {
                    case 404 : {
                        reject(new NotFoundError());
                        break;
                    }
                    case 500 : {
                        reject(new ServerError());
                        break;
                    }
                    default: {
                        reject(res)
                    }
                }
            }

        }).catch(function (error) {
            console.log('Error with request', url, error)
        })
    })
}

function put(url, data, secured) {
    let headers = setAuthToken({
        'content-type': 'application/json'
    }, secured);

    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: headers,
        }).then(function (res) {
            if (res.ok) {
                resolve(res.json());
            } else {
                console.log(res);
                switch (res.status) {
                    case 404 : {
                        reject(new NotFoundError());
                        break;
                    }
                    case 500 : {
                        reject(new ServerError());
                        break;
                    }
                    default: {
                        reject(res)
                    }
                }
            }

        }).catch(function (error) {
            console.log('Error with request', url, error)
        })
    })
}

function setAuthToken(headers, secured) {
    if (secured) {
        if (secured) {
            let auth = store.getState().token;
            if (auth && auth.tokenWrapper && auth.tokenWrapper.token) {
                return Object.assign({}, headers, {'authorization': 'Bearer ' + auth.tokenWrapper.token})
            }
        }
    }

    return headers;
}

export class NotFoundError extends Error {}
export class ConflictError extends Error {}
export class UnauthorizedError extends Error {}
export class InvalidDataError extends Error {}
export class ServerError extends Error {}

export const CRUD = {
    get,
    post,
    put,
    delete: deleteEntity
};

