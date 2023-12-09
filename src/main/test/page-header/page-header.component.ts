import { Component } from '@angular/core';
import { ExDefaultComponent } from '@ng-nest/ui/page-header/examples';

@Component({
  selector: 'te-page-header',
  standalone: true,
  imports: [ExDefaultComponent],
  templateUrl: './page-header.component.html'
})
export class TePageHeaderComponent {}
