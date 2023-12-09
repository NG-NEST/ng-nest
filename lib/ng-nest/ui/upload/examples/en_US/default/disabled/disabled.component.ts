import { Component } from '@angular/core';
import { XUploadComponent } from '@ng-nest/ui/upload';

@Component({
  selector: 'ex-disabled',
  standalone: true,
  imports: [XUploadComponent],
  templateUrl: './disabled.component.html'
})
export class ExDisabledComponent {}
