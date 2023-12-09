import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExActiveComponent,
  ExComplexComponent,
  ExListComponent,
  ExLoadingComponent,
  ExTableComponent
} from '@ng-nest/ui/skeleton/examples';

@Component({
  selector: 'te-skeleton',
  standalone: true,
  imports: [
    ExDefaultComponent,
    ExActiveComponent,
    ExComplexComponent,
    ExListComponent,
    ExLoadingComponent,
    ExTableComponent
  ],
  templateUrl: './skeleton.component.html'
})
export class TeSkeletonComponent {}
