import { Component } from '@angular/core';
import {
  XAsideComponent,
  XContainerComponent,
  XFooterComponent,
  XHeaderComponent,
  XMainComponent
} from '@ng-nest/ui/container';

@Component({
  selector: 'ex-default',
  imports: [XAsideComponent, XContainerComponent, XFooterComponent, XHeaderComponent, XMainComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {}
