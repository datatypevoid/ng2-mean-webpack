// Reference: http://onehungrymind.com/build-better-angular-2-application-redux-ngrx/

// # Item Detail

import {Component,
        Input,
        Output,
        EventEmitter,
        ChangeDetectionStrategy
       } from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import {ItemsService} from './items.service';
import {Item} from './items.reducer';
import {AppStore} from '../../app.store';

@Component({
  selector: 'item-detail',
  template: `
  <div class="item-card mdl-card mdl-shadow--2dp">
    <div class="mdl-card__title">
      <h2 class="mdl-card__title-text" *ngIf="selectedItem._id">Editing {{originalName}}</h2>
      <h2 class="mdl-card__title-text" *ngIf="!selectedItem._id">Create New Item</h2>
    </div>
    <div class="mdl-card__supporting-text">
      <form novalidate>
          <div class="mdl-textfield mdl-js-textfield">
            <label>Item Name</label>
            <input [(ngModel)]="selectedItem.name"
              placeholder="Enter a name"
              class="mdl-textfield__input" type="text">
          </div>
          <div class="mdl-textfield mdl-js-textfield">
            <label>Item Description</label>
            <input [(ngModel)]="selectedItem.description"
              placeholder="Enter a description"
              class="mdl-textfield__input" type="text">
          </div>
      </form>
    </div>
    <div class="mdl-card__actions">
        <button type="submit" (click)="cancelled.emit(selectedItem)"
          class="mdl-button mdl-js-button mdl-js-ripple-effect">Cancel</button>
        <button type="submit" (click)="saved.emit(selectedItem)"
          class="mdl-button mdl-js-button mdl-button--colored mdl-js-ripple-effect">Save</button>
    </div>
  </div>
  `
})
export class ItemDetails {

    // Assign our `item` to a locally scoped property
    // Perform additional logic on every update via ES6 setter
    // Create a copy of `_item` and assign it to `this.selectedItem`
    // which we will use to bind our form to
    @Input('item') set _item(value: Item) {

        if (value) this.originalName = value.name;
          this.selectedItem = Object.assign({}, value);
    }
    originalName: string;
    selectedItem: Item;

    // Allow the user to save/delete an item or cancel the
    // operation. Flow events up from here.
    @Output() saved = new EventEmitter();
    @Output() cancelled = new EventEmitter();
}
