<template>
  <div class="content__result">
    <p>Итого: {{ pizzaPrice }} ₽</p>
    <button type="button" class="button" :disabled="!isReadyToCook">
      Готовьте!
    </button>
  </div>
</template>

<script>
export default {
  name: "BuilderPriceCounter",
  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },
  computed: {
    pizzaPrice() {
      const ingredientsPrice = this.pizza.ingredients.length
        ? this.pizza.ingredients.reduce(
            (acc, ingredient) => acc + ingredient.price * ingredient.amount,
            0
          )
        : 0;
      const pizzaPrice =
        (ingredientsPrice + this.pizza.dough.price + this.pizza.sauce.price) *
        this.pizza.size.priceMultiplier;
      return pizzaPrice;
    },
    isReadyToCook() {
      return this.pizza.name &&
        this.pizza.dough.chosen &&
        this.pizza.sauce.chosen &&
        this.pizza.size.chosen
        ? true
        : false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
