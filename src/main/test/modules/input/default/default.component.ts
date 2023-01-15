import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  value: any;
  value1: any;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.form.valueChanges.subscribe((x) => {
      console.log(!isNaN(x.aaaa));
    });
  }

  form = this.formBuilder.group({
    aaaa: null
  });

  change(event: number, value: number | null) {
    console.log(!isNaN(value!), !isNaN(event), value);
  }
}
