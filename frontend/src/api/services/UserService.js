import axios from 'axios';
import {
    METHOD_POST,
    URL,
    RESPONSE_TYPE,
} from '../utils/RequestUtils';
import { processResult, RESULT_SOMETHING_WRONG } from '../utils/ResponseUtils';
import { validate } from '../utils/ValidationUtils';

export const postOneUser = async (path, data, schema) => {
    return new Promise( (resolve, reject) => {
        if(validate(schema, data)) {
            try {
            axios({
                method: METHOD_POST,
                url: URL + path,
                responseType: RESPONSE_TYPE,
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
                processResult(error.response.data);
                reject(error.response.data);
            });
            } catch (error) {
                processResult(RESULT_SOMETHING_WRONG);
                reject(error);
            }
        }
    })
};