<template>
  <div class="overlay">
    <div class="sign-form">
      <router-link :to="{ name: 'Home' }" class="close close--white">
        <span class="visually-hidden">Закрыть форму авторизации</span>
      </router-link>
      <div class="sign-form__title">
        <h1 class="title title--small">Авторизуйтесь на сайте</h1>
      </div>
      <form action="test.html" method="post" @submit.prevent="onSubmit">
        <div class="sign-form__input">
          <label class="input">
            <span>E-mail</span>
            <input
              @change.prevent="onEmailInput"
              v-model="email"
              type="email"
              name="email"
              placeholder="example@mail.ru"
              required
              ref="emailInput"
            />
            <AppInputError v-if="emailError" :error="emailError" />
          </label>
        </div>

        <div class="sign-form__input">
          <label class="input">
            <span>Пароль</span>
            <input
              v-model="password"
              type="password"
              name="pass"
              placeholder="***********"
              required
              @change.prevent="onPasswordInput"
            />
            <AppInputError v-if="passwordError" :error="passwordError" />
          </label>
        </div>
        <button type="submit" class="button">Авторизоваться</button>
      </form>
    </div>
  </div>
</template>

<script>
import user from "@/static/user.json";
import { emailRegex, MIN_PASSWORD_LENGTH } from "@/common/constants";
import { InputErrors } from "@/common/enums";
import MutationTypes from "@/store/mutation-types";
import { mapGetters } from "vuex";
import GetterTypes from "@/store/getter-types";

export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: GetterTypes.isLoggedIn,
    }),
  },
  methods: {
    onEmailInput(event) {
      if (!event.target.value.toLowerCase().match(emailRegex)) {
        this.emailError = InputErrors.email;
        return;
      }
      this.emailError = "";
    },
    onPasswordInput(event) {
      if (event.target.value.length <= MIN_PASSWORD_LENGTH) {
        this.passwordError = InputErrors.password;
        return;
      }
      this.passwordError = "";
    },
    onSubmit() {
      if (this.passwordError || this.emailError) {
        return;
      }
      this.$store.commit(MutationTypes.loginStart);
      this.$store.commit(MutationTypes.loginSuccess, user);

      console.log("entered data:", {
        email: this.email,
        password: this.password,
      });

      this.$router.push({ name: "Home" });
    },
  },
  created() {
    if (this.isLoggedIn) {
      this.$router.push({ name: "Home" });
    }
  },
  mounted() {
    this.$refs.emailInput.focus();
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
