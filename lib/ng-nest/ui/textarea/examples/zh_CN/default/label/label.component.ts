import { Component } from '@angular/core';
import { XTextareaComponent } from '@ng-nest/ui/textarea';

@Component({
  selector: 'ex-label',
  standalone: true,
  imports: [XTextareaComponent],
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class ExLabelComponent {}
