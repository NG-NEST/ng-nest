import { Component } from '@angular/core';

@Component({
  selector: 'ex-limit',
  templateUrl: './limit.component.html',
  styleUrls: ['./limit.component.scss']
})
export class ExLimitComponent {
  value = 3;
  change(num: any) {
    console.log(num);
  }
}
