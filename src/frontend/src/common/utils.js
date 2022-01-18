import {
  Dough,
  SizesByMultiplier,
  Ingredients,
  Sauces,
} from "@/common/constants";

const getNoSpacedString = (string) => string.replace(" ", "");

export const getDough = (pizzaData) => {
  return pizzaData.dough.map((dough) => {
    return {
      ...dough,
      doughType: Dough[getNoSpacedString(dough.name)],
    };
  });
};

export const getSizes = (pizzaData) => {
  return pizzaData.sizes.map((size) => {
    return {
      ...size,
      sizeDescription: SizesByMultiplier[size.multiplier],
    };
  });
};

export const getIngredients = (pizzaData) => {
  return pizzaData.ingredients.map((ingredient) => {
    return {
      ...ingredient,
      ingredientType: Ingredients[getNoSpacedString(ingredient.name)],
    };
  });
};

export const getSauces = (pizzaData) => {
  return pizzaData.sauces.map((sauce) => {
    return {
      ...sauce,
      sauceType: Sauces[getNoSpacedString(sauce.name)],
    };
  });
};
