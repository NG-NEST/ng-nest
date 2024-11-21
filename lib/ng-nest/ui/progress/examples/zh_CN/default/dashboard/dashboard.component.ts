import { Component } from '@angular/core';
import { XProgressComponent } from '@ng-nest/ui/progress';

@Component({
  selector: 'ex-dashboard',
  imports: [XProgressComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class ExDashboardComponent {}
