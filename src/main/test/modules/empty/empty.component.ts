import { Component } from '@angular/core';
import { ExDefaultComponent } from './default/default.component';
import { ExCustomComponent } from './custom/custom.component';

@Component({
  selector: 'te-empty',
  standalone: true,
  imports: [ExDefaultComponent, ExCustomComponent],
  templateUrl: './empty.component.html'
})
export class TeEmptyComponent {}
