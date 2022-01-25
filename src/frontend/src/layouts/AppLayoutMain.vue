<template>
  <AppLayoutDefault>
    <main class="layout">
      <AppLayoutSidebar />
      <slot />
    </main>
  </AppLayoutDefault>
</template>

<script>
import AppLayoutDefault from "@/layouts/AppLayoutDefault";
import AppLayoutSidebar from "@/layouts/AppLayoutSidebar";
export default {
  name: "AppLayoutMain",
  components: {
    AppLayoutDefault,
    AppLayoutSidebar,
  },
};
</script>
