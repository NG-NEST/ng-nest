import { Component } from '@angular/core';

@Component({
  selector: 'ex-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class ExFooterComponent {
  modelPicker: any;

  modelRange: any;

  modelMonth: any;

  modelYear: any;

  modelDateTime: any;

  change(event: any) {
    console.log(event);
  }
}
