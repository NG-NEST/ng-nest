import { Component } from '@angular/core';
import {
  ExErrorComponent,
  ExIconComponent,
  ExImgComponent,
  ExInfoComponent,
  ExResult403Component,
  ExResult404Component,
  ExResult500Component,
  ExSuccessComponent,
  ExWarningComponent
} from '@ng-nest/ui/result/examples';

@Component({
  selector: 'te-result',
  standalone: true,
  imports: [
    ExErrorComponent,
    ExIconComponent,
    ExImgComponent,
    ExInfoComponent,
    ExResult403Component,
    ExResult404Component,
    ExResult500Component,
    ExSuccessComponent,
    ExWarningComponent
  ],
  templateUrl: './result.component.html'
})
export class TeResultComponent {}
