import { Component, signal } from '@angular/core';
import { XBackTopComponent } from '@ng-nest/ui/back-top';
import { XButtonComponent } from '@ng-nest/ui/button';

@Component({
  selector: 'ex-target',
  imports: [XBackTopComponent, XButtonComponent],
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.scss']
})
export class ExTargetComponent {
  buttons = signal(Array.from({ length: 20 }).map((_x, i) => '按钮' + (i + 1)));
}
