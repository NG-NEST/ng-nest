import { Component } from '@angular/core';
import { XLoadingComponent } from '@ng-nest/ui/loading';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XLoadingComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {}
