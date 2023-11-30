import { Component } from '@angular/core';
import { XInputNumberComponent } from '@ng-nest/ui/input-number';

@Component({
  selector: 'ex-limit',
  standalone: true,
  imports: [XInputNumberComponent],
  templateUrl: './limit.component.html',
  styleUrls: ['./limit.component.scss']
})
export class ExLimitComponent {}
