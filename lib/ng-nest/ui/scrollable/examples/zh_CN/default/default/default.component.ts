import { Component } from '@angular/core';
import { XScrollableComponent } from '@ng-nest/ui/scrollable/scrollable.component';

@Component({
  selector: 'ex-default',
  imports: [XScrollableComponent],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class ExDefaultComponent {}
