import { Component } from '@angular/core';
import { XBackTopComponent } from '@ng-nest/ui/back-top';

@Component({
  selector: 'ex-custom',
  standalone: true,
  imports: [XBackTopComponent],
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class ExCustomComponent {}
