import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { XCardComponent } from '@ng-nest/ui/card';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XStatisticComponent } from '@ng-nest/ui/statistic';

@Component({
  selector: 'ex-prefix',
  standalone: true,
  imports: [DecimalPipe, XCardComponent, XStatisticComponent, XIconComponent],
  templateUrl: './prefix.component.html',
  styleUrls: ['./prefix.component.scss']
})
export class ExPrefixComponent {}
