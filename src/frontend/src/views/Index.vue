<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughSelector
          :dough="dough"
          :chosen-dough="pizza.dough.chosen"
          @onDoughChange="onDoughChange"
        />

        <BuilderSizeSelector
          :sizes="sizes"
          :chosen-size="pizza.size.chosen"
          @onSizeChange="onSizeChange"
        />

        <BuilderIngredientsSelector
          :ingredients="ingredients"
          :sauces="sauces"
          :chosen-sauce="pizza.sauce.chosen"
          :chosen-ingredients="pizza.ingredients"
          @onSauceChange="onSauceChange"
          @addIngredient="addIngredient"
          @removeIngredient="removeIngredient"
        />

        <div class="content__pizza">
          <BuilderPizzaNameInput @onPizzaNameInput="onPizzaNameInput" />

          <BuilderPizzaView :pizza="pizza" @addIngredient="addIngredient" />

          <BuilderPriceCounter :pizza="pizza" />
        </div>
      </div>
    </form>
    <router-view />
  </main>
</template>

<script>
import pizza from "@/static/pizza.json";
import { getDough, getSizes, getIngredients, getSauces } from "@/common/utils";
import BuilderDoughSelector from "@/modules/builder/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/BuilderIngredientsSelector";
import BuilderPizzaNameInput from "@/modules/builder/BuilderPizzaNameInput";
import BuilderPizzaView from "@/modules/builder/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/BuilderPriceCounter";
export default {
  name: "IndexHome",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaNameInput,
    BuilderPizzaView,
    BuilderPriceCounter,
  },
  data() {
    return {
      dough: getDough(pizza),
      sizes: getSizes(pizza),
      ingredients: getIngredients(pizza),
      sauces: getSauces(pizza),
      pizza: {
        name: null,
        dough: {
          chosen: "light",
          price: 300,
        },
        size: {
          chosen: "small",
          priceMultiplier: 1,
        },
        ingredients: [],
        sauce: {
          chosen: "tomato",
          price: 50,
        },
      },
    };
  },
  methods: {
    onPizzaNameInput(pizzaName) {
      this.pizza.name = pizzaName;
    },
    onDoughChange(dough) {
      this.pizza.dough.chosen = dough.doughType;
      this.pizza.dough.price = dough.price;
    },
    onSizeChange(size) {
      this.pizza.size.chosen = size.sizeDescription;
      this.pizza.size.priceMultiplier = size.multiplier;
    },
    onSauceChange(sauce) {
      this.pizza.sauce.chosen = sauce.sauceType;
      this.pizza.sauce.price = sauce.price;
    },
    addIngredient(ingredient) {
      const ingredientIndex = this.pizza.ingredients.findIndex(
        (item) => item.ingredientType === ingredient.ingredientType
      );
      if (this.pizza.ingredients.length === 0 || ingredientIndex === -1) {
        this.pizza.ingredients.push({ ...ingredient, amount: 1 });
        return;
      }
      this.pizza.ingredients[ingredientIndex].amount =
        this.pizza.ingredients[ingredientIndex].amount + 1;
    },
    removeIngredient(ingredient) {
      const ingredientIndex = this.pizza.ingredients.findIndex(
        (item) => item.ingredientType === ingredient.ingredientType
      );
      this.pizza.ingredients[ingredientIndex].amount =
        this.pizza.ingredients[ingredientIndex].amount - 1;
      if (this.pizza.ingredients[ingredientIndex].amount === 0) {
        this.pizza.ingredients.splice(ingredientIndex, 1);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
