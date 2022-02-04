import MutationTypes from "@/store/mutation-types";
import GetterTypes from "@/store/getter-types";
import { getPizzaPrice, getAdditionalsTotalPrice } from "@/common/utils";

const state = {
  pizzas: [],
  additionals: [],
};

const mutations = {
  [MutationTypes.addPizzaIntoCart](state, payload) {
    const pizzaIndex = state.pizzas.findIndex(
      (pizza) => pizza.id === payload.id
    );
    if (pizzaIndex !== -1) {
      state.pizzas.splice(pizzaIndex, 1);
    }
    state.pizzas = [...state.pizzas, { ...payload }];
  },
  [MutationTypes.setAdditionals](state, payload) {
    state.additionals = payload.map((load) => {
      return { ...load, amount: 1 };
    });
  },
  [MutationTypes.addAdditionals](state, payload) {
    const additional = state.additionals.find(
      (additional) => additional.id === payload.id
    );
    additional.amount += 1;
  },
  [MutationTypes.removeAdditionals](state, payload) {
    const additionalIndex = state.additionals.findIndex(
      (additional) => additional.id === payload.id
    );
    state.additionals[additionalIndex].amount -= 1;
  },
  [MutationTypes.addPizza](state, payload) {
    const pizza = state.pizzas.find((pizza) => pizza.id === payload.id);
    pizza.amount += 1;
  },
  [MutationTypes.removePizza](state, payload) {
    const pizzaIndex = state.pizzas.findIndex(
      (pizza) => pizza.id === payload.id
    );
    state.pizzas[pizzaIndex].amount -= 1;
    if (state.pizzas[pizzaIndex].amount === 0) {
      state.pizzas.splice(pizzaIndex, 1);
    }
  },
  [MutationTypes.resetCart](state) {
    state.pizzas = [];
    state.additionals = [];
  },
};

const getters = {
  [GetterTypes.pizzasPrice]: (state) => {
    const allPrice = state.pizzas.length
      ? state.pizzas.reduce((acc, pizza) => acc + getPizzaPrice(pizza), 0)
      : 0;
    return allPrice;
  },
  [GetterTypes.totalPrice]: (state, getters) => {
    return (
      getters[GetterTypes.pizzasPrice] +
      getAdditionalsTotalPrice(state.additionals)
    );
  },
};

const actions = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
