import { Component } from '@angular/core';
import { XCardComponent } from '@ng-nest/ui/card';
import { XColComponent, XRowComponent } from '@ng-nest/ui/layout';

@Component({
  selector: 'ex-shadow',
  standalone: true,
  imports: [XRowComponent, XColComponent, XCardComponent],
  templateUrl: './shadow.component.html'
})
export class ExShadowComponent {}
