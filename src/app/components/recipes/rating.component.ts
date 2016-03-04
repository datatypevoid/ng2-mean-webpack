// ```
// rating.component.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// rating.component.js may be freely distributed under the MIT license
// ```

// # Rating Component

import {Component,
  Input,
  Output,
  EventEmitter} from 'angular2/core';

@Component({
  selector: 'rating',
  template: `
    <span tabindex="0">
      <template ngFor [ngForOf]="range" #index="index">
        <span class="sr-only">({{ index < rate ? '*' : ' ' }})</span>
        <i class="glyphicon"
          [ngClass]="index < rate ? 'glyphicon-star' : 'glyphicon-star-empty'"
          (click)="update(index + 1)">
        </i>
      </template>
    </span>
  `,
  directives: []
})

export class Rating {

  @Input() rate: number;

  @Output() updateRate = new EventEmitter();

  private range:Array<number> = [1,2,3,4,5]

  update(value) {

    this.rate = value;
    // push a new value every time we click on a star
    // this is thanks to the fact that the `NG2` `EventEmitter`
    // is using `Rx` thus this is an `Observable`
    this.updateRate.next(value);
  }
}