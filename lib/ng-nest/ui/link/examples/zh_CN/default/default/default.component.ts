import { Component } from '@angular/core';
import { XLinkComponent } from '@ng-nest/ui/link';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XLinkComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {}
