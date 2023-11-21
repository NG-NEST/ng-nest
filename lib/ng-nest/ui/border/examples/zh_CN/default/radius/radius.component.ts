import { Component } from '@angular/core';
import { XColComponent, XRowComponent } from '@ng-nest/ui/layout';

@Component({
  selector: 'ex-radius',
  standalone: true,
  imports: [XRowComponent, XColComponent],
  templateUrl: './radius.component.html',
  styleUrls: ['./radius.component.scss']
})
export class ExRadiusComponent {}
