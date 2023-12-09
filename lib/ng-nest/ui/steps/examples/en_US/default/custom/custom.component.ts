import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { XStepsComponent } from '@ng-nest/ui/steps';

@Component({
  selector: 'ex-custom',
  standalone: true,
  imports: [CommonModule, XStepsComponent],
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.html']
})
export class ExCustomComponent {
  activatedIndex = 1;
  data: string[] = ['步骤 1', '步骤 2', '步骤 3'];
}
