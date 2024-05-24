import express, { Router } from 'express';
import { createUser } from '../services/UserService';
import { findOne, findMany, updateOne, deleteOne } from '../services/StandardService';
import { PrismaClient} from '@prisma/client';
import { verifyUser } from '../middlewares/AuthorizationMiddleware';
import { RequestBuilder } from '../utils/RequestUtils';
import { getUserTargetNutrients } from '../utils/NutrientsUtils';

const object = new PrismaClient().user;
const include = {
    userBadges: {include:{badge: {include:{file:true}}}},
    userPersonalBests: {include:{personalBest: {include:{file:true}}}},
    file:true
};

const router: Router = express.Router();
router.use(async (req, res, next) => {
    req = new RequestBuilder(req)
    .withInclude(include)
    .get();
    next();
})

router.post("/", async (req, res) => {
    createUser(req, res);
})

router.get("/:id", verifyUser, async (req, res) => {
    findOne(req, res, object);
})

router.get("/", verifyUser, async (req, res) => {
    findMany(req, res, object);
})

router.patch("/:id", verifyUser, async (req, res) => {
    updateOne(req, res, object);
})

router.delete("/:id", verifyUser, async (req, res) => {
    deleteOne(req, res, object);
})

module.exports = router