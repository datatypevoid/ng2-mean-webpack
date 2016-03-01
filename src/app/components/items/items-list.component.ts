// Reference: http://onehungrymind.com/build-better-angular-2-application-redux-ngrx/

// # Items List

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
  selector: 'items-list',
  template: `
  <div *ngFor="#item of items" (click)="selected.emit(item)"
    class="item-card mdl-card mdl-shadow--2dp">
    <div class="mdl-card__title">
      <h2 class="mdl-card__title-text">{{item.name}}</h2>
    </div>
    <div class="mdl-card__supporting-text">
      {{item.description}}
    </div>
    <div class="mdl-card__menu">
      <button (click)="deleted.emit(item); $event.stopPropagation();"
        class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
        <i class="material-icons">close</i>
      </button>
    </div>
  </div>
  `
})
export class ItemsList {
    // The `items` component hands off `items` and `selectedItem`
    // via property bindings to its child components
    // Here we pick up the items collection by annotating our local
    // `items` property with `@Input()`
    @Input() items: Item[];
    // Two event outputs for when an item is selected or deleted
    @Output() selected = new EventEmitter();
    @Output() deleted = new EventEmitter();
}
