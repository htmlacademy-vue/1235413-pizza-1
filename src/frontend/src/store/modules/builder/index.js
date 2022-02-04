import MutationTypes from "@/store/mutation-types";
import GetterTypes from "@/store/getter-types";
import { DEFAULT_PIZZA } from "@/common/constants";
import { getPizzaPrice } from "@/common/utils";
import { nanoid } from "nanoid";

const state = {
  pizza: DEFAULT_PIZZA,
};

const mutations = {
  [MutationTypes.setDefaultPizza](state) {
    state.pizza = {
      ...state.pizza,
      ...DEFAULT_PIZZA,
      ingredients: [],
      id: nanoid(),
    };
  },
  [MutationTypes.changePizzaFromCart](state, payload) {
    state.pizza = {
      ...payload,
      ingredients: payload.ingredients,
    };
  },
  [MutationTypes.changePizzaDough](state, payload) {
    state.pizza = {
      ...state.pizza,
      dough: { ...payload },
    };
  },
  [MutationTypes.changePizzaSize](state, payload) {
    state.pizza = {
      ...state.pizza,
      size: { ...payload },
    };
  },
  [MutationTypes.setPizzaName](state, payload) {
    state.pizza.name = payload;
  },
  [MutationTypes.changePizzaSauce](state, payload) {
    state.pizza = {
      ...state.pizza,
      sauce: { ...payload },
    };
  },
  [MutationTypes.addPizzaIngredient](state, payload) {
    const ingredientIndex = state.pizza.ingredients.findIndex(
      (item) => item.ingredientType === payload.ingredientType
    );
    if (state.pizza.ingredients.length === 0 || ingredientIndex === -1) {
      state.pizza.ingredients.push({ ...payload, amount: 1 });
      return;
    }
    state.pizza.ingredients[ingredientIndex].amount += 1;
  },
  [MutationTypes.removePizzaIngredient](state, payload) {
    const ingredientIndex = state.pizza.ingredients.findIndex(
      (item) => item.ingredientType === payload.ingredientType
    );
    state.pizza.ingredients[ingredientIndex].amount -= 1;
    if (state.pizza.ingredients[ingredientIndex].amount === 0) {
      state.pizza.ingredients.splice(ingredientIndex, 1);
    }
  },
};

const getters = {
  [GetterTypes.pizzaPrice]: (state) => getPizzaPrice(state.pizza),
};

const actions = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
