import { Component } from '@angular/core';
import { XImageComponent } from '@ng-nest/ui/image';

@Component({
  selector: 'ex-fallback',
  standalone: true,
  imports: [XImageComponent],
  templateUrl: './fallback.component.html'
})
export class ExFallbackComponent {}
