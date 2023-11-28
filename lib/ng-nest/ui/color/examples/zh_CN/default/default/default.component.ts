import { Component } from '@angular/core';
import { XColorComponent } from '@ng-nest/ui/color';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XColorComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {}
