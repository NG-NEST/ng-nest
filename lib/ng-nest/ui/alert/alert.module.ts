import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XAlertComponent } from './alert.component';
import { XIconModule } from '@ng-nest/ui/icon';
import { XOutletModule } from '@ng-nest/ui/outlet';
import { XButtonModule } from '@ng-nest/ui/button';
import { XAlertProperty } from './alert.property';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { XResizableModule } from '@ng-nest/ui/resizable';

@NgModule({
  declarations: [XAlertComponent, XAlertProperty],
  exports: [XAlertComponent],
  imports: [CommonModule, DragDropModule, XIconModule, XButtonModule, XOutletModule, XResizableModule]
})
export class XAlertModule {}
