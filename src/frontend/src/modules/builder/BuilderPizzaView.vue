<template>
  <AppDrop @drop="onDrop">
    <div class="content__constructor">
      <div
        class="pizza"
        :class="`pizza--foundation--${doughSize}-${sauceType}`"
      >
        <div class="pizza__wrapper">
          <div
            v-for="ingredient in pizza.ingredients"
            :key="ingredient.ingredientType"
            class="pizza__filling"
            :class="`pizza__filling--${ingredient.ingredientType}`"
          ></div>
        </div>
      </div>
    </div>
  </AppDrop>
</template>

<script>
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
      if (this.pizza.dough.chosen) {
        return this.pizza.dough.chosen === "light" ? "small" : "big";
      }
      return null;
    },
    sauceType() {
      return this.pizza.sauce.chosen;
    },
  },
  methods: {
    onDrop(ingredient) {
      this.$emit("addIngredient", ingredient);
    },
  },
};
</script>

<style lang="scss" scoped></style>
