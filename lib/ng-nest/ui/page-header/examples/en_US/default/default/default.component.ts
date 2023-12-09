import { Component } from '@angular/core';
import { XPageHeaderComponent } from '@ng-nest/ui/page-header';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XPageHeaderComponent],
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {}
