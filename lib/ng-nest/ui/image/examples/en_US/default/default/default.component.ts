import { Component } from '@angular/core';
import { XImageComponent } from '@ng-nest/ui/image';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XImageComponent],
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {}
