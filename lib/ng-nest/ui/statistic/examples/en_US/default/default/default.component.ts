import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { XCardComponent } from '@ng-nest/ui/card';
import { XStatisticComponent } from '@ng-nest/ui/statistic';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [CommonModule, XCardComponent, XStatisticComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {}
