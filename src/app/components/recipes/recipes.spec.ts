import {recipes} from './recipes.reducer';

import {selectedRecipe} from './selected-recipe.reducer';

import {
  it,
  describe,
  expect
} from 'angular2/testing';

describe('Recipes', () => {
  describe('`selectedRecipe` store', () => {
    it('returns null by default', () => {
      let defaultState = selectedRecipe(undefined, {type: 'random', payload: {}});

      expect(defaultState).toBeNull();
    });

    it('`SELECT_RECIPE` returns the provided payload', () => {
      let selectRecipe = selectedRecipe(undefined, {type: 'SELECT_RECIPE', payload: 'payload'});

      expect(selectRecipe).toBe('payload');
    });
  });

  describe('`recipes` store', () => {
    let initialState = [
      { _id: 0, name: 'First Recipe' },
      { _id: 1, name: 'Second Recipe' }
    ];

    it('returns an empty array by default', () => {
      let defaultState = recipes(undefined, {type: 'random', payload: {}});

      expect(defaultState).toEqual([]);
    });

    it('`ADD_RECIPES`', () => {
      let payload = initialState,
          stateItems = recipes([], {type: 'ADD_RECIPES', payload: payload});

      expect(stateItems).toEqual(payload);
    });

    it('`CREATE_RECIPE`', () => {
      let payload = {_id: 2, name: 'added recipe'},
          result = [...initialState, payload],
          stateItems = recipes(initialState, {type: 'CREATE_RECIPE', payload: payload});

      expect(stateItems).toEqual(result);
    });

    it('`UPDATE_RECIPE`', () => {
      let payload = { _id: 1, name: 'Updated Recipe' },
          result = [ initialState[0], { _id: 1, name: 'Updated Recipe' } ],
          stateItems = recipes(initialState, {type: 'UPDATE_RECIPE', payload: payload});

      expect(stateItems).toEqual(result);
    });

    it('`DELETE_RECIPE`', () => {
      let payload = { _id: 0 },
          result = [ initialState[1] ],
          stateItems = recipes(initialState, {type: 'DELETE_RECIPE', payload: payload});

      // DEBUG
      console.log('result: ');
      console.log(result);

      expect(stateItems).toEqual(result);
    });
  });
});
