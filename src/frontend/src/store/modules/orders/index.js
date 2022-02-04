import MutationTypes from "@/store/mutation-types";
// import GetterTypes from "@/store/getter-types";

const state = {
  orders: [],
};

const mutations = {
  [MutationTypes.addOrder]: (state, payload) => {
    state.orders = [...state.orders, payload];
  },
};

const getters = {};

const actions = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
