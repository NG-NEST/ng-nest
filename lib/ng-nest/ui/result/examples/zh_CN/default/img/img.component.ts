import { Component } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XResultComponent } from '@ng-nest/ui/result';

@Component({
  selector: 'ex-img',
  imports: [XButtonComponent, XResultComponent],
  templateUrl: './img.component.html'
})
export class ExImgComponent {}
