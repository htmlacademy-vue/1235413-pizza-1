<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughSelector
          :dough="dough"
          :chosen-dough="pizza.dough.doughType"
        />

        <BuilderSizeSelector
          :sizes="sizes"
          :chosen-size="pizza.size.sizeDescription"
        />

        <BuilderIngredientsSelector
          :ingredients="ingredients"
          :sauces="sauces"
          :chosen-sauce="pizza.sauce.sauceType"
          :chosen-ingredients="pizza.ingredients"
        />

        <div class="content__pizza">
          <BuilderPizzaNameInput :pizza="pizza" />

          <BuilderPizzaView :pizza="pizza" />

          <BuilderPriceCounter :pizza="pizza" />
        </div>
      </div>
    </form>
    <router-view />
  </main>
</template>

<script>
import pizza from "@/static/pizza.json";
import additionals from "@/static/misc.json";

import MutationTypes from "@/store/mutation-types";
import { mapState } from "vuex";

import { getDough, getSizes, getIngredients, getSauces } from "@/common/utils";
import BuilderDoughSelector from "@/modules/builder/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/BuilderIngredientsSelector";
import BuilderPizzaNameInput from "@/modules/builder/BuilderPizzaNameInput";
import BuilderPizzaView from "@/modules/builder/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/BuilderPriceCounter";
export default {
  name: "IndexHome",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaNameInput,
    BuilderPizzaView,
    BuilderPriceCounter,
  },
  data() {
    return {
      dough: getDough(pizza),
      sizes: getSizes(pizza),
      ingredients: getIngredients(pizza),
      sauces: getSauces(pizza),
    };
  },
  computed: {
    ...mapState({
      pizza: (state) => state.builder.pizza,
      additionals: (state) => state.cart.additionals,
    }),
  },
  created() {
    if (!this.additionals.length) {
      this.$store.commit(MutationTypes.setAdditionals, additionals);
    }
  },
};
</script>

<style lang="scss" scoped></style>
