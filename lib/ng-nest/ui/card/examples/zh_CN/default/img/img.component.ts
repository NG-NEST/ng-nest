import { Component } from '@angular/core';
import { XCardComponent } from '@ng-nest/ui/card';
import { XButtonComponent } from '@ng-nest/ui/button';

@Component({
  selector: 'ex-img',
  imports: [XCardComponent, XButtonComponent],
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ExImgComponent {}
