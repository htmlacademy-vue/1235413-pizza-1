<template>
  <div class="overlay">
    <div class="popup">
      <a href="#" class="close" @click.prevent="onCloseClick">
        <span class="visually-hidden">Закрыть попап</span>
      </a>
      <div class="popup__title">
        <h2 class="title">Спасибо за заказ</h2>
      </div>
      <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
      <div class="popup__button">
        <a href="#" class="button" @click.prevent="onCloseClick" ref="success"
          >Отлично, я жду!</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import GetterTypes from "@/store/getter-types";
export default {
  name: "CartSuccessPopup",
  computed: {
    ...mapGetters({
      isLoggedIn: GetterTypes.isLoggedIn,
    }),
  },
  methods: {
    onCloseClick() {
      this.$emit("onSuccessPopupClose");
      if (this.isLoggedIn) {
        this.$router.push({ name: "Orders" });
        return;
      }
      this.$router.push({ name: "Home" });
    },
  },
  mounted() {
    this.$refs.success.focus();
  },
};
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 2;
}
</style>
