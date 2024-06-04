import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XCheckboxComponent } from '@ng-nest/ui/checkbox';
import { XInputComponent } from '@ng-nest/ui/input';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [FormsModule, XCheckboxComponent, XInputComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  data = signal(['QQ', '微信', '钉钉', '微博']);
  model = signal(['微信']);
}
