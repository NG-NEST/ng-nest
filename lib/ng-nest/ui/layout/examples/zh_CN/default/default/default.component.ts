import { Component } from '@angular/core';
import { XColComponent, XRowComponent } from '@ng-nest/ui/layout';

@Component({
  selector: 'ex-default',
  imports: [XRowComponent, XColComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {}
