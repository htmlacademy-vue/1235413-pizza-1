import MutationTypes from "@/store/mutation-types";
import GetterTypes from "@/store/getter-types";

const state = {
  isLoading: false,
  currentUser: null,
  isLoggedIn: false,
};

const mutations = {
  [MutationTypes.loginStart]: (state) => {
    state.isLoading = true;
  },
  [MutationTypes.loginSuccess]: (state, payload) => {
    state.isLoading = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [MutationTypes.loginFailure]: (state) => {
    state.isLoading = false;
    state.isLoggedIn = false;
  },
  [MutationTypes.logout]: (state) => {
    state.currentUser = null;
    state.isLoggedIn = false;
  },
};

const getters = {
  [GetterTypes.currentUser]: (state) => {
    return state.currentUser;
  },
  [GetterTypes.isLoggedIn]: (state) => {
    return state.isLoggedIn;
  },
  [GetterTypes.isAnonymous]: (state) => {
    return state.isLoggedIn === false;
  },
};

const actions = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
