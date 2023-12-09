import { Component } from '@angular/core';
import { XTagComponent } from '@ng-nest/ui/tag';

@Component({
  selector: 'ex-color',
  standalone: true,
  imports: [XTagComponent],
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ExColorComponent {}
