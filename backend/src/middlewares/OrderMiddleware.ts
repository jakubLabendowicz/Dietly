import { Request, Response, NextFunction } from 'express';
import { RequestBuilder } from '../utils/RequestUtils';
import {
    ResponseBuilder,
    STATUS_INTERNAL_SERVER_ERROR,
    MESSAGE_INTERNAL_SERVER_ERROR
} from '../utils/ResponseUtils';


export const addOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.query.orderBy != undefined || req.query.arrange != undefined) {
            let order = "id";
            let arrange = "desc";
            if (req.query.orderBy != undefined) order = String(req.query.orderBy);
            if (req.query.arrange != undefined) arrange = String(req.query.arrange);
            let orderBy = JSON.parse('{"' + order + '":"' + arrange + '"}');
            req = new RequestBuilder(req)
                .withOrderBy(orderBy)
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