import { Component } from '@angular/core';
import { ExDefaultComponent, ExLineHeightComponent, ExSizeComponent } from '@ng-nest/ui/typography/examples';

@Component({
  selector: 'te-typography',
  standalone: true,
  imports: [ExDefaultComponent, ExLineHeightComponent, ExSizeComponent],
  templateUrl: './typography.component.html'
})
export class TeTypographyComponent {}
