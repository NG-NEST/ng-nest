import { Component } from '@angular/core';
import { XColorComponent } from '@ng-nest/ui/color';

@Component({
  selector: 'ex-assist',
  standalone: true,
  imports: [XColorComponent],
  templateUrl: './assist.component.html',
  styleUrls: ['./assist.component.scss']
})
export class ExAssistComponent {}
