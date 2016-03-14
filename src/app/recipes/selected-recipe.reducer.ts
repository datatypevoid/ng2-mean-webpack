// ```
// selected-recipe.reducer.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// selected-recipe.reducer.js may be freely distributed under the MIT license
// ```

// # Redux interface/reducer for `recipes`

// The `selected recipe` reducer handles the currently
// selected recipe
export const selectedRecipe = (state: any = null, {type, payload}) => {

  // DEBUG
  console.log('selected recipe reducer hit! type: ');
  console.log(type);
  console.log('payload: ');
  console.log(payload);
  console.log('state: ');
  console.log(state);

  switch (type) {

    // When an `event` from our store is dispatched with an action
    // type of `SELECT_RECIPE`, it will hit this switch case
    case 'SELECT_RECIPE':
      return payload;

    default:
      return state;
  }
};
