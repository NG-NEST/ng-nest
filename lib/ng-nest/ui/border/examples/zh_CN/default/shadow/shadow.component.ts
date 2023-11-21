import { Component } from '@angular/core';
import { XColComponent, XRowComponent } from '@ng-nest/ui/layout';

@Component({
  selector: 'ex-shadow',
  standalone: true,
  imports: [XRowComponent, XColComponent],
  templateUrl: './shadow.component.html',
  styleUrls: ['./shadow.component.scss']
})
export class ExShadowComponent {}
