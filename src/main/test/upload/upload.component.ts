import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExCustomComponent,
  ExDisabledComponent,
  ExImgComponent
} from '@ng-nest/ui/upload/examples';

@Component({
  selector: 'te-upload',
  standalone: true,
  imports: [ExDefaultComponent, ExCustomComponent, ExDisabledComponent, ExImgComponent],
  templateUrl: './upload.component.html'
})
export class TeUploadComponent {}
