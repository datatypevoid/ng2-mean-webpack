// ```
// recipes.store.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// recipes.store.js may be freely distributed under the MIT license
// ```

// # Redux store for `recipes`

export interface Recipe {
  _id: number;
  tags: Array<Object>;
  title: string;
  description: string;
  rating: number;
  creator: string;
  ingredients: Array<Object>;
  directions: Array<Object>;
};
