import { fetchIngredients, ingredientsSlice, TIngredient, initialState } from "./ingredientsSlice";

describe("ingredientsSlice", () => {
  it("should change the state to loading while fetching ingredients", () => {
    
    expect(ingredientsSlice.reducer(initialState, { type: fetchIngredients.pending.type })).toEqual({
      data: [],
      isLoading: true,
      error: null,
    });
  });
  
  it("should add the fetched ingredients to the state", () => {
    const ingredients: TIngredient[] = [
      {
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
      },
    ];
   
    expect(ingredientsSlice.reducer(initialState, { type: fetchIngredients.fulfilled.type, payload: ingredients })).toEqual({
      data: ingredients,
      isLoading: false,
      error: null,
    });
  });
  
  it("should set the error message when ingredients fetching fails", () => {
    const error = "Something went wrong";
    
    expect(ingredientsSlice.reducer(initialState, { type: fetchIngredients.rejected.type, payload: error })).toEqual({
      data: [],
      isLoading: false,
      error: error,
    });
  });
});
