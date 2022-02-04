<template>
  <div class="layout__sidebar sidebar">
    <MainLogo class="layout__logo" />

    <router-link
      :to="{ name: 'Orders' }"
      class="layout__link"
      active-class="layout__link--active"
      >История заказов</router-link
    >
    <router-link
      :to="{ name: 'Profile' }"
      class="layout__link"
      active-class="layout__link--active"
      >Мои данные</router-link
    >
  </div>
</template>

<script>
export default {
  name: "AppLayoutSidebar",
};
</script>

<style lang="scss" scoped></style>
