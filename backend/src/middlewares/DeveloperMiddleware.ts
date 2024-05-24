import { Request, Response, NextFunction } from 'express';

export const showStatus = async (req: Request, res: Response, next: NextFunction) => {
    console.log('REQUEST\t' + req.method + ' ' + req.headers.host + req.url + ' ' + JSON.stringify(req.body) + ' ' + JSON.stringify(req.params));
    console.log('RESPONSE\t' + res.statusCode + '\n');
    next();
}