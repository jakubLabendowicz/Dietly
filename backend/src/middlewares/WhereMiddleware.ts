import { Request, Response, NextFunction } from 'express';
import { RequestBuilder } from '../utils/RequestUtils';
import {
    ResponseBuilder,
    STATUS_INTERNAL_SERVER_ERROR,
    MESSAGE_INTERNAL_SERVER_ERROR
} from '../utils/ResponseUtils';


export const addWhere = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.query.where != undefined) {
            let where = "{" + req.query.where + "}";
            console.log(where);
            let jsonedString = JSON.parse(where);
            req = new RequestBuilder(req)
                .withWhere(jsonedString)
                .get()
        }
        next();
    }
    catch (error) {
        console.log(error);
        res = new ResponseBuilder(res)
            .withStatus(STATUS_INTERNAL_SERVER_ERROR)
            .withResponseBodySuccess(false)
            .withResponseBodyMessage(MESSAGE_INTERNAL_SERVER_ERROR)
            .send();
    }
}