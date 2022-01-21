<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <RadioButton
          v-for="doughType in dough"
          :key="doughType.doughType"
          type="radio"
          name="dought"
          :value="doughType.doughType"
          :class-name="['dough__input', `dough__input--${doughType.doughType}`]"
          @change="onDoughChange"
          :checked="doughType.doughType === chosenDough"
        >
          <b>{{ doughType.name }}</b>
          <span>{{ doughType.description }}</span>
        </RadioButton>
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
