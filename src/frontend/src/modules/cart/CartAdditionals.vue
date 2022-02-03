<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img
        :src="require(`@/assets/img/${image}`)"
        width="39"
        height="60"
        :alt="name"
      />
      <span>{{ name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <ItemCounter
        class="additional-list__counter"
        :isCart="true"
        :product="additional"
        :amount="additional.amount"
        @onMinusClick="onRemoveAdditionalClick"
        @onPlusClick="onAddAdditionalClick"
      />
      <div class="additional-list__price">
        <b>× {{ price }} ₽</b>
      </div>
    </div>
  </li>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter";
import { getAdditionalsImages } from "@/common/utils";
import MutationTypes from "@/store/mutation-types";
export default {
  name: "CartAdditionals",
  components: {
    ItemCounter,
  },
  props: {
    additional: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      name: this.additional.name,
      image: getAdditionalsImages(this.additional.image),
      price: this.additional.price,
    };
  },
  methods: {
    onAddAdditionalClick(additional) {
      this.$store.commit(MutationTypes.addAdditionals, additional);
    },
    onRemoveAdditionalClick(additional) {
      this.$store.commit(MutationTypes.removeAdditionals, additional);
    },
  },
};
</script>

<style lang="scss" scoped></style>
