import { Component, viewChild } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XControl, XFormComponent } from '@ng-nest/ui/form';

@Component({
  selector: 'ex-form-vaild',
  standalone: true,
  imports: [XButtonComponent, XFormComponent],
  templateUrl: './form-vaild.component.html'
})
export class ExFormVaildComponent {
  form = viewChild.required<XFormComponent>('form');
  manualForm = viewChild.required<XFormComponent>('manualForm');

  controls: XControl[] = [
    {
      control: 'input',
      id: 'user',
      icon: 'fto-user',
      label: '用户',
      width: 300,
      inputValidator: (value: string) => {
        return String(value).length > 5;
      },
      message: '长度大于 5 个字符',
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
    if (form.formGroup().valid) {
      console.log(form.formGroup().value);
    } else {
      console.log(form.getValidatorMessages());
    }
  }

  submit(_event: Event) {
    this.validForm(this.form());
  }

  manual(_event: Event) {
    this.manualForm().setValidator();
    this.validForm(this.manualForm());
  }

  resetValidator() {
    this.form().resetValidator();
  }
}
