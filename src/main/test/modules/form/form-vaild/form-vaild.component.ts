import { Component, ViewChild } from '@angular/core';
import { XControl, XFormComponent } from '@ng-nest/ui/form';

@Component({
  selector: 'ex-form-vaild',
  templateUrl: './form-vaild.component.html',
  providers: []
})
export class ExFormVaildComponent {
  constructor() {}

  @ViewChild('form') form!: XFormComponent;
  @ViewChild('formValid') formValid!: XFormComponent;

  controls: XControl[] = [
    {
      control: 'input',
      id: 'user',
      icon: 'fto-user',
      placeholder: '用户名',
      width: 150,
      pattern: /^-?d+$/,
      message: '整数'
    },
    {
      control: 'input',
      id: 'email',
      icon: 'fto-mail',
      placeholder: '邮箱',
      width: 150,
      required: true
    }
  ];

  ngOnInit() {}

  submit(_event: Event) {
    if (this.form.formGroup.valid) {
      console.log(this.form.formGroup.value);
    } else {
      console.log(this.form.getValidatorMessages());
    }
    console.log(this.form)
  }

  valid() {
    this.formValid.setValidator();
  }
}
