import { Component } from '@angular/core';
import { XTextareaComponent } from '@ng-nest/ui/textarea';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XTextareaComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {}
