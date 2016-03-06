// Import our `Recipe` interface
import {Recipe} from './components/recipes/recipes.reducer';

// We are dealing with a single object that has:
//   * An `recipes` collection
//   * A `selectedRecipe` property holding a single `Recipe`
export interface AppStore {

    recipes: Recipe[];
    selectedRecipe: Recipe;

    // If ever you were to desire more functionality, you
    // could expand the `store` with new `key, value` pairs
    // to accomodate the updated model
    //
    // . . .
    //
};
