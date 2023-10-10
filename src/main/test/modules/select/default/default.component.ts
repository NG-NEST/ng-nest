import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  data1 = ['AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ'];
  data2 = JSON.parse(JSON.stringify(this.data1));
  model1: any;
  model2: any = ['AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ'];

  form = this.fb.group({
    name: [{ disabled: true, value: '' }],
    nameCom: ['BBBB']
  });
  constructor(private fb: FormBuilder) {
    setTimeout(() => {
      this.form.controls.nameCom.disable();
    }, 2000);
  }
}
