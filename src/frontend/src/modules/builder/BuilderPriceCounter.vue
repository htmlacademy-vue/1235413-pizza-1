<template>
  <div class="content__result">
    <p>Итого: {{ pizzaPrice }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="!isReadyToCook"
      @click.prevent="onCookButtonClick"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import GetterTypes from "@/store/getter-types";
import MutationTypes from "@/store/mutation-types";
export default {
  name: "BuilderPriceCounter",
  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      pizzaPrice: GetterTypes.pizzaPrice,
    }),
    isReadyToCook() {
      return this.pizza.name &&
        this.pizza.dough.doughType &&
        this.pizza.sauce.sauceType &&
        this.pizza.size.sizeDescription &&
        Boolean(this.pizza.ingredients.length)
        ? true
        : false;
    },
  },
  methods: {
    onCookButtonClick() {
      this.$store.commit(MutationTypes.addPizzaIntoCart, this.pizza);
      this.$store.commit(MutationTypes.setDefaultPizza);
    },
  },
};
</script>

<style lang="scss" scoped></style>
