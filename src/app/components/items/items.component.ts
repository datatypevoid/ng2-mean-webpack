import {Component,
        Input,
        Output,
        EventEmitter,
        ChangeDetectionStrategy} from 'angular2/core';

import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {AppStore} from '../../app.store';

import {Item} from './items.reducer.ts';
import {ItemsService} from './items.service';
import {ItemDetails} from './item-details.component';
import {ItemsList} from './items-list.component';

@Component({
  selector: 'items',
  providers: [],
  template: `
    <div class="mdl-cell mdl-cell--6-col">
      <items-list [items]="items | async"
        (selected)="selectItem($event)" (deleted)="deleteItem($event)">
      </items-list>
    </div>
    <div class="mdl-cell mdl-cell--6-col">
      <item-detail
        (saved)="saveItem($event)" (cancelled)="resetItem($event)"
        [item]="selectedItem | async">Select an Item</item-detail>
    </div>
  `,
  directives: [ItemsList, ItemDetails],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Items {

    items: Observable<Array<Item>>;

    selectedItem: Observable<Item>;

    constructor(private itemsService: ItemsService,
                private store: Store<AppStore>) {

        // Bind to the `items` observable on the `ItemsService`
        this.items = itemsService.items;

        // Bind the `selectedItem` observable from the `store`
        this.selectedItem = store.select('selectedItem');

        this.selectedItem.subscribe(v => console.log(v));

        // `itemsService.loadItems` dispatches the `ADD_ITEMS` event
        // to our store which in turn updates the `items` collection
        itemsService.loadItems();
    }

    selectItem(item: Item) {

        this.store.dispatch({
            type: 'SELECT_ITEM',
            payload: item
        });
    }

    deleteItem(item: Item) {

        this.itemsService.deleteItem(item);
    }

    resetItem() {

      let emptyItem: Item = {_id: null, name: '', description: ''};

      this.store.dispatch({
          type: 'SELECT_ITEM',
          payload: emptyItem
      });
    }

    saveItem(item: Item) {

        this.itemsService.saveItem(item);
        this.resetItem();
    }
}
