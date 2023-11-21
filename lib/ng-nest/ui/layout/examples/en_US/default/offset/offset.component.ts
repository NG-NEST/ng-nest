import { Component } from '@angular/core';
import { XColComponent, XRowComponent } from '@ng-nest/ui/layout';

@Component({
  selector: 'ex-offset',
  standalone: true,
  imports: [XRowComponent, XColComponent],
  templateUrl: './offset.component.html',
  styleUrls: ['./offset.component.scss']
})
export class ExOffsetComponent {}
