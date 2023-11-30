import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XPaginationComponent } from './pagination.component';
import { XButtonComponent, XButtonsComponent } from '@ng-nest/ui/button';
import { XPaginationProperty } from './pagination.property';
import { XI18nPipe } from '@ng-nest/ui/i18n';
import { XSelectModule } from '@ng-nest/ui/select';
import { FormsModule } from '@angular/forms';
import { XInputComponent } from '@ng-nest/ui/input';
import { XOutletDirective } from '@ng-nest/ui/outlet';

@NgModule({
  declarations: [XPaginationComponent, XPaginationProperty],
  exports: [XPaginationComponent],
  imports: [
    CommonModule,
    FormsModule,
    XButtonComponent,
    XButtonsComponent,
    XI18nPipe,
    XSelectModule,
    XInputComponent,
    XOutletDirective
  ]
})
export class XPaginationModule {}
