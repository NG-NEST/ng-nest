import { Component } from '@angular/core';
import { XColComponent, XRowComponent } from '@ng-nest/ui/layout';

@Component({
  selector: 'ex-flex',
  imports: [XRowComponent, XColComponent],
  templateUrl: './flex.component.html',
  styleUrls: ['./flex.component.scss']
})
export class ExFlexComponent {}
