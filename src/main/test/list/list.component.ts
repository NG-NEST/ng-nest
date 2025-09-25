import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExGroupComponent,
  ExLoadMoreComponent,
  ExScrollComponent,
  ExSizeComponent
} from '@ng-nest/ui/list/examples';

@Component({
  selector: 'te-list',
  imports: [ExDefaultComponent, ExLoadMoreComponent, ExScrollComponent, ExSizeComponent, ExGroupComponent],
  templateUrl: './list.component.html'
})
export class TeListComponent {}
