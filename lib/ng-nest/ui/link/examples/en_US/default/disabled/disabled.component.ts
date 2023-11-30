import { Component } from '@angular/core';
import { XLinkComponent } from '@ng-nest/ui/link';

@Component({
  selector: 'ex-disabled',
  standalone: true,
  imports: [XLinkComponent],
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.scss']
})
export class ExDisabledComponent {}
