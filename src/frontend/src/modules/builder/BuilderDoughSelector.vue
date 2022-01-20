<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
          v-for="doughType in dough"
          :key="doughType.doughType"
          class="dough__input"
          :class="`dough__input--${doughType.doughType}`"
        >
          <RadioButton
            type="radio"
            name="dought"
            :value="doughType.doughType"
            class="visually-hidden"
            @change="onDoughChange"
            :checked="doughType.doughType === chosenDough"
          />
          <b>{{ doughType.name }}</b>
          <span>{{ doughType.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
export default {
  name: "BuilderDoughSelector",
  components: {
    RadioButton,
  },
  props: {
    dough: {
      type: Array,
      required: true,
    },
    chosenDough: {
      type: String,
      required: true,
    },
  },
  methods: {
    getDough(value) {
      return this.dough.find((item) => item.doughType === value);
    },
    onDoughChange(event) {
      this.$emit("onDoughChange", this.getDough(event.target.value));
    },
  },
};
</script>

<style lang="scss" scoped></style>
