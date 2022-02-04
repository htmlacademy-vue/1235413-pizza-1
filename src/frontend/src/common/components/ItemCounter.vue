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
    minAmount: {
      type: Number,
      required: false,
      default: 0,
    },
    maxAmount: {
      type: Number,
      required: false,
      default: Infinity,
    },
    isCart: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isMinAmount() {
      return this.amount === this.minAmount;
    },
    isMaxAmount() {
      return this.amount === this.maxAmount;
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
