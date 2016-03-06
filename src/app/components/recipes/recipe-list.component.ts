// # Items List

import {Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy} from 'angular2/core';

import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import {RecipeService} from './recipe.service';
import {Recipe} from './recipes.reducer';
import {AppStore} from '../../app.store';

import {Rating} from './rating.component';

@Component({
  selector: 'recipe-list',
  template: `
  <div *ngFor="#recipe of recipes" (click)="selected.emit(recipe)"
    class="recipe-card">
    <div>
      <h2>{{recipe.title}}</h2>
    </div>
    <ul class="list-inline">
      <li *ngFor="#tag of recipe.tags">
        <span class="label label-warning">
          #{{tag.name}}
        </span>
      </li>
    </ul>
    <div>
      <rating [interactive]="false" [rate]="recipe.rating"></rating>
      {{recipe.rating}}
    </div>
    <div>
      {{recipe.creator}}
    </div>
    <div>
      {{recipe.description}}
    </div>
    <ul>
      <li *ngFor="#ingredient of recipe.ingredients">
        {{ ingredient.amount }} {{ ingredient.unit}} {{ ingredient.name }}
      </li>
    </ul>
    <ol>
      <li *ngFor="#direction of recipe.directions">
        {{ direction.step }}
      </li>
    </ol>
    <div>
      <button (click)="deleted.emit(recipe); $event.stopPropagation();">
        <i>close</i>
      </button>
    </div>
  </div>
  `,
  directives: [Rating]
})
export class RecipeList {
  // The `recipe` component hands off `recipes` and `selectedrecipe`
  // via property bindings to its child components
  // Here we pick up the items collection by annotating our local
  // `recipes` property with `@Input()`
  @Input() recipes: Recipe[];
  // Two event outputs for when an item is selected or deleted
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
