// Reference: http://onehungrymind.com/build-better-angular-2-application-redux-ngrx/

// # Items Service

import {Http, Headers} from 'angular2/http';
import {Store} from '@ngrx/store';
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

import {Item} from './items.reducer';
import {AppStore} from '../../app.store';

const HEADER = {
  headers: new Headers({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class ItemsService{

    items: Observable<Array<Item>>;

    // Inject our `AppStore` into our constructor with a type of `AppStore`
    constructor(private http: Http, private store: Store<AppStore>) {

        // Bind an `observable` of our `items` to `ItemsService`
        // Since this is essentially a `key, value` system, we can
        // set our `items` by calling `store.select('items')`
        this.items = store.select('items');
    }

    loadItems() {

        this.http.get('/api/item')
            // map the `HTTP` response from `raw` to `JSON` format
            // using `RxJs`
            // Reference: https://github.com/Reactive-Extensions/RxJS
            .map(res => res.json())
            // call `map` again to create the object we want to dispatch
            // to our reducer
            // This combo of `map` method calls is an observable sequence
            // in that every result gets passed through this sequence of
            // operations
            .map(payload => ({ type: 'ADD_ITEMS', payload }))
            // Subscribe to this sequence and hand off control to the
            // reducer by dispatching the transformed results
            .subscribe(action => this.store.dispatch(action));
    }

    saveItem(item: Item) {

        (item._id) ? this.updateItem(item) : this.createItem(item);
    }

    createItem(item: Item) {

        this.http.post('/api/item', JSON.stringify(item), HEADER)
            .map(res => res.json())
            .map(payload => ({ type: 'CREATE_ITEM', payload }))
            .subscribe(action => this.store.dispatch(action));
    }

    updateItem(item: Item) {

        this.http.put(`/api/item/${item._id}`, JSON.stringify(item), HEADER)
          // Dispatch action to reducer in subscribe block here
          .subscribe(action => this.store.dispatch({ type: 'UPDATE_ITEM', payload: item }));
    }

    deleteItem(item: Item) {

        this.http.delete(`/api/item/${item._id}`)
          .subscribe(action => this.store.dispatch({ type: 'DELETE_ITEM', payload: item }));
    }
}
