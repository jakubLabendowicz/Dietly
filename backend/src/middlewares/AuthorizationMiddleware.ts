import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/TokenUtils';
import { RequestBuilder } from '../utils/RequestUtils';
import {
  ResponseBuilder,
  STATUS_UNAUTHORIZED,
  MESSAGE_WRONG_TOKEN
} from '../utils/ResponseUtils';

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer')) {
    const token = auth.slice(7);

    try {
      const tokenData = verifyAccessToken(token);
      req = new RequestBuilder(req)
      .withAuthorization(tokenData)
      .get()
      next();
    } catch (error) {
      res = new ResponseBuilder(res)
      .withStatus(STATUS_UNAUTHORIZED)
      .withResponseBodySuccess(false)
      .withResponseBodyMessage(MESSAGE_WRONG_TOKEN)
      .send();
    }
  } else {
    res = new ResponseBuilder(res)
    .withStatus(STATUS_UNAUTHORIZED)
    .withResponseBodySuccess(false)
    .withResponseBodyMessage(MESSAGE_WRONG_TOKEN)
    .send();
  }
}