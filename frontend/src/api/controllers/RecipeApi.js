import { postOne, getOne, getMany, patchOne, deleteOne, search } from '../services/StandardService';
export const Joi = require("joi");

const schema = {
    name: Joi.string().required().label("Name"),
    description: Joi.string().empty().label("Description"),
    preparation: Joi.string().empty().label("Preparation"),
    ownerId: Joi.number().empty().label("Owner"),
    fileId: Joi.number().empty().label("File"),
    unitId: Joi.number().required().label("Unit"),
    quantity: Joi.number().required().label("Quantity"),
    category: Joi.string().empty().label("Category"),
    vegan: Joi.boolean().empty().label("Vegan"),
    vegetarian: Joi.boolean().empty().label("Vegetarian"),
};
const path = 'recipe';

export const postRecipe = async (data) => {
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

export const getRecipe = async (id) => {
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

export const getRecipes = async (params) => {
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

export const patchRecipe = async (id, data) => {
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

export const deleteRecipe = async (id) => {
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

export const searchRecipes = async (term) => {
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