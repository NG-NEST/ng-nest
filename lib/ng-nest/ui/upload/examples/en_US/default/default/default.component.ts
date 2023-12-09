import { Component } from '@angular/core';
import { XUploadComponent } from '@ng-nest/ui/upload';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XUploadComponent],
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {}
