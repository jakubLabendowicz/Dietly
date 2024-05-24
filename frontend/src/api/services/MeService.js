import axios from 'axios';
import {
    METHOD_GET,
    METHOD_PATCH,
    METHOD_DELETE,
    URL,
    RESPONSE_TYPE,
    HEADERS
} from '../utils/RequestUtils';
import { processGetResult, processResult, RESULT_SOMETHING_WRONG } from '../utils/ResponseUtils';

export const getOneMe = async (path) => {
    return new Promise( (resolve, reject) => {
        try {
            axios({
                method: METHOD_GET,
                url: URL + path,
                responseType: RESPONSE_TYPE,
                headers: HEADERS,
                params: {},
                data: {}
              })
            .then(response => {
                processGetResult(response.data.result);
                localStorage.setItem("displayTheme", response.data.data.displayTheme);
                localStorage.setItem("displayLanguage", response.data.data.displayLanguage);
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


export const patchOneMe = async (path, data) => {
    return new Promise( (resolve, reject) => {
        try {
            axios({
                method: METHOD_PATCH,
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
    })
};

export const deleteOneMe = async (path) => {
    return new Promise( (resolve, reject) => {
        try {
            axios({
                method: METHOD_DELETE,
                url: URL + path,
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

