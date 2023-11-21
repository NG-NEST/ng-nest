import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XListComponent } from './list.component';
import { XListOptionComponent } from './list-option.component';
import { XIconComponent } from '@ng-nest/ui/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { XListOptionProperty, XListProperty } from './list.property';
import { XEmptyComponent } from '@ng-nest/ui/empty';
import { A11yModule } from '@angular/cdk/a11y';
import { XControlValueAccessor } from '@ng-nest/ui/base-form';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XI18nDirective } from '@ng-nest/ui/i18n';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { XKeywordModule } from '@ng-nest/ui/keyword';
import { XListDropGroup } from './list-drop-group.directive';

@NgModule({
  declarations: [
    XListComponent,
    XListDropGroup,
    XListOptionComponent,
    XListProperty,
    XListOptionProperty
  ],
  exports: [XListComponent, XListDropGroup, XListOptionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    A11yModule,
    XIconComponent,
    XEmptyComponent,
    XControlValueAccessor,
    XI18nDirective,
    XOutletDirective,
    ScrollingModule,
    XKeywordModule
  ]
})
export class XListModule {}
