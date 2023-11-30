import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExFormVaildComponent,
  ExLabelRowComponent,
  ExTitleComponent
} from '@ng-nest/ui/form/examples';

@Component({
  selector: 'te-form',
  standalone: true,
  imports: [ExDefaultComponent, ExFormVaildComponent, ExLabelRowComponent, ExTitleComponent],
  templateUrl: './form.component.html'
})
export class TeFormComponent {}
