import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';
import type { XColorsTheme } from '@ng-nest/ui/core';
import { XThemeComponent } from '@ng-nest/ui/theme';

@Component({
  selector: 'ex-default',
  imports: [FormsModule, XThemeComponent, XButtonComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  model = signal<XColorsTheme>({});
}
