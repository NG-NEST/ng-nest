import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XCheckboxComponent } from '@ng-nest/ui/checkbox';

@Component({
  selector: 'ex-default',
  imports: [FormsModule, XCheckboxComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  data = signal(['QQ', '微信', '钉钉', '微博']);
  model = signal(['微信']);
}
