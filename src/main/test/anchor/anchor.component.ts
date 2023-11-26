import { Component } from '@angular/core';
import { ExDefaultComponent, ExLoadingComponent } from '@ng-nest/ui/anchor/examples';

@Component({
  selector: 'te-anchor',
  standalone: true,
  imports: [ExDefaultComponent, ExLoadingComponent],
  templateUrl: './anchor.component.html'
})
export class TeAnchorComponent {}
