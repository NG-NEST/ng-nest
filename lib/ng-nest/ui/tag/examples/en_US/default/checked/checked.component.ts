import { Component } from '@angular/core';

@Component({
  selector: 'ex-checked',
  templateUrl: './checked.component.html',
  styleUrls: ['./checked.component.scss']
})
export class ExCheckedComponent {
  change(selected: boolean) {
    console.log(selected);
  }
}
