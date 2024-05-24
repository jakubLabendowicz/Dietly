import express, { Router } from "express";
import { findMe, updateMe, deleteMe } from "../services/MeService";
import { PrismaClient } from "@prisma/client";
import { verifyUser } from "../middlewares/AuthorizationMiddleware";
import { RequestBuilder } from "../utils/RequestUtils";
import { getUserTargetNutrients } from "../utils/NutrientsUtils";

const object = new PrismaClient().user;
const include = {
  userBadges: { include: { badge: { include: { file: true } } } },
  userPersonalBests: { include: { personalBest: { include: { file: true } } } },
  file: true,
};

const router: Router = express.Router();
router.use(verifyUser);
router.use(async (req, res, next) => {
  req = new RequestBuilder(req).withInclude(include).get();
  next();
});

let findUserTargetNutrientsResponseBodyDataProcessor = (
  responseBodyData: any
) => {
  responseBodyData.data = getUserTargetNutrients(responseBodyData.data);
  return responseBodyData;
};
router.get("/targetNutrients/", async (req, res) => {
  findMe(req, res, object, findUserTargetNutrientsResponseBodyDataProcessor);
});

router.get("/", async (req, res) => {
  findMe(req, res, object);
});

router.patch("/", async (req, res) => {
  updateMe(req, res, object);
});

router.delete("/", async (req, res) => {
  deleteMe(req, res, object);
});

module.exports = router;
