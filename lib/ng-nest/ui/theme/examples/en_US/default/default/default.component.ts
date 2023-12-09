import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XThemeComponent } from '@ng-nest/ui/theme';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [FormsModule, XThemeComponent, XButtonComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  model: any;
}
