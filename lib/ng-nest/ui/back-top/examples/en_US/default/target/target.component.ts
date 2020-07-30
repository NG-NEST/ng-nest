import { Component } from '@angular/core';

@Component({
  selector: 'ex-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.scss']
})
export class ExTargetComponent {
  buttons = Array.from({ length: 20 }).map((x, i) => '按钮' + (i + 1));
}
