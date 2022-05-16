import { Component } from '@angular/core';
import { XDialogService } from '@ng-nest/ui/dialog';
import { ExServiceDialogComponent } from './service-dialog.component';

@Component({
  selector: 'ex-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ExServiceComponent {
  constructor(private dialogService: XDialogService) {}

  create() {
    this.dialogService.create(ExServiceDialogComponent, {
      placement: 'center', // Default center
      draggable: true,
      resizable: true,
      data: { title: 'Title', content: 'Pass content information, pass content information, pass content information' }
    });
  }
}
