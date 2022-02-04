<template>
  <form
    action="test.html"
    method="post"
    class="layout-form"
    @submit.prevent="onSubmit"
  >
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div
          v-if="!pizzas.length && !additionals.length"
          class="sheet cart__empty"
        >
          <p>В корзине нет ни одного товара</p>
        </div>

        <template v-if="pizzas.length || additionals.length">
          <ul v-if="pizzas.length" class="cart-list sheet">
            <CartCreatedPizza
              v-for="pizza in pizzas"
              :key="pizza.id"
              :pizza="pizza"
            />
          </ul>

          <div class="cart__additional">
            <ul v-if="additionals.length" class="additional-list">
              <CartAdditionals
                v-for="additional in additionals"
                :key="additional.name"
                :additional="additional"
              />
            </ul>
          </div>

          <div class="cart__form">
            <div class="cart-form">
              <label class="cart-form__select">
                <span class="cart-form__label">Получение заказа:</span>

                <select
                  name="test"
                  class="select"
                  @change="onDeliveryTypeChange"
                >
                  <option value="1">Заберу сам</option>
                  <option value="2">Новый адрес</option>
                  <option v-if="isLoggedIn" value="3">Дом</option>
                </select>
              </label>

              <label
                v-if="deliveryTypePickup || deliveryTypeNewAddress"
                class="input input--big-label"
              >
                <span>Контактный телефон:</span>
                <input
                  @change.prevent="onTelInput"
                  type="text"
                  name="tel"
                  placeholder="+7 999-999-99-99"
                />
                <AppInputError v-if="telError" :error="telError" />
              </label>

              <div
                v-if="deliveryTypeNewAddress || deliveryTypeExistingAddress"
                class="cart-form__address"
              >
                <span class="cart-form__label"
                  >{{
                    deliveryTypeExistingAddress ? "Существующий" : "Новый"
                  }}
                  адрес:</span
                >

                <div class="cart-form__input">
                  <label class="input">
                    <span>Улица*</span>
                    <input
                      v-model="order.address.street"
                      @change.prevent="onStreetInput"
                      type="text"
                      name="street"
                      :readonly="isLoggedIn && deliveryTypeExistingAddress"
                    />
                  </label>
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <label class="input">
                    <span>Дом*</span>
                    <input
                      v-model="order.address.building"
                      @change.prevent="onBuildingInput"
                      type="text"
                      name="house"
                      :readonly="isLoggedIn && deliveryTypeExistingAddress"
                    />
                  </label>
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <label class="input">
                    <span>Квартира</span>
                    <input
                      v-model="order.address.apt"
                      @change.prevent="onAptInput"
                      type="text"
                      name="apartment"
                      :readonly="isLoggedIn && deliveryTypeExistingAddress"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </main>
    <section class="footer">
      <div class="footer__more">
        <router-link
          :to="{ name: 'Home' }"
          class="button button--border button--arrow"
          >Хочу еще одну</router-link
        >
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ totalPrice }} ₽</b>
      </div>

      <div class="footer__submit">
        <button type="submit" class="button" :disabled="isDisabled">
          Оформить заказ
        </button>
      </div>
    </section>
    <CartSuccessPopup
      v-if="isPopupShown"
      @onSuccessPopupClose="onSuccessPopupClose"
    />
  </form>
</template>

<script>
import MutationTypes from "@/store/mutation-types";
import CartCreatedPizza from "@/modules/cart/CartCreatedPizza";
import CartAdditionals from "@/modules/cart/CartAdditionals";
import CartSuccessPopup from "@/modules/cart/CartSuccessPopup";
import { mapState, mapGetters } from "vuex";
import GetterTypes from "@/store/getter-types";
import { InputErrors, DeliveryTypes } from "@/common/enums";
import { telTransformationRegex, TEL_LENGTH } from "@/common/constants";
import { cartOrderValidator } from "@/common/utils";
export default {
  name: "CartView",
  components: {
    CartCreatedPizza,
    CartAdditionals,
    CartSuccessPopup,
  },
  data() {
    return {
      isPopupShown: false,
      order: {
        pizzas: [],
        additionals: [],
        address: {
          street: "",
          building: "",
          apt: "",
        },
        tel: "",
        delivery: 1,
      },
      telError: "",
    };
  },
  computed: {
    ...mapState({
      pizzas: (state) => state.cart.pizzas,
      additionals: (state) => state.cart.additionals,
    }),
    ...mapGetters({
      totalPrice: GetterTypes.totalPrice,
      isLoggedIn: GetterTypes.isLoggedIn,
    }),
    isDisabled() {
      return cartOrderValidator(this.order);
    },
    deliveryType() {
      return this.order.delivery;
    },
    deliveryTypePickup() {
      return this.deliveryType === DeliveryTypes.pickup;
    },
    deliveryTypeNewAddress() {
      return this.deliveryType === DeliveryTypes.newAddress;
    },
    deliveryTypeExistingAddress() {
      return this.deliveryType === DeliveryTypes.existingAddress;
    },
  },
  methods: {
    onTelInput(event) {
      const emptyTel = event.target.value === "";
      const telMatch = event.target.value.match(telTransformationRegex);
      const tel = telMatch !== null ? telMatch.join("") : "";

      if (tel.length === TEL_LENGTH || emptyTel) {
        this.order.tel = tel;
        this.telError = "";
        return;
      }
      this.order.tel = "";
      this.telError = InputErrors.tel;
    },
    onStreetInput(event) {
      this.order.address.street = event.target.value;
    },
    onBuildingInput(event) {
      this.order.address.building = event.target.value;
    },
    onAptInput(event) {
      this.order.address.apt = event.target.value;
    },
    onDeliveryTypeChange(event) {
      this.order.delivery = Number(event.target.value);
    },
    onSubmit() {
      if (!cartOrderValidator(this.order)) {
        this.isPopupShown = true;
        this.$store.commit(MutationTypes.addOrder, this.order);
      }
    },
    onSuccessPopupClose() {
      this.$store.commit(MutationTypes.resetCart);
    },
    setAddress() {
      if (this.isLoggedIn && this.order.delivery === 3) {
        this.order.address.street = "Test data";
        this.order.address.building = "666";
        this.order.address.apt = "13";
        return;
      }
      this.order.address.street = "";
      this.order.address.building = "";
      this.order.address.apt = "";
    },
  },
  watch: {
    deliveryType() {
      this.setAddress();
    },
  },
  mounted() {
    this.order.pizzas = this.pizzas;
    this.order.additionals = this.additionals;
    this.setAddress();
  },
};
</script>

<style lang="scss" scoped>
.input--big-label {
  position: relative;
}
.error {
  position: absolute;
  z-index: 2;
  bottom: -20px;
  right: -32px;
}
</style>
