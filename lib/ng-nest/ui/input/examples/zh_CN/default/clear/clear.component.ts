import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XInputComponent } from '@ng-nest/ui/input';

@Component({
  selector: 'ex-clear',
  imports: [FormsModule, XInputComponent],
  templateUrl: './clear.component.html',
  styleUrls: ['./clear.component.scss']
})
export class ExClearComponent {
  model = signal('清除数据');
}
