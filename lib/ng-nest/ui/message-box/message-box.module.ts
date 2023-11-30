import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XMessageBoxComponent } from './message-box.component';
import { XAlertComponent } from '@ng-nest/ui/alert';
import { XButtonComponent, XButtonsComponent } from '@ng-nest/ui/button';
import { XIconComponent } from '@ng-nest/ui/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XInputComponent } from '@ng-nest/ui/input';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XMessageBoxService } from './message-box.service';
import { XControlValueAccessor } from '@ng-nest/ui/base-form';

@NgModule({
  declarations: [XMessageBoxComponent],
  exports: [XMessageBoxComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    XInputComponent,
    XButtonComponent,
    XButtonsComponent,
    XIconComponent,
    XAlertComponent,
    XOutletDirective,
    XControlValueAccessor
  ],
  providers: [XMessageBoxService]
})
export class XMessageBoxModule {}
