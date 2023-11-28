import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExBorderComponent,
  ExSizeComponent,
  ExSplitComponent,
  ExVerticalComponent
} from '@ng-nest/ui/description/examples';

@Component({
  selector: 'te-description',
  standalone: true,
  imports: [ExDefaultComponent, ExBorderComponent, ExSizeComponent, ExSplitComponent, ExVerticalComponent],
  templateUrl: './description.component.html'
})
export class TeDescriptionComponent {}
