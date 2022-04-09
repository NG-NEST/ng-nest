import { Component } from '@angular/core';
import { isNumber } from 'lodash';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  value: any;
  value1: any;

  constructor(private formBuilder: FormBuilder) {
    this.form.valueChanges.subscribe((x) => {
      console.log(isNumber(x.aaaa));
    });
  }

  form = this.formBuilder.group({
    aaaa: null
  });

  change(event: number, value: number | null) {
    console.log(isNumber(value), isNumber(event), value);
  }
}
