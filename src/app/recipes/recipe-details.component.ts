// ```
// recipes.component.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// recipes.component.js may be freely distributed under the MIT license
// ```

// # Recipes Component

import {Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from 'angular2/core';

import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import {RecipeService} from './recipe.service';
import {Recipe} from './recipe.store';
import {AppStore} from '../app.store';

import {Rating} from './rating.component';

@Component({
  selector: 'recipe-detail',
  template: require('./recipe-details.html'),
  directives: [Rating]
})
export class RecipeDetails {

  originalTitle: string;
  selectedRecipe: Recipe;

  // Assign our `recipe` to a locally scoped property
  // Perform additional logic on every update via ES6 setter
  // Create a copy of `_recipe` and assign it to `this.selectedRecipe`
  // which we will use to bind our form to
  @Input('recipe') set _recipe(value: Recipe) {

    if (value) this.originalTitle = value.title;
    this.selectedRecipe = Object.assign({}, value);

    // DEBUG
    console.log('this.selectedRecipe: ');
    console.log(this.selectedRecipe);
  }

  // Allow the user to save/delete a `recipe or cancel the
  // operation. Flow events up from here.
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  constructor() {

  }

  // Whenever the user needs to add a new `tag`, push an
  // empty `tag` object to the `tags` array on the
  // `selectedRecipe`
  newTag() {

    // blank `tag` object
    let tag = {
      name: ''
    };

    // Check to see if the `tags` array exists before
    // attempting to push a `tag` to it
    if (!this.selectedRecipe.tags)
      this.selectedRecipe.tags = [];

    this.selectedRecipe.tags.push(tag);
  }

  // Whenever the user needs to add a new `ingredient`, push an
  // empty `ingredient` object to the `ingredient` array on the
  // `selectedRecipe`
  newIngredient() {

    // blank `ingredient` object
    let ingredient = {
      amount: '',
      unit: '',
      name: ''
    };

    // Check to see if the `ingredients` array exists before
    // attempting to push an `ingredient` to it
    if (!this.selectedRecipe.ingredients)
      this.selectedRecipe.ingredients = [];

    this.selectedRecipe.ingredients.push(ingredient);
  }

  // Whenever the user needs to add a new `direction`, push an
  // empty `direction` object to the `direction` array on the
  // `selectedRecipe`
  newDirection() {

    // blank `direction` object
    let direction = {
      step: ''
    };

    // Check to see if the `directions` array exists before
    // attempting to push a `direction` to it
    if (!this.selectedRecipe.directions)
      this.selectedRecipe.directions = [];

    this.selectedRecipe.directions.push(direction);
  }

  onUpdate(value) {

    // Set the value of the selected recipe's rating to the
    // value passed up from the `rating` component
    this.selectedRecipe.rating = value;
  }

  deleteTag(tag) {
    // loop through all of the `tags` in the `selectedRecipe`
    for (let i = 0; i < this.selectedRecipe.tags.length; i++) {
      // if the `tag` at the current index matches that of the one
      // the user is trying to delete
      if (this.selectedRecipe.tags[i] === tag) {
        // delete the `tag` at the current index
        this.selectedRecipe.tags.splice(i, 1);
      }
    }
  }

  deleteIngredient(ingredient) {
    // loop through all of the `ingredients` in the `selectedRecipe`
    for (let i = 0; i < this.selectedRecipe.ingredients.length; i++) {
      // if the `ingredient` at the current index matches that of the one
      // the user is trying to delete
      if (this.selectedRecipe.ingredients[i] === ingredient) {
        // delete the `ingredient` at the current index
        this.selectedRecipe.ingredients.splice(i, 1);
      }
    }
  }

  deleteDirection(step) {
    // loop through all of the `directions` in the `selectedRecipe`
    for (let i = 0; i < this.selectedRecipe.directions.length; i++) {
      // if the `direction` at the current index matches that of the one
      // the user is trying to delete
      if (this.selectedRecipe.directions[i] === step) {
        // delete the `direction` at the current index
        this.selectedRecipe.directions.splice(i, 1);
      }
    }
  }
}
