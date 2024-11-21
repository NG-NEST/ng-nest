import { Component } from '@angular/core';
import { XLoadingComponent } from '@ng-nest/ui/loading';

@Component({
  selector: 'ex-custom',
  imports: [XLoadingComponent],
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class ExCustomComponent {}
