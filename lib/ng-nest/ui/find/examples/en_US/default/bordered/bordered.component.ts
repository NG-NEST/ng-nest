import { Component } from '@angular/core';

@Component({
  selector: 'ex-bordered',
  templateUrl: './bordered.component.html',
  styleUrls: ['./bordered.component.scss']
})
export class ExBorderedComponent {
  model = [
    { id: 1, label: 'name1' },
    { id: 2, label: 'name2' }
  ];
}
