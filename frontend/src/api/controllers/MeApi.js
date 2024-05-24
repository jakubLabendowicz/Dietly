import { getOneMe, patchOneMe, deleteOneMe } from "../services/MeService";

const path = 'me';

export const getMe = async () => {
    return new Promise( (resolve, reject) => {
        getOneMe(path)
        .then(responseBody => {
            resolve(responseBody)
        })
        .catch(error => {
            reject(error)
        })
    })
};

export const patchMe = async (data) => {
    return new Promise( (resolve, reject) => {
        patchOneMe(path, data)
        .then(responseBody => {
            resolve(responseBody)
        })
        .catch(error => {
            reject(error)
        })
    })
};

export const deleteMe = async () => {
    return new Promise( (resolve, reject) => {
        deleteOneMe(path)
        .then(responseBody => {
            resolve(responseBody)
        })
        .catch(error => {
            reject(error)
        })
    })
};

export const getUserTargetNutrients = async (params) => {
    return new Promise( (resolve, reject) => {
        getOneMe(path + '/targetNutrients', params)
        .then(responseBody => {
            resolve(responseBody)
        })
        .catch(error => {
            reject(error)
        })
    })
};