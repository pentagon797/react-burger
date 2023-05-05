import { configureStore } from "@reduxjs/toolkit";
import { TIngredient } from "./ingredientsSlice";

import burgerConstructorSlice, {
  addConstructorElement,
  clearArray,
  removeConstructorElement,
  sortArray,
} from "./constructorSlice";

const store = configureStore({
  reducer: {
    burgerConstructor: burgerConstructorSlice,
  },
});

const testIngredient: TIngredient = {
  _id:"643d69a5c3f7b9001cfa093e",
  name:"Филе Люминесцентного тетраодонтимформа",
  type:"main",
  proteins:44,
  fat:26,
  carbohydrates:85,
  calories:643,
  price:988,
  image:"https://code.s3.yandex.net/react/code/meat-03.png",
  image_mobile:"https://code.s3.yandex.net/react/code/meat-03-mobile.png",
  image_large:"https://code.s3.yandex.net/react/code/meat-03-large.png",
  __v:0
};

describe("burgerConstructorSlice", () => {
  beforeEach(() => {
    store.dispatch(clearArray());
  });

  it("should add a bun and ingredients", () => {
    store.dispatch(
      addConstructorElement({
        _id:"643d69a5c3f7b9001cfa093c",
        name:"Краторная булка N-200i",
        type:"bun",
        proteins:80,
        fat:24,
        carbohydrates:53,
        calories:420,
        price:1255,
        image:"https://code.s3.yandex.net/react/code/bun-02.png",
        image_mobile:"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        image_large:"https://code.s3.yandex.net/react/code/bun-02-large.png",
        __v:0
      })
    );

    store.dispatch(
      addConstructorElement(testIngredient)
    );

    expect(store.getState().burgerConstructor.bun).toBeDefined();
    expect(store.getState().burgerConstructor.ingredients.length).toBe(1);
  });

  it("should remove an ingredient", () => {
    store.dispatch(
      addConstructorElement(testIngredient)
    );

    const ingredientToRemove = store.getState().burgerConstructor.ingredients[0];

    store.dispatch(removeConstructorElement({ id: ingredientToRemove.id }));

    expect(store.getState().burgerConstructor.ingredients.length).toBe(0);
  });

  it("should sort the ingredients", () => {
    store.dispatch(
      addConstructorElement(testIngredient)
    );

    store.dispatch(
      addConstructorElement(testIngredient)
    );

    const start = 0;
    const end = 1;

    store.dispatch(sortArray([start, end]));

    const ingredients = store.getState().burgerConstructor.ingredients;

    expect(ingredients[0].name).toBe("Филе Люминесцентного тетраодонтимформа");
    expect(ingredients[1].name).toBe("Филе Люминесцентного тетраодонтимформа");
  });

  it("should return the number of matching ingredients", () => {
    store.dispatch(
      addConstructorElement(testIngredient)
    );

    store.dispatch(
      addConstructorElement(testIngredient)
    );

    store.dispatch(
      addConstructorElement(testIngredient)
    );

    store.dispatch(
      addConstructorElement(testIngredient)
    );

    store.dispatch(
      addConstructorElement(testIngredient)
    );
    const matchingCount = store.getState().burgerConstructor.ingredients
     .filter((ingr) => ingr.name === "Филе Люминесцентного тетраодонтимформа").length;
     
    expect(matchingCount).toBe(5);
  });
});
