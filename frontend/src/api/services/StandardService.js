import axios from 'axios';
import {
    METHOD_POST,
    METHOD_GET,
    METHOD_PATCH,
    METHOD_DELETE,
    URL,
    RESPONSE_TYPE,
    HEADERS
} from '../utils/RequestUtils';
import { processGetResult, processResult, RESULT_SOMETHING_WRONG } from '../utils/ResponseUtils';
import { validate } from '../utils/ValidationUtils';

export const postOne = async (path, data, schema) => {
    return new Promise( (resolve, reject) => {
        if(validate(schema, data)) {
            try {
            axios({
                method: METHOD_POST,
                url: URL + path,
                responseType: RESPONSE_TYPE,
                headers: HEADERS,
                params: {},
                data: {
                    data: data
                }
            })
            .then(response => {
                processResult(response.data.result);
                resolve(response.data);
            })
            .catch(error => {
                processResult(error.response.data.result);
                reject(error.response.data);
            });
            } catch (error) {
                processResult(RESULT_SOMETHING_WRONG);
                reject(error);
            }
        }
    })
};

export const getOne = async (path, id) => {
    return new Promise( (resolve, reject) => {
        try {
            axios({
                method: METHOD_GET,
                url: URL + path + '/' + id,
                responseType: RESPONSE_TYPE,
                headers: HEADERS,
                params: {},
                data: {}
            })
            .then(response => {
                processGetResult(response.data.result);
                resolve(response.data);
            })
            .catch(error => {
                processResult(error.response.data.result);
                reject(error.response.data);
            });
        } catch (error) {
            processResult(RESULT_SOMETHING_WRONG);
            reject(error);
        }
    })
};

export const getMany = async (path, params) => {
    return new Promise( (resolve, reject) => {
        try {
            axios({
                method: METHOD_GET,
                url: URL + path,
                responseType: RESPONSE_TYPE,
                headers: HEADERS,
                params: params,
                data: {}
              })
            .then(response => {
                // processGetResult(response.data.result);
                resolve(response.data);
            })
            .catch(error => {
                // processResult(error.response.data.result);
                reject(error.response.data);
            });
        } catch (error) {
            processResult(RESULT_SOMETHING_WRONG);
            reject(error)
        }
    })
};


export const patchOne = async (path, id, data) => {
    return new Promise( (resolve, reject) => {
        try {
            axios({
                method: METHOD_PATCH,
                url: URL + path + '/' + id,
                responseType: RESPONSE_TYPE,
                headers: HEADERS,
                params: {},
                data: {
                    data: data
                }
            })
            .then(response => {
                processResult(response.data.result);
                resolve(response.data);
            })
            .catch(error => {
                processResult(error.response.data.result);
                reject(error.response.data);
            });
        } catch (error) {
            processResult(RESULT_SOMETHING_WRONG);
            reject(error);
        }
    })
};

export const deleteOne = async (path, id) => {
    return new Promise( (resolve, reject) => {
        try {
            axios({
                method: METHOD_DELETE,
                url: URL + path + '/' + id,
                responseType: RESPONSE_TYPE,
                headers: HEADERS,
                params: {},
                data: {}
            })
            .then(response => {
                processResult(response.data.result);
                resolve(response.data);
            })
            .catch(error => {
                processResult(error.response.data.result);
                reject(error.response.data);
            });
        } catch (error) {
            processResult(RESULT_SOMETHING_WRONG);
            reject(error);
        }
    })
};

export const search = async (path, term) => {
    return new Promise( (resolve, reject) => {
        try {
            axios({
                method: METHOD_GET,
                url: URL + path + "/search/" + term,
                responseType: RESPONSE_TYPE,
                headers: HEADERS,
                params: {},
                data: {}
              })
            .then(response => {
                processGetResult(response.data.result);
                resolve(response.data);
            })
            .catch(error => {
                processResult(error.response.data.result);
                reject(error.response.data);
            });
        } catch (error) {
            processResult(RESULT_SOMETHING_WRONG);
            reject(error)
        }
    })
};