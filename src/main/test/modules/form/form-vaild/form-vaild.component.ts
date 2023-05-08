import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { XControl, XFormComponent } from '@ng-nest/ui/form';

@Component({
  selector: 'ex-form-vaild',
  templateUrl: './form-vaild.component.html',
  providers: []
})
export class ExFormVaildComponent {
  formDefault: FormGroup = this.formBuild.group({
    name: [null, Validators.required],
    age: [null, Validators.max(100)],
    account: [null]
  });

  constructor(public formBuild: FormBuilder) {
    console.log(this.formDefault);
  }

  @ViewChild('form') form!: XFormComponent;
  @ViewChild('manualForm') manualForm!: XFormComponent;

  controls: XControl[] = [
    {
      control: 'input',
      id: 'user',
      icon: 'fto-user',
      label: '用户',
      width: 300,
      inputValidator: (value: string) => {
        return String(value).trim().length > 0;
      },
      message: '必填',
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

  resetValidator() {
    this.form.resetValidator();
  }
}
