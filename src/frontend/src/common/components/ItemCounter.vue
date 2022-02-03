<template>
  <div
    :class="{
      counter: true,
      'counter--orange ingredients__counter': !isCart,
    }"
  >
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click="onMinusClick"
      :disabled="isMinAmount"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="amount"
      readonly
    />
    <button
      type="button"
      :class="{
        counter__button: true,
        'counter__button--plus': true,
        'counter__button--orange': isCart,
      }"
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
    product: {
      type: Object,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    isCart: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isMinAmount() {
      return this.amount === INGREDIENT_MIN_COUNT;
    },
    isMaxAmount() {
      return !this.isCart ? this.amount === INGREDIENT_MAX_COUNT : false;
    },
  },
  methods: {
    onMinusClick() {
      this.$emit("onMinusClick", this.product);
    },
    onPlusClick() {
      this.$emit("onPlusClick", this.product);
    },
  },
};
</script>

<style lang="scss" scoped></style>
