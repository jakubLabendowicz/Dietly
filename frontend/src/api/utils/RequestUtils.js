import { getToken } from "./TokenUtils";

export const METHOD_POST = 'post';
export const METHOD_GET = 'get';
export const METHOD_PATCH = 'patch';
export const METHOD_DELETE = 'delete';
export const URL = 'http://localhost:8080/api/v1/';
export const RESPONSE_TYPE = 'stream';
export const HEADERS = {
    Authorization : `Bearer ${getToken()}`
};