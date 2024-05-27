import { Component, computed, signal, viewChild } from '@angular/core';
import { ControlEvent } from '@angular/forms';
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

  formChanged = signal<ControlEvent<any> | null>(null);

  validText = computed(() => {
    this.formChanged();
    return this.form().formGroup().valid ? '通过' : '失败';
  });

  controls = signal<XControl[]>([
    // {
    //   control: 'input',
    //   id: 'user',
    //   icon: 'fto-user',
    //   label: '用户',
    //   width: 300,
    //   inputValidator: (value: string) => {
    //     return String(value).length > 5;
    //   },
    //   message: '长度大于 5 个字符',
    //   required: true
    // },
    {
      control: 'input',
      id: 'email',
      icon: 'fto-mail',
      active: false,
      label: '邮箱',
      value: '123@123.com',
      width: 300,
      required: true,
      clearable: true,
      clearEmit: (x: any) => {
        console.log(x);
      }
    }
  ]);

  ngOnInit() {
    this.form()
      .formGroup()
      .events.subscribe((x) => {
        this.formChanged.set(x);
      });

    setTimeout(() => {
      this.controls.update((x: XControl[]) => {
        x[0]['active'] = false;

        return [...x];
      });
      console.log(this.controls());
    }, 5000);
  }

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
