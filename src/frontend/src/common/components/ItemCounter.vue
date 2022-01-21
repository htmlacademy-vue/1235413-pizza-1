<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click="onMinusClick"
      :disabled="isMinAmount"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" :value="amount" />
    <button
      type="button"
      class="counter__button counter__button--plus"
      @click="onPlusClick"
      :disabled="isMaxAmount"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
import { INGREDIENT_MIN_COUNT, INGREDIENT_MAX_COUNT } from "@/common/constants";
export default {
  name: "ItemCounter",
  props: {
    ingredient: {
      type: Object,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  computed: {
    isMinAmount() {
      return this.amount === INGREDIENT_MIN_COUNT;
    },
    isMaxAmount() {
      return this.amount === INGREDIENT_MAX_COUNT;
    },
  },
  methods: {
    onMinusClick() {
      this.$emit("onMinusClick", this.ingredient);
    },
    onPlusClick() {
      this.$emit("onPlusClick", this.ingredient);
    },
  },
};
</script>

<style lang="scss" scoped></style>
