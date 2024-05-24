import { postOne, getOne, getMany, patchOne, deleteOne, search } from '../services/StandardService';
export const Joi = require("joi");

const schema = {
    name: Joi.string().required().label("Name"),
    description: Joi.string().empty().label("Description"),
    ownerId: Joi.number().empty().label("Owner"),
    fileId: Joi.number().empty().label("File"),
    file: Joi.any().empty().label("File"),
    unitId: Joi.number().required().label("Unit"),
    quantity: Joi.number().required().label("Quantity"),
    producer: Joi.string().empty().label("Producer"),
    category: Joi.string().empty().label("Category"),
    code: Joi.string().empty().label("Code"),
    nutriScore: Joi.string().empty().label("Nutri-Score"),
    vegan: Joi.boolean().empty().label("Vegan"),
    vegetarian: Joi.boolean().empty().label("Vegetarian"),
};
const path = 'product';

export const postProduct = async (data) => {
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

export const getProduct = async (id) => {
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

export const getProducts = async (params) => {
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

export const patchProduct = async (id, data) => {
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

export const deleteProduct = async (id) => {
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

export const searchProducts = async (term) => {
    return new Promise( (resolve, reject) => {
        search(path, term)
        .then(responseBody => {
            resolve(responseBody)
        })
        .catch(error => {
            reject(error)
        })
    })
};