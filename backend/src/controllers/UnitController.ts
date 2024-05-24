import express, { Router } from 'express';
import {createOne, findOne, findMany, updateOne, deleteOne } from '../services/StandardService';
import { PrismaClient} from '@prisma/client';
import { verifyUser } from '../middlewares/AuthorizationMiddleware';
import { addWhere } from '../middlewares/WhereMiddleware';
import { addPagination } from '../middlewares/PaginationMiddleware';
import { addOrder } from '../middlewares/OrderMiddleware';

const object = new PrismaClient().unit;

const router: Router = express.Router();
router.use(verifyUser);
router.use(addWhere);
router.use(addPagination);
router.use(addOrder);
router.post("/", async (req, res) => {
    createOne(req, res, object);
})

router.get("/:id",  async (req, res) => {
    findOne(req, res, object);
})

router.get("/",  async (req, res) => {
    findMany(req, res, object);
})

router.patch("/:id",  async (req, res) => {
    updateOne(req, res, object);
})

router.delete("/:id",  async (req, res) => {
    deleteOne(req, res, object);
})

module.exports = router