import { Component } from '@angular/core';
import { XTagComponent } from '@ng-nest/ui/tag';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XTagComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {}
