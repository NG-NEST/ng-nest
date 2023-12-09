import { Component } from '@angular/core';
import { XTextareaComponent } from '@ng-nest/ui/textarea';

@Component({
  selector: 'ex-icon',
  standalone: true,
  imports: [XTextareaComponent],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class ExIconComponent {}
