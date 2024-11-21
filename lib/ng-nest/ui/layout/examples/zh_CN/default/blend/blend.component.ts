import { Component } from '@angular/core';
import { XRowComponent, XColComponent } from '@ng-nest/ui/layout';

@Component({
  selector: 'ex-blend',
  imports: [XRowComponent, XColComponent],
  templateUrl: './blend.component.html',
  styleUrls: ['./blend.component.scss']
})
export class ExBlendComponent {}
