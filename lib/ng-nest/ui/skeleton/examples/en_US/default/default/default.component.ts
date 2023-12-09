import { Component } from '@angular/core';
import { XSkeletonComponent } from '@ng-nest/ui/skeleton';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XSkeletonComponent],
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {}
