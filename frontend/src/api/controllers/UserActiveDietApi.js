import { postOne, getOne, getMany, patchOne, deleteOne } from '../services/StandardService';
export const Joi = require("joi");

const schema = {
    userId: Joi.number().required().label("User"),
    dietId: Joi.number().required().label("Diet"),
    startTime: Joi.date().required().label("Start time"),
    endTime: Joi.date().required().label("End time"),
    active: Joi.boolean().empty().label("Active"),
};
const path = 'userActiveDiet';

export const postUserActiveDiet = async (data) => {
    return new Promise( (resolve, reject) => {
        postOne(path, data, schema)
        .then(responseBody => {
            resolve(responseBody)
        })
        .catch(error => {
            reject(error)
        })
    })
};

export const getUserActiveDiet = async (id) => {
    return new Promise( (resolve, reject) => {
        getOne(path, id)
        .then(responseBody => {
            resolve(responseBody)
        })
        .catch(error => {
            reject(error)
        })
    })
};

export const getUserActiveDiets = async (params) => {
    return new Promise( (resolve, reject) => {
        getMany(path, params)
        .then(responseBody => {
            resolve(responseBody)
        })
        .catch(error => {
            reject(error)
        })
    })
};

export const patchUserActiveDiet = async (id, data) => {
    return new Promise( (resolve, reject) => {
        patchOne(path, id, data)
        .then(responseBody => {
            resolve(responseBody)
        })
        .catch(error => {
            reject(error)
        })
    })
};

export const deleteUserActiveDiet = async (id) => {
    return new Promise( (resolve, reject) => {
        deleteOne(path, id)
        .then(responseBody => {
            resolve(responseBody)
        })
        .catch(error => {
            reject(error)
        })
    })
};