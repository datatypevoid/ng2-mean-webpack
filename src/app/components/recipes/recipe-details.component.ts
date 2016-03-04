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
import {Recipe} from './recipes.reducer';
import {AppStore} from '../../app.store';

import {Rating} from './rating.component';

@Component({
  selector: 'recipe-detail',
  template: `
  <div class="recipe-card">
    <div>
      <h2 *ngIf="selectedRecipe._id">Editing {{originalTitle}}</h2>
      <h2 *ngIf="!selectedRecipe._id">Create New Recipe</h2>
    </div>
    <div>
      <form novalidate>
          <div>
            <label>Recipe Title</label>
            <input [(ngModel)]="selectedRecipe.title"
              placeholder="Enter a title" type="text">
          </div>
          <div>
            <label>Tags</label>
            <button (click)="newTag()">
                Add new tag
            </button>
            <div *ngFor="#tag of selectedRecipe.tags">
              <input [(ngModel)]="tag.name" placeholder="Enter a tag"
              type="text">
              <button (click)="deleteTag(tag)">
                X
              </button>
            </div>
          </div>
          <div>
            <label>Description</label>
            <input [(ngModel)]="selectedRecipe.description"
              placeholder="Enter a description" type="text">
          </div>
          <div>
            <label>Rating</label>
            <rating [rate]="selectedRecipe.rating"
              (updateRate)="onUpdate($event)"></rating>
            <input [(ngModel)]="selectedRecipe.rating"
              placeholder="Enter a rating" type="text">
          </div>
          <div>
            <label>Creator</label>
            <input [(ngModel)]="selectedRecipe.creator"
              placeholder="Enter a username" type="text">
          </div>
          <div>
            <label>Ingredients</label>
            <button (click)="newIngredient()">
                Add an Ingredient <i class="glyphicon glyphicon-plus"></i>
            </button>
            <div *ngFor="#ingredient of selectedRecipe.ingredients">
              <input [(ngModel)]="ingredient.amount"
                placeholder="Amount?" type="text">
              <input [(ngModel)]="ingredient.unit"
                placeholder="Units?" type="text">
              <input [(ngModel)]="ingredient.name"
                placeholder="Name?" type="text">
              <i (click)="deleteIngredient(ingredient)"
                class="glyphicon glyphicon-remove">
              </i>
            </div>
          </div>
          <div>
            <label>Directions</label>
            <button (click)="newDirection()">
                Add a Step in the Process
            </button>
            <div *ngFor="#direction of selectedRecipe.directions">
              <input [(ngModel)]="direction.step"
                placeholder="Enter a step" type="text">
              <button (click)="deleteDirection(step)">
                X
              </button>
            </div>
          </div>
      </form>
    </div>
    <div>
        <button type="submit" (click)="cancelled.emit(selectedRecipe)">
          Cancel
        </button>
        <button type="submit" (click)="saved.emit(selectedRecipe)">
          Save
        </button>
    </div>
  </div>
  `,
  directives: [Rating]
})
export class RecipeDetails {

  // Assign our `recipe` to a locally scoped property
  // Perform additional logic on every update via ES6 setter
  // Create a copy of `_recipe` and assign it to `this.selectedRecipe`
  // which we will use to bind our form to
  @Input('recipe') set _recipe(value: Recipe) {

    if (value) this.originalTitle = value.title;
    this.selectedRecipe = Object.assign({}, value);
  }
  originalTitle: string;
  selectedRecipe: Recipe;

  // Allow the user to save/delete an item or cancel the
  // operation. Flow events up from here.
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  constructor() {

  }

  // Whenever the user needs to add a new `tag`, push an
  // empty `tag` object to the `tags` array on the
  // `selectedRecipe`
  newTag() {
    this.selectedRecipe.tags.push({
      name: ''
    });
  }

  // Whenever the user needs to add a new `ingredient`, push an
  // empty `ingredient` object to the `ingredient` array on the
  // `selectedRecipe`
  newIngredient() {
    this.selectedRecipe.ingredients.push({
      amount: '',
      unit: '',
      name: ''
    });
  }

  // Whenever the user needs to add a new `direction`, push an
  // empty `direction` object to the `direction` array on the
  // `selectedRecipe`
  newDirection() {
    this.selectedRecipe.directions.push({
      step: ''
    });
  }

  onUpdate(value) {

    this.selectedRecipe.rating = value;
  }

  deleteTag(tag) {
    // loop through all of the `tags` in the `selectedRecipe`
    for (let i = 0; i < this.selectedRecipe.tags.length; i++) {
      // if the `tag` at the current index matches that of the one
      // the user is trying to delete
      if(this.selectedRecipe.tags[i] == tag) {
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
      if (this.selectedRecipe.ingredients[i] == ingredient) {
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
      if (this.selectedRecipe.directions[i] == step) {
        // delete the `direction` at the current index
        this.selectedRecipe.directions.splice(i, 1);
      }
    }
  }
}
