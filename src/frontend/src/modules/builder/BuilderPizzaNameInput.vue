<template>
  <label class="input">
    <span class="visually-hidden">Название пиццы</span>
    <input
      type="text"
      name="pizza_name"
      @input.prevent="setPizzaName"
      placeholder="Введите название пиццы"
    />
  </label>
</template>

<script>
export default {
  name: "BuilderPizzaNameInput",
  methods: {
    setPizzaName(event) {
      this.$emit("onPizzaNameInput", event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped></style>
