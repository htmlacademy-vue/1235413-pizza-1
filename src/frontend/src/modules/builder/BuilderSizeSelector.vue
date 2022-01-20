<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="size in sizes"
          :key="size.sizeDescription"
          class="diameter__input"
          :class="`diameter__input--${size.sizeDescription}`"
        >
          <RadioButton
            type="radio"
            name="diameter"
            :value="size.sizeDescription"
            class="visually-hidden"
            @change="onSizeChange"
            :checked="size.sizeDescription === chosenSize"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
export default {
  name: "BuilderSizeSelector",
  components: {
    RadioButton,
  },
  props: {
    sizes: {
      type: Array,
      required: true,
    },
    chosenSize: {
      type: String,
      required: true,
    },
  },
  methods: {
    getSize(value) {
      return this.sizes.find((item) => item.sizeDescription === value);
    },
    onSizeChange(event) {
      this.$emit("onSizeChange", this.getSize(event.target.value));
    },
  },
};
</script>

<style lang="scss" scoped></style>
