import { postOne, getOne, getMany, patchOne, deleteOne } from '../services/StandardService';
export const Joi = require("joi");

const schema = {
    dietMealId: Joi.number().required().label("Diet Meal"),
    recipeId: Joi.number().required().label("Recipe"),
    unitId: Joi.number().required().label("Unit"),
    quantity: Joi.number().required().label("Quantity"),
    name: Joi.any().empty().label("Name")
};
const path = 'dietMealRecipe';

export const postDietMealRecipe = async (data) => {
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

export const getDietMealRecipe = async (id) => {
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

export const getDietMealRecipes = async (params) => {
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

export const patchDietMealRecipe = async (id, data) => {
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

export const deleteDietMealRecipe = async (id) => {
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