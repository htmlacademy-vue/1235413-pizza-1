import { nanoid } from "nanoid";

export const DATA_TRANSFER_PAYLOAD = "payload";
export const MOVE = "move";
export const INGREDIENT_MIN_COUNT = 0;
export const INGREDIENT_ONE_COUNT = 1;
export const INGREDIENT_MAX_COUNT = 3;
export const MIN_PASSWORD_LENGTH = 5;
export const TEL_LENGTH = 11;

/* eslint-disable */
export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;
export const telTransformationRegex = /\d/g;
/* eslint-enable */

export const DEFAULT_PIZZA = {
  name: null,
  amount: 1,
  id: nanoid(),
  dough: {
    doughType: "light",
    id: 1,
    name: "Тонкое",
    image: "/public/img/dough-light.svg",
    description: "Из твердых сортов пшеницы",
    price: 300,
  },
  size: {
    sizeDescription: "small",
    id: 1,
    name: "23 см",
    image: "/public/img/diameter.svg",
    multiplier: 1,
  },
  ingredients: [],
  sauce: {
    sauceType: "tomato",
    id: 1,
    name: "Томатный",
    price: 50,
  },
};
