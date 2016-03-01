// Reference: http://onehungrymind.com/build-better-angular-2-application-redux-ngrx/

// Import our `Item` interface
import {Item} from './components/items/items.reducer';

// We are dealing with a single object that has:
//   * An `items` collection
//   * A `selectedItem` property holding a single `Item`
export interface AppStore {

    items: Item[];
    selectedItem: Item;

    // If ever you were to desire more functionality, you
    // could expand the `store` with new `key, value` pairs
    // to accomodate the updated model
    //
    // . . .
};
