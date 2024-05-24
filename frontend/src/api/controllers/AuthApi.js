import { postOneAuth } from '../services/AuthService';
export const Joi = require("joi");

const schema = {
    login: Joi.string().required().label("Login"),
    password: Joi.string().required().label("Password")
};
const path = 'auth';

export const postAuth = async (data) => {
    return new Promise( (resolve, reject) => {
        postOneAuth(path, data, schema)
        .then(responseBody => {
            resolve(responseBody)
        })
        .catch(error => {
            reject(error)
        })
    })
};