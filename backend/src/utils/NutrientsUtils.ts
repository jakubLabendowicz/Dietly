export const getRecipeProductWithNutrients = (recipeProduct: any) => {
  let recipeProductNutrients: any = [];
  for (let productNutrient of recipeProduct.product.productNutrients) {
    let recipeProductNutrient = {
      nutrientId: 0,
      quantity: 0,
      nutrient: {},
    };
    recipeProductNutrient.quantity =
      productNutrient.quantity * (recipeProduct.quantity / 100);
    recipeProductNutrient.nutrient = productNutrient.nutrient;
    recipeProductNutrient.nutrientId = productNutrient.nutrientId;
    recipeProductNutrients.push(recipeProductNutrient);
  }

  recipeProduct.recipeProductNutrients = recipeProductNutrients;
  return recipeProduct;
};

export const getRecipeProductsWithNutrients = (recipeProducts: any) => {
  let recipeProductsWithNutrients = [];
  for (let recipeProduct of recipeProducts) {
    recipeProductsWithNutrients.push(
      getRecipeProductWithNutrients(recipeProduct)
    );
  }
  return recipeProductsWithNutrients;
};

const getRecipeNutrientsMap = (recipeProducts: any) => {
  let recipeNutrientsMap: any = [];
  for (let recipeProduct of recipeProducts) {
    for (const recipeProductNutrient of recipeProduct.recipeProductNutrients) {
      if (recipeNutrientsMap[recipeProductNutrient.nutrientId]) {
        recipeNutrientsMap[recipeProductNutrient.nutrientId].push(
          recipeProductNutrient
        );
      } else {
        recipeNutrientsMap[recipeProductNutrient.nutrientId] = [
          recipeProductNutrient,
        ];
      }
    }
  }
  recipeNutrientsMap = recipeNutrientsMap.filter(function (el: any) {
    return el != null;
  });
  return recipeNutrientsMap;
};

export const getRecipeWithNutrients = (recipe: any) => {
  recipe.recipeProducts = getRecipeProductsWithNutrients(recipe.recipeProducts);
  let recipeNutrientsMap = getRecipeNutrientsMap(recipe.recipeProducts);

  let recipeNutrients: any = [];
  for (let recipeNutrientsMapElement of recipeNutrientsMap) {
    let recipeNutrient: any = undefined;
    if (recipeNutrientsMapElement !== null) {
      for (const recipeNutrientsMapElementNutrient of recipeNutrientsMapElement) {
        if (recipeNutrient !== undefined) {
          recipeNutrient.quantity =
            recipeNutrient.quantity +
            recipeNutrientsMapElementNutrient.quantity;
        } else {
          recipeNutrient = recipeNutrientsMapElementNutrient;
        }
      }
    }
    recipeNutrients.push(recipeNutrient);
  }
  recipe.recipeNutrients = recipeNutrients;
  return recipe;
};

export const getUserMealProductWithNutrients = (userMealProduct: any) => {
  let userMealProductNutrients: any = [];
  for (let productNutrient of userMealProduct.product.productNutrients) {
    let userMealProductNutrient = {
      nutrientId: 0,
      quantity: 0,
      nutrient: {},
    };
    userMealProductNutrient.quantity =
      productNutrient.quantity * (userMealProduct.quantity / 100);
    userMealProductNutrient.nutrient = productNutrient.nutrient;
    userMealProductNutrient.nutrientId = productNutrient.nutrientId;
    userMealProductNutrients.push(userMealProductNutrient);
  }

  userMealProduct.userMealProductNutrients = userMealProductNutrients;
  return userMealProduct;
};

export const getUserMealProductsWithNutrients = (userMealProducts: any) => {
  let userMealProductsWithNutrients = [];
  for (let userMealProduct of userMealProducts) {
    userMealProductsWithNutrients.push(
      getUserMealProductWithNutrients(userMealProduct)
    );
  }
  return userMealProductsWithNutrients;
};

export const getUserMealRecipeWithNutrients = (userMealRecipe: any) => {
  userMealRecipe.recipe = getRecipeWithNutrients(userMealRecipe.recipe);
  let userMealRecipeNutrients: any = [];
  for (let recipeNutrient of userMealRecipe.recipe.recipeNutrients) {
    let userMealRecipeNutrient = {
      nutrientId: 0,
      quantity: 0,
      nutrient: {},
    };
    userMealRecipeNutrient.quantity =
      recipeNutrient.quantity * (userMealRecipe.quantity / 100);
    userMealRecipeNutrient.nutrient = recipeNutrient.nutrient;
    userMealRecipeNutrient.nutrientId = recipeNutrient.nutrientId;
    userMealRecipeNutrients.push(userMealRecipeNutrient);
  }

  userMealRecipe.userMealRecipeNutrients = userMealRecipeNutrients;
  return userMealRecipe;
};

export const getUserMealRecipesWithNutrients = (userMealRecipes: any) => {
  let userMealRecipesWithNutrients: any = [];
  for (let userMealRecipe of userMealRecipes) {
    userMealRecipesWithNutrients.push(
      getUserMealRecipeWithNutrients(userMealRecipe)
    );
  }
  return userMealRecipesWithNutrients;
};

const getUserMealNutrientsMap = (
  userMealProducts: any,
  userMealRecipes: any
) => {
  let userMealNutrientsMap: any = [];
  for (let userMealProduct of userMealProducts) {
    for (const userMealProductNutrient of userMealProduct.userMealProductNutrients) {
      if (userMealNutrientsMap[userMealProductNutrient.nutrientId]) {
        userMealNutrientsMap[userMealProductNutrient.nutrientId].push(
          userMealProductNutrient
        );
      } else {
        userMealNutrientsMap[userMealProductNutrient.nutrientId] = [
          userMealProductNutrient,
        ];
      }
    }
  }
  for (let userMealRecipe of userMealRecipes) {
    for (const userMealRecipeNutrient of userMealRecipe.userMealRecipeNutrients) {
      if (userMealNutrientsMap[userMealRecipeNutrient.nutrientId]) {
        userMealNutrientsMap[userMealRecipeNutrient.nutrientId].push(
          userMealRecipeNutrient
        );
      } else {
        userMealNutrientsMap[userMealRecipeNutrient.nutrientId] = [
          userMealRecipeNutrient,
        ];
      }
    }
  }
  userMealNutrientsMap = userMealNutrientsMap.filter(function (el: any) {
    return el != null;
  });
  return userMealNutrientsMap;
};

export const getUserMealWithNutrients = (userMeal: any) => {
  userMeal.userMealProducts = getUserMealProductsWithNutrients(
    userMeal.userMealProducts
  );
  userMeal.userMealRecipes = getUserMealRecipesWithNutrients(
    userMeal.userMealRecipes
  );
  let userMealNutrientsMap = getUserMealNutrientsMap(
    userMeal.userMealProducts,
    userMeal.userMealRecipes
  );

  let userMealNutrients: any = [];
  for (let userMealNutrientsMapElement of userMealNutrientsMap) {
    let userMealNutrient: any = undefined;
    if (userMealNutrientsMapElement !== null) {
      for (const userMealNutrientsMapElementNutrient of userMealNutrientsMapElement) {
        if (userMealNutrient !== undefined) {
          userMealNutrient.quantity =
            userMealNutrient.quantity +
            userMealNutrientsMapElementNutrient.quantity;
        } else {
          userMealNutrient = userMealNutrientsMapElementNutrient;
        }
      }
    }
    userMealNutrients.push(userMealNutrient);
  }
  userMeal.userMealNutrients = userMealNutrients;
  return userMeal;
};

export const getUserMealsWithNutrients = (userMeals: any) => {
  let userMealWithNutrients: any = [];
  for (let userMeal of userMeals) {
    userMealWithNutrients.push(getUserMealWithNutrients(userMeal));
  }
  return userMealWithNutrients;
};

const getUserMealsNutrientsMap = (userMeals: any) => {
  let userMealsNutrientsMap: any = [];
  for (let userMeal of userMeals) {
    for (const userMealNutrient of userMeal.userMealNutrients) {
      if (userMealsNutrientsMap[userMealNutrient.nutrientId]) {
        userMealsNutrientsMap[userMealNutrient.nutrientId].push(
          userMealNutrient
        );
      } else {
        userMealsNutrientsMap[userMealNutrient.nutrientId] = [userMealNutrient];
      }
    }
  }
  userMealsNutrientsMap = userMealsNutrientsMap.filter(function (el: any) {
    return el != null;
  });
  return userMealsNutrientsMap;
};

export const getUserMealsNutrients = (userMeals: any) => {
  userMeals = getUserMealsWithNutrients(userMeals);
  let userMealsNutrientsMap = getUserMealsNutrientsMap(userMeals);

  let userMealsNutrients: any = [];
  for (let userMealsNutrientsMapElement of userMealsNutrientsMap) {
    let userMealsNutrient: any = undefined;
    if (userMealsNutrientsMapElement !== null) {
      for (const userMealsNutrientsMapElementNutrient of userMealsNutrientsMapElement) {
        if (userMealsNutrient !== undefined) {
          userMealsNutrient.quantity =
            userMealsNutrient.quantity +
            userMealsNutrientsMapElementNutrient.quantity;
        } else {
          userMealsNutrient = userMealsNutrientsMapElementNutrient;
        }
      }
    }
    userMealsNutrients.push(userMealsNutrient);
  }
  return userMealsNutrients;
};

export const getUserTargetNutrients = (user: any) => {
  let userTargetEnergy: any = 0;
  let userTargetProtein: any = 0;
  let userTargetProteinKcal: any = 0;
  let userTargetFat: any = 0;
  let userTargetFatKcal: any = 0;
  let userTargetCarbohydrate: any = 0;
  let userTargetCarbohydrateKcal: any = 0;
  let userTargetSalt: any = 0;
  let age = new Date().getFullYear() - user.yearOfBirth;

  if (user.sex === "male") {
    userTargetEnergy = 661.8 - (9.53 * age) + ((user.activeLevel-1)*(3/25)+1) * (15.91 * user.weight + 539.6 * user.height/100);
  } else {
    userTargetEnergy = 354.1 - (6.91 * age) + ((user.activeLevel-1)*(3/25)+1) * (9.36 * user.weight + 726 * user.height/100);
  }
  
  if (user.weight < user.targetWeight) {
    userTargetEnergy+=250;
    userTargetProtein=2*user.weight;
    userTargetProteinKcal=userTargetProtein*4;
    userTargetFatKcal=userTargetEnergy*0.3;
    userTargetFat=userTargetFatKcal/9;

  } else {
    userTargetEnergy-=user.weight*10;
    userTargetProtein=2.5*user.weight;
    userTargetProteinKcal=userTargetProtein*4;
    userTargetFatKcal=userTargetEnergy*0.2;
    userTargetFat=userTargetFatKcal/9;
    
  }
  userTargetCarbohydrateKcal=userTargetEnergy-userTargetFatKcal-userTargetProteinKcal;
  userTargetCarbohydrate=userTargetCarbohydrateKcal/4;
  let userTargetNutrients: any = [
    {
        code: "ENERGY",
        target:userTargetEnergy,
        min: 0.8*userTargetEnergy,
        max: 1.2*userTargetEnergy,
    },
    {
        code: "FAT",
        target:userTargetFat,
        min: 0.8*userTargetFat,
        max: 1.2*userTargetFat,
    },
    {
        code: "CARBOHYDRATE",
        target:userTargetCarbohydrate,
        min: 0.8*userTargetCarbohydrate,
        max: 1.2*userTargetCarbohydrate,

    },
    {
        code: "PROTEIN",
        target:userTargetProtein,
        min: 0.8*userTargetProtein,
        max: 1.2*userTargetProtein,

    },
    {
        code: "SALT",
        target:0,
        min: 0,
        max: 0,
    },
  ];
  return userTargetNutrients;
};
