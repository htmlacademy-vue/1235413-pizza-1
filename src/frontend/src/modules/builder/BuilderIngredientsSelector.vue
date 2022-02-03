<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>
          <RadioButton
            v-for="sauce in sauces"
            :key="sauce.sauceType"
            :class-name="['radio', 'ingredients__input']"
            type="radio"
            name="sauce"
            :value="sauce.sauceType"
            @change="onSauceChange"
            :checked="sauce.sauceType === chosenSauce"
          >
            <span>{{ sauce.name }}</span>
          </RadioButton>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              v-for="ingredient in ingredients"
              :key="ingredient.ingredientType"
              class="ingredients__item"
            >
              <SelectorItem
                :ingredient="ingredient"
                :amount="getAmount(ingredient)"
              />

              <ItemCounter
                :product="ingredient"
                :amount="getAmount(ingredient)"
                @onMinusClick="onRemoveIngredientClick"
                @onPlusClick="onAddIngredientClick"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MutationTypes from "@/store/mutation-types";
import RadioButton from "@/common/components/RadioButton";
import ItemCounter from "@/common/components/ItemCounter";
import SelectorItem from "@/common/components/SelectorItem";
export default {
  name: "BuilderIngredientsSelector",
  components: {
    RadioButton,
    ItemCounter,
    SelectorItem,
  },
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
    sauces: {
      type: Array,
      required: true,
    },
    chosenIngredients: {
      type: Array,
      required: true,
    },
    chosenSauce: {
      type: String,
      required: true,
    },
  },
  methods: {
    getSauce(value) {
      return this.sauces.find((item) => item.sauceType === value);
    },
    onSauceChange(event) {
      this.$store.commit(
        MutationTypes.changePizzaSauce,
        this.getSauce(event.target.value)
      );
    },
    onAddIngredientClick(ingredient) {
      this.$store.commit(MutationTypes.addPizzaIngredient, ingredient);
    },
    onRemoveIngredientClick(ingredient) {
      this.$store.commit(MutationTypes.removePizzaIngredient, ingredient);
    },
    getAmount(ingredient) {
      const element = this.chosenIngredients.find(
        (item) => item.ingredientType === ingredient.ingredientType
      );
      return element ? element.amount : 0;
    },
  },
};
</script>

<style lang="scss" scoped></style>
