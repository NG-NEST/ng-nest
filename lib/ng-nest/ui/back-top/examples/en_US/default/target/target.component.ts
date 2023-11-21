import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { XBackTopComponent } from '@ng-nest/ui/back-top';
import { XButtonComponent } from '@ng-nest/ui/button';

@Component({
  selector: 'ex-target',
  standalone: true,
  imports: [CommonModule, XBackTopComponent, XButtonComponent],
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.scss']
})
export class ExTargetComponent {
  buttons = Array.from({ length: 20 }).map((_x, i) => '按钮' + (i + 1));
}
