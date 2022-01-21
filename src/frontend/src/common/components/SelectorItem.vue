<template>
  <AppDrag :transfer-data="ingredient" :is-draggable="isDraggable">
    <span
      class="filling"
      :class="[
        `filling--${ingredient.ingredientType}`,
        isDraggable && 'filling--draggable',
      ]"
      >{{ ingredient.name }}</span
    >
  </AppDrag>
</template>

<script>
import AppDrag from "@/common/components/AppDrag";
import { INGREDIENT_MAX_COUNT } from "@/common/constants";
export default {
  name: "SelectorItem",
  components: {
    AppDrag,
  },
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
    isDraggable() {
      return this.amount < INGREDIENT_MAX_COUNT;
    },
  },
};
</script>

<style lang="scss" scoped>
.filling--draggable:hover {
  cursor: grab;
}
</style>
