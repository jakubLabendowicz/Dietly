import express, { Router } from 'express';
import {createOne, findOne, findMany, updateOne, deleteOne } from '../services/StandardService';
import { PrismaClient} from '@prisma/client';
import { verifyUser } from '../middlewares/AuthorizationMiddleware';
import { RequestBuilder } from '../utils/RequestUtils';
import { addWhere } from '../middlewares/WhereMiddleware';
import { addPagination } from '../middlewares/PaginationMiddleware';
import { addOrder } from '../middlewares/OrderMiddleware';

const object = new PrismaClient().userActiveDiet;
const include = {
    diet:{include: {owner: true, file: true, dietMeals: {include: {dietMealRecipes: true, dietMealProducts: true}}}},
    user:true
};

const router: Router = express.Router();
router.use(verifyUser);
router.use(addWhere);
router.use(addPagination);
router.use(addOrder);
router.use(async (req, res, next) => {
    req = new RequestBuilder(req)
    .withInclude(include)
    .get();
    next();
})
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