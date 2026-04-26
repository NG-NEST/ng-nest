import { Component } from '@angular/core';
import { ExDefaultComponent, ExFixedSizeComponent, ExLayoutComponent } from '@ng-nest/ui/splitter/examples';

@Component({
  selector: 'te-splitter',
  imports: [ExDefaultComponent, ExFixedSizeComponent, ExLayoutComponent],
  templateUrl: './splitter.component.html'
})
export class TeSplitterComponent {}
