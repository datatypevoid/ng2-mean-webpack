// ```
// recipe.service.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// recipe.service.js may be freely distributed under the MIT license
// ```

// # Recipe Service

import {Http, Headers} from 'angular2/http';
import {Store} from '@ngrx/store';
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

import {Recipe} from './recipe.store';
import {AppStore} from '../app.store';

const HEADER = {
  headers: new Headers({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class RecipeService {

  recipes: Observable<Array<Recipe>>;

  // Inject the `AppStore` into the constructor with a type of `AppStore`
  constructor(private http: Http, private store: Store<AppStore>) {

    // Bind an observable of our `recipes` to `RecipeService`
    // Since this is essentially a `key, value` system, we can
    // set our `recipes` by calling `store.select('recipes')`
    this.recipes = store.select('recipes');
  }

  loadRecipes() {

        this.http.get('/api/recipe')
            // map the `HTTP` response from `raw` to `JSON` format
            // using `RxJs`
            // Reference: https://github.com/Reactive-Extensions/RxJS
            .map(res => res.json())
            // call `map` again to create the object we want to dispatch
            // to our reducer
            // This combo of `map` method calls is an observable sequence
            // in that every result gets passed through this sequence of
            // operations
            .map(payload => ({ type: 'ADD_RECIPES', payload }))
            // Subscribe to this sequence and hand off control to the
            // reducer by dispatching the transformed results
            .subscribe(action => this.store.dispatch(action));
    }

    saveRecipe(recipe: Recipe) {

        (recipe._id) ? this.updateRecipe(recipe) : this.createRecipe(recipe);
    }

    createRecipe(recipe: Recipe) {

        this.http.post('/api/recipe', JSON.stringify(recipe), HEADER)
            .map(res => res.json())
            .map(payload => ({ type: 'CREATE_RECIPE', payload }))
            .subscribe(action => this.store.dispatch(action));
    }

    updateRecipe(recipe: Recipe) {

        this.http.put(`/api/recipe/${recipe._id}`, JSON.stringify(recipe), HEADER)
          // Dispatch action to reducer in subscribe block here
          .subscribe(action => this.store.dispatch({ type: 'UPDATE_RECIPE', payload: recipe }));
    }

    deleteRecipe(recipe: Recipe) {

        this.http.delete(`/api/recipe/${recipe._id}`)
          .subscribe(action => this.store.dispatch({ type: 'DELETE_RECIPE', payload: recipe }));
    }
}
