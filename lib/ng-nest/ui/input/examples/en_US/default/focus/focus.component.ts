import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XButtonComponent, XButtonsComponent } from '@ng-nest/ui/button';
import { XInputComponent } from '@ng-nest/ui/input';

@Component({
  selector: 'ex-focus',
  standalone: true,
  imports: [FormsModule, XInputComponent, XButtonComponent, XButtonsComponent],
  templateUrl: './focus.component.html',
  styleUrls: ['./focus.component.scss']
})
export class ExFocusComponent {
  inputValue = signal('Please enter the content');
}
