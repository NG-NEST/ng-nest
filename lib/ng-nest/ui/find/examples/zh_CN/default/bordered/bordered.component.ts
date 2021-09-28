import { Component } from '@angular/core';

@Component({
  selector: 'ex-bordered',
  templateUrl: './bordered.component.html',
  styleUrls: ['./bordered.component.scss']
})
export class ExBorderedComponent {
  model = [
    { id: 1, label: '姓名1' },
    { id: 2, label: '姓名2' }
  ];
}
