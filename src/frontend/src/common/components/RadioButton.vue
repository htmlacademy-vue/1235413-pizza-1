<template>
  <label :class="className">
    <input
      type="radio"
      :name="name"
      :value="value"
      @change="onChange"
      class="visually-hidden"
      :checked="checked"
    />
    <slot />
  </label>
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: "",
    },
    className: {
      type: Array,
      required: true,
    },
    checked: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    onChange(event) {
      this.$emit("change", event);
    },
  },
};
</script>

<style lang="scss" scoped></style>
