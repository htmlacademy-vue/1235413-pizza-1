<template>
  <label class="input">
    <span class="visually-hidden">Название пиццы</span>
    <input
      type="text"
      name="pizza_name"
      @input.prevent="setPizzaName"
      placeholder="Введите название пиццы"
      :value="pizza.name"
    />
  </label>
</template>

<script>
import MutationTypes from "@/store/mutation-types";
export default {
  name: "BuilderPizzaNameInput",
  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },
  methods: {
    setPizzaName(event) {
      this.$store.commit(MutationTypes.setPizzaName, event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped></style>
