import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExBlendComponent,
  ExFlexComponent,
  ExHiddenComponent,
  ExLayoutComponent,
  ExOffsetComponent,
  ExSpaceComponent
} from '@ng-nest/ui/layout/examples';

@Component({
  selector: 'te-layout',
  standalone: true,
  imports: [
    ExDefaultComponent,
    ExBlendComponent,
    ExFlexComponent,
    ExHiddenComponent,
    ExLayoutComponent,
    ExOffsetComponent,
    ExSpaceComponent
  ],
  templateUrl: './layout.component.html'
})
export class TeLayoutComponent {}
