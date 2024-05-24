import express, { Router } from 'express';
import { createOne, findOne, findMany, updateOne, deleteOne } from '../services/StandardService';
import { PrismaClient } from '@prisma/client';
import { verifyUser } from '../middlewares/AuthorizationMiddleware';
import { RequestBuilder } from '../utils/RequestUtils';
import { addWhere } from '../middlewares/WhereMiddleware';
import { addPagination } from '../middlewares/PaginationMiddleware';
import { addOrder } from '../middlewares/OrderMiddleware';
import { getUserMealsNutrients, getUserMealWithNutrients } from '../utils/NutrientsUtils';

const object = new PrismaClient().userMeal;
const include = {
    userMealProducts: {
        include: {
            product: {
                include: {
                    file: true,
                    unit: true,
                    productNutrients: {
                        include: {
                            nutrient: {
                                include: {
                                    unit: true
                                }
                            }
                        }
                    }
                }
            },
            unit: true
        }
    },
    userMealRecipes: {
        include: {
            recipe: {
                include: {
                    file: true,
                    unit: true,
                    recipeProducts: {
                        include: {
                            product: {
                                include: {
                                    file: true,
                                    productNutrients: {
                                        include: {
                                            nutrient: {
                                                include: {
                                                    unit: true
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            unit: true
        }
    },
    user: true
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

let findNutrientsResponseBodyDataProcessor = (responseBodyData: any) => {
    responseBodyData.data = getUserMealsNutrients(responseBodyData.data);
    return responseBodyData;
}
router.get("/nutrients/", async (req, res) => {
    findMany(req, res, object, findNutrientsResponseBodyDataProcessor);
})

router.post("/", async (req, res) => {
    if (req.body.data) {
        req.body.data.ownerId = req.body.authorization.id;
    }
    createOne(req, res, object);
})

let findOneResponseBodyDataProcessor = (responseBodyData: any) => {
    responseBodyData.data = getUserMealWithNutrients(responseBodyData.data);
    return responseBodyData;
}
router.get("/:id", async (req, res) => {
    findOne(req, res, object, findOneResponseBodyDataProcessor);
})

router.get("/", async (req, res) => {
    findMany(req, res, object);
})

router.patch("/:id", async (req, res) => {
    updateOne(req, res, object);
})

router.delete("/:id", async (req, res) => {
    deleteOne(req, res, object);
})

module.exports = router