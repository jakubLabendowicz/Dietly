import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/TokenUtils';
import { RequestBuilder } from '../utils/RequestUtils';
import {
    ResponseBuilder,
    STATUS_INTERNAL_SERVER_ERROR,
    MESSAGE_INTERNAL_SERVER_ERROR
} from '../utils/ResponseUtils';


export const addPagination = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.query.page != undefined || req.query.take != undefined) {
            let skip = 0;
            let take = 10;
            if(req.query.take != undefined)     take = Number(req.query.take);
            if(req.query.page != undefined)     skip = take * (Number(req.query.page) - 1);
            req = new RequestBuilder(req)
                .withSkip(skip)
                .withTake(take)
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