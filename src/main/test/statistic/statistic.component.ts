import { Component } from '@angular/core';
import { ExDefaultComponent, ExDownComponent, ExPrefixComponent } from '@ng-nest/ui/statistic/examples';

@Component({
  selector: 'te-statistic',
  imports: [ExDefaultComponent, ExDownComponent, ExPrefixComponent],
  templateUrl: './statistic.component.html'
})
export class TeStatisticComponent {}
