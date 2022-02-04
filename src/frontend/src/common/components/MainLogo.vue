<template>
  <router-link :to="{ name: 'Home' }" class="logo">
    <img
      src="@/assets/img/logo.svg"
      alt="V!U!E! Pizza logo"
      width="90"
      height="40"
    />
  </router-link>
</template>

<script>
export default {
  name: "MainLogo",
};
</script>

<style lang="scss" scoped></style>
