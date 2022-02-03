<template>
  <AppDrop @drop="onDrop">
    <div class="content__constructor">
      <div
        class="pizza"
        :class="`pizza--foundation--${doughSize}-${sauceType}`"
      >
        <div class="pizza__wrapper">
          <template v-for="ingredient in pizza.ingredients">
            <div
              :key="`${ingredient.ingredientType}-1`"
              class="pizza__filling"
              :class="`pizza__filling--${ingredient.ingredientType}`"
            ></div>
            <div
              v-if="isSecondFilling(ingredient.amount)"
              :key="`${ingredient.ingredientType}-2`"
              class="pizza__filling"
              :class="[
                `pizza__filling--${ingredient.ingredientType}`,
                `pizza__filling--second`,
              ]"
            ></div>
            <div
              v-if="isThirdFilling(ingredient.amount)"
              :key="`${ingredient.ingredientType}-3`"
              class="pizza__filling"
              :class="[
                `pizza__filling--${ingredient.ingredientType}`,
                `pizza__filling--third`,
              ]"
            ></div>
          </template>
        </div>
      </div>
    </div>
  </AppDrop>
</template>

<script>
import MutationTypes from "@/store/mutation-types";
import { INGREDIENT_ONE_COUNT, INGREDIENT_MAX_COUNT } from "@/common/constants";
import AppDrop from "@/common/components/AppDrop";
export default {
  name: "BuilderPizzaView",
  components: {
    AppDrop,
  },
  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },
  computed: {
    doughSize() {
      if (this.pizza.dough.doughType) {
        return this.pizza.dough.doughType === "light" ? "small" : "big";
      }
      return null;
    },
    sauceType() {
      return this.pizza.sauce.sauceType;
    },
  },
  methods: {
    onDrop(ingredient) {
      this.$store.commit(MutationTypes.addPizzaIngredient, ingredient);
    },
    isSecondFilling(amount) {
      return amount !== INGREDIENT_ONE_COUNT;
    },
    isThirdFilling(amount) {
      return amount === INGREDIENT_MAX_COUNT;
    },
  },
};
</script>

<style lang="scss" scoped></style>
