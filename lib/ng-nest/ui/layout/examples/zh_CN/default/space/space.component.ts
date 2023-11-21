import { Component } from '@angular/core';
import { XColComponent, XRowComponent } from '@ng-nest/ui/layout';

@Component({
  selector: 'ex-space',
  standalone: true,
  imports: [XRowComponent, XColComponent],
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss']
})
export class ExSpaceComponent {}
