import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { XCardComponent } from '@ng-nest/ui/card';
import { XAddDays } from '@ng-nest/ui/core';
import { XCountdownComponent } from '@ng-nest/ui/statistic';

@Component({
  selector: 'ex-down',
  standalone: true,
  imports: [CommonModule, XCardComponent, XCountdownComponent],
  templateUrl: './down.component.html',
  styleUrls: ['./down.component.scss']
})
export class ExDownComponent {
  deadline = XAddDays(new Date(), 2).getTime();
}
