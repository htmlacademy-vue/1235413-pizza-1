import { Dough, SizesByMultiplier, Ingredients, Sauces } from "@/common/enums";

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

export const getPizzaPrice = (pizza) => {
  const ingredientsPrice = pizza.ingredients.length
    ? pizza.ingredients.reduce(
        (acc, ingredient) => acc + ingredient.price * ingredient.amount,
        0
      )
    : 0;
  const pizzaPrice =
    (ingredientsPrice + pizza.dough.price + pizza.sauce.price) *
    pizza.size.multiplier *
    pizza.amount;
  return pizzaPrice;
};

export const getAdditionalsTotalPrice = (additionals) => {
  const additionalsPrice = additionals.length
    ? additionals.reduce(
        (acc, additional) => acc + additional.price * additional.amount,
        0
      )
    : 0;
  return additionalsPrice;
};

export const getListofIngredients = (ingredients) => {
  return ingredients
    .map((ingredient) => ingredient.name.toLowerCase())
    .join(", ");
};

export const getDoughDescription = (doughType) => {
  switch (doughType) {
    case Dough["Тонкое"]:
      return "на тонком тесте";
    case Dough["Толстое"]:
      return "на толстом тесте";
    default:
      return "на тонком тесте";
  }
};

export const getAdditionalsImages = (imagePath) => {
  return imagePath.replace("/public/img/", "");
};

export const cartOrderValidator = (order) => {
  return !(
    (order.delivery === 1 && order.tel) ||
    (order.delivery === 2 &&
      order.address.street &&
      order.address.building &&
      order.address.apt &&
      order.tel) ||
    order.delivery === 3
  );
};
