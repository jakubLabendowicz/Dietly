import { getOne, getMany, patchOne, deleteOne } from '../services/StandardService';
import { postOneUser } from '../services/UserService';
export const Joi = require("joi");

const schema = {
    name: Joi.string().required().label("Name"),
    surname: Joi.string().empty().label("Surname"),
    login: Joi.string().required().label("Login"),
    password: Joi.string().required().label("Password"),
    yearOfBirth:Joi.number().empty().label("Year of Birth"),
    email: Joi.string().required().label("Email"),
    phone: Joi.string().empty().label("Phone"),
    sex:Joi.string().empty().label("Sex"),
    height: Joi.number().empty().label("Height"),
    weight: Joi.number().empty().label("Weight"),
    targetWeight:Joi.number().empty().label("Target Weight"),
    bmi: Joi.string().empty().label("BMI"),
    activeLevel: Joi.number().empty().min(1).max(5).label("Active Level"),
    fileId: Joi.number().empty().label("File"),
    file: Joi.any().empty().label("File"),
    displayTheme: Joi.string().empty().label("Theme"),
    displayLanguage: Joi.string().empty().label("Language")
};
const path = 'user';

export const postUser = async (data) => {
    return new Promise( (resolve, reject) => {
        postOneUser(path, data, schema)
        .then(responseBody => {
            resolve(responseBody)
        })
        .catch(error => {
            reject(error)
        })
    })
};

export const getUser = async (id) => {
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

export const getUsers = async (params) => {
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

export const patchUser = async (id, data) => {
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

export const deleteUser = async (id) => {
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