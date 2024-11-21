import { Component } from '@angular/core';
import { XInputNumberComponent } from '@ng-nest/ui/input-number';

@Component({
  selector: 'ex-hidden-button',
  imports: [XInputNumberComponent],
  templateUrl: './hidden-button.component.html',
  styleUrls: ['./hidden-button.component.scss']
})
export class ExHiddenButtonComponent {}
