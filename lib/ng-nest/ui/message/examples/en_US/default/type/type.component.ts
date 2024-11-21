import { Component } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XMessageService } from '@ng-nest/ui/message';

@Component({
  selector: 'ex-type',
  imports: [XButtonComponent],
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class ExTypeComponent {
  constructor(public message: XMessageService) {}
}
