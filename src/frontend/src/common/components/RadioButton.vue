<template>
  <input
    type="radio"
    :name="name"
    :value="value"
    @change="onChange"
    :class="className"
    :checked="checked"
  />
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
      type: String,
      default: "",
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
