import { Component } from '@angular/core';
import { XColorComponent } from '@ng-nest/ui/color';

@Component({
  selector: 'ex-neutral',
  standalone: true,
  imports: [XColorComponent],
  templateUrl: './neutral.component.html',
  styleUrls: ['./neutral.component.scss']
})
export class ExNeutralComponent {}
