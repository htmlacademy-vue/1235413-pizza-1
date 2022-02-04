<template>
  <span class="error">{{ error }}</span>
</template>

<script>
export default {
  name: "AppInputError",
  props: {
    error: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.error {
  color: red;
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  line-height: 16px;
  display: block;
  margin: 4px 0;
}
</style>
