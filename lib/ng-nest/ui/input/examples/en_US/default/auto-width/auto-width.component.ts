import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XInputComponent } from '@ng-nest/ui/input';

@Component({
  selector: 'ex-auto-width',
  imports: [XInputComponent, FormsModule],
  templateUrl: './auto-width.component.html',
  styleUrls: ['./auto-width.component.scss']
})
export class ExAutoWidthComponent {}
