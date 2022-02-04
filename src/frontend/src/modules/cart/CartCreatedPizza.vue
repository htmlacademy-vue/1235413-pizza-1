<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="pizza.name"
      />
      <div class="product__text">
        <h2>{{ pizza.name }}</h2>
        <ul>
          <li>{{ pizza.size.name }}, {{ dough }}</li>
          <li>Соус: {{ sauce }}</li>
          <li v-if="ingredients.length">Начинка: {{ ingredients }}</li>
        </ul>
      </div>
    </div>

    <ItemCounter
      class="cart-list__counter"
      :isCart="true"
      :product="pizza"
      :amount="pizza.amount"
      @onMinusClick="onRemovePizzaClick"
      @onPlusClick="onAddPizzaClick"
    />

    <div class="cart-list__price">
      <b>{{ price }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button
        type="button"
        class="cart-list__edit"
        @click.prevent="onChangePizzaButtonClick"
      >
        Изменить
      </button>
    </div>
  </li>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter";
import {
  getPizzaPrice,
  getDoughDescription,
  getListofIngredients,
} from "@/common/utils";
import MutationTypes from "@/store/mutation-types";

export default {
  name: "CartCreatedPizza",
  components: {
    ItemCounter,
  },
  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },
  computed: {
    dough() {
      return getDoughDescription(this.pizza.dough.doughType);
    },
    sauce() {
      return this.pizza.sauce.name.toLowerCase();
    },
    ingredients() {
      return getListofIngredients(this.pizza.ingredients);
    },
    price() {
      return getPizzaPrice(this.pizza);
    },
  },
  methods: {
    onChangePizzaButtonClick() {
      this.$store.commit(MutationTypes.changePizzaFromCart, this.pizza);
      this.$router.push({ name: "Home" });
    },
    onAddPizzaClick() {
      this.$store.commit(MutationTypes.addPizza, this.pizza);
    },
    onRemovePizzaClick() {
      this.$store.commit(MutationTypes.removePizza, this.pizza);
    },
  },
};
</script>

<style lang="scss" scoped></style>
