import { Component } from '@angular/core';
import { ExDefaultComponent } from '@ng-nest/ui/theme/examples';

@Component({
  selector: 'te-theme',
  standalone: true,
  imports: [ExDefaultComponent],
  templateUrl: './theme.component.html'
})
export class TeThemeComponent {}
