import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExCustomComponent,
  ExDisabledComponent,
  ExImgComponent,
  ExDropComponent
} from '@ng-nest/ui/upload/examples';

@Component({
  selector: 'te-upload',
  imports: [ExDefaultComponent, ExCustomComponent, ExDisabledComponent, ExImgComponent, ExDropComponent],
  templateUrl: './upload.component.html'
})
export class TeUploadComponent {}
