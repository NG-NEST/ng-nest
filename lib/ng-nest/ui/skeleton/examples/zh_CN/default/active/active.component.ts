import { Component } from '@angular/core';
import { XSkeletonComponent } from '@ng-nest/ui/skeleton';

@Component({
  selector: 'ex-active',
  standalone: true,
  imports: [XSkeletonComponent],
  templateUrl: './active.component.html'
})
export class ExActiveComponent {}
