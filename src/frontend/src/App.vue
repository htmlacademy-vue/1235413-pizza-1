<template>
  <div id="app">
    <VuePizzaIndex />
  </div>
</template>

<script>
import VuePizzaIndex from "@/views/Index";
export default {
  name: "App",
  components: {
    VuePizzaIndex,
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
