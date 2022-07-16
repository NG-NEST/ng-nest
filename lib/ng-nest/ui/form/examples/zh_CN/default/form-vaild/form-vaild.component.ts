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
  @ViewChild('manualForm') manualForm!: XFormComponent;

  controls: XControl[] = [
    {
      control: 'input',
      id: 'user',
      icon: 'fto-user',
      label: '用户',
      width: 300,
      required: true
    },
    {
      control: 'input',
      id: 'email',
      icon: 'fto-mail',
      label: '邮箱',
      width: 300,
      required: true
    }
  ];

  ngOnInit() {}

  validForm(form: XFormComponent) {
    if (form.formGroup.valid) {
      console.log(form.formGroup.value);
    } else {
      console.log(form.getValidatorMessages());
    }
  }

  submit(_event: Event) {
    this.validForm(this.form);
  }

  manual(_event: Event) {
    this.manualForm.setValidator();
    this.validForm(this.manualForm);
  }
}
