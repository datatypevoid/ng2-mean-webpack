// ```
// recipe-list.component.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// recipe-list.component.js may be freely distributed under the MIT license
// ```

// # Recipe List

import {Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy} from 'angular2/core';

import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import {RecipeService} from './recipe.service';
import {Recipe} from './recipe.store';
import {AppStore} from '../app.store';

import {Rating} from './rating.component';

@Component({
  selector: 'recipe-list',
  template: require('./recipe-list.html'),
  directives: [Rating]
})
export class RecipeList {
  // The `recipe` component hands off `recipes` and `selectedrecipe`
  // via property bindings to its child components
  // Here we pick up the `recipes` collection by annotating our local
  // `recipes` property with `@Input()`
  @Input() recipes: Recipe[];
  // Two event outputs for when a recipe is selected or deleted
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
