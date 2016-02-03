import {Component, View} from 'angular2/core';
// Import NgClass directive
import {NgClass} from 'angular2/common';

@Component({
  selector: 'accordion, [accordion]',
  host: {
    'class': 'panel-group'
  }
})
@View({
  template: '<ng-content></ng-content>'
})
export class Accordion {
  private groups:Array<AccordionGroup> = [];

  addGroup(group:AccordionGroup): void {
    this.groups.push(group);
  }

  closeOthers(openGroup:AccordionGroup): void {
    this.groups.forEach((group:AccordionGroup) => {
      if (group !== openGroup) {
        group.isOpen = false;
      }
    });
  }

  removeGroup(group:AccordionGroup): void {
    const index = this.groups.indexOf(group);
    if (index !== -1) {
      this.groups.splice(index, 1);
    }
  }
}

@Component({
  selector: 'accordion-group, [accordion-group]',
  inputs: ['heading', 'isOpen']
})
@View({
        template: `

          <div class="panel panel-default" [ngClass]="{'panel-open': isOpen}">
            <div class="panel-heading" (click)="toggleOpen($event)">
              <h4 class="panel-title">
                <a href tabindex="0"><span>{{heading}}</span></a>
              </h4>
            </div>
            <div class="panel-collapse" [hidden]="!isOpen">
              <div class="panel-body">
                <ng-content></ng-content>
              </div>
            </div>
          </div>

        `,
  directives: [NgClass]
})
export class AccordionGroup {
  private _isOpen:boolean = false;

  constructor(private accordion:Accordion) {
    this.accordion.addGroup(this);
  }

  toggleOpen(event) {
    event.preventDefault();
    this.isOpen = !this.isOpen;
  }

  onDestroy(): void {
    this.accordion.removeGroup(this);
  }

  public get isOpen(): boolean {
    return this._isOpen;
  }

  public set isOpen(value:boolean){
    this._isOpen = value;
    if (value) {
      this.accordion.closeOthers(this);
    }
  }
}