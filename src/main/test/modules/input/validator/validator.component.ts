import { Component } from '@angular/core';

@Component({
  selector: 'ex-validator',
  templateUrl: './validator.component.html',
  styleUrls: ['./validator.component.scss']
})
export class ExValidatorComponent {
  value: any;

  inputValidator = (value: any) => {
    return String(value).length <= 3;
  };

  constructor() {}
}
