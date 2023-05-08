import { Component } from '@angular/core';

@Component({
  selector: 'ex-required',
  templateUrl: './required.component.html',
  styleUrls: ['./required.component.scss']
})
export class ExRequiredComponent {
  inputValidator = (value: string) => {
    const empty = value.trim().length === 0;
    if (empty) {
      this.message = '必填';
      return false;
    }
    const len5 = value.trim().length <= 5;
    if (len5) {
      this.message = '长度必须大于 5 个字符';
      return false;
    }
    return true;
  };
  message = '';
  value: any;

  
}
