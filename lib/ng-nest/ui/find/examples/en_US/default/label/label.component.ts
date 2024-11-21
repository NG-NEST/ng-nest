import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XFindComponent } from '@ng-nest/ui/find';
import type { XTableRow } from '@ng-nest/ui/table';

@Component({
  selector: 'ex-label',
  imports: [FormsModule, XFindComponent],
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class ExLabelComponent {
  model = signal<XTableRow | null>(null);
}
