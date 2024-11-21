import { Component } from '@angular/core';
import { ExDefaultComponent, ExLoadingComponent } from '@ng-nest/ui/anchor/examples';

@Component({
  selector: 'te-anchor',
  imports: [ExDefaultComponent, ExLoadingComponent],
  templateUrl: './anchor.component.html'
})
export class TeAnchorComponent {}
