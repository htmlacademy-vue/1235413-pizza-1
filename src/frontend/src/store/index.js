import Vue from "vue";
import Vuex from "vuex";
import builder from "@/store/modules/builder";
import cart from "@/store/modules/cart";
import auth from "@/store/modules/auth";
import orders from "@/store/modules/orders";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    builder,
    cart,
    auth,
    orders,
  },
});
