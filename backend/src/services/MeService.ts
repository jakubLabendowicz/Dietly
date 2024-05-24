import express, { Request, Response, NextFunction, Router } from 'express';
const bcrypt = require("bcrypt");
import {
    ResponseBuilder,
    STATUS_CREATED,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    MESSAGE_CREATED_USER,
    MESSAGE_UPDATED_USER,
    MESSAGE_FIND_USER,
    MESSAGE_DELETED_USER,
    MESSAGE_INTERNAL_SERVER_ERROR,
    MESSAGE_NOT_FOUND_RECORD
} from '../utils/ResponseUtils';

export const updateMe = async (req: Request, res: Response, object:any) => {
    try {
        const id = req.body.authorization.id;
        if(req.body.data.password !== undefined) {
            const salt:string = await bcrypt.genSalt(Number(process.env.SALT));
            const hashPassword = await bcrypt.hash(req.body.data.password, salt);
            req.body.data.password = hashPassword;
        };
        const record = await object.update({
            where: {
                id: Number(id),
            },
            data: req.body.data
          })
          res = new ResponseBuilder(res)
          .withStatus(STATUS_OK)
          .withResponseBodyData(record)
          .withResponseBodySuccess(true)
          .withResponseBodyMessage(MESSAGE_UPDATED_USER)
          .send();
    } catch (error) {
        res = new ResponseBuilder(res)
        .withStatus(STATUS_INTERNAL_SERVER_ERROR)
        .withResponseBodySuccess(false)
        .withResponseBodyMessage(MESSAGE_INTERNAL_SERVER_ERROR)
        .send();
    }
}

export const findMe = async (req: Request, res: Response, object:any, responseBodyDataProcessor: any = undefined) => {
    try {
        const id = req.body.authorization.id;
        await object.update({
            where: {
                id: Number(id),
            },
            data: {
                views: {increment: 1}
            }
          })
        let record = null;
        if(req.body.include != undefined) {
            record = await object.findUnique({
                where: {
                    id: Number(id),
                },
                include: req.body.include,
            })
        } else {
            record = await object.findUnique({
                where: {
                    id: Number(id),
                },
            })
        }
        if (record == null){
            return res = new ResponseBuilder(res)
            .withStatus(STATUS_NOT_FOUND)
            .withResponseBodySuccess(false)
            .withResponseBodyMessage(MESSAGE_NOT_FOUND_RECORD)
            .send();
        }
        res = new ResponseBuilder(res)
        .withStatus(STATUS_OK)
        .withResponseBodyData(record)
        .withResponseBodyDataProcessor(responseBodyDataProcessor)
        .withResponseBodySuccess(true)
        .withResponseBodyMessage(MESSAGE_FIND_USER)
        .send();
    } catch (error) {
        res = new ResponseBuilder(res)
        .withStatus(STATUS_INTERNAL_SERVER_ERROR)
        .withResponseBodySuccess(false)
        .withResponseBodyMessage(MESSAGE_INTERNAL_SERVER_ERROR)
        .send();
    }
}

export const deleteMe = async (req: Request, res: Response, object:any) => {
    try {
        const id = req.body.authorization.id;
        const record = await object.delete({
            where: {
                id: Number(id),
            },
        })
        res = new ResponseBuilder(res)
        .withStatus(STATUS_OK)
        .withResponseBodyData(record)
        .withResponseBodySuccess(true)
        .withResponseBodyMessage(MESSAGE_DELETED_USER)
        .send();
    } catch (error) {
        res = new ResponseBuilder(res)
        .withStatus(STATUS_INTERNAL_SERVER_ERROR)
        .withResponseBodySuccess(false)
        .withResponseBodyMessage(MESSAGE_INTERNAL_SERVER_ERROR)
        .send();
    }
}