import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { XDocComponent } from '@ng-nest/ui/doc';
import { XExamplesComponent } from '@ng-nest/ui/examples';
import { XApiComponent } from '@ng-nest/ui/api';
import { XTabsComponent, XTabComponent } from '@ng-nest/ui/tabs';
import { XHighlightComponent } from '@ng-nest/ui/highlight';
import { XPatternComponent } from '@ng-nest/ui/pattern';
import { XI18nPipe } from '@ng-nest/ui/i18n';
import { XButtonComponent, XButtonsComponent } from '@ng-nest/ui/button';
import { XTooltipDirective } from '@ng-nest/ui/tooltip';
import { XAnchorComponent } from '@ng-nest/ui/anchor';
import { XTreeFileComponent } from '@ng-nest/ui/tree-file';
import { XPopoverDirective } from '@ng-nest/ui/popover';
import { NsReferenceComponent } from './reference/reference.component';

const modules = [
  CommonModule,
  FormsModule,
  RouterModule,
  HttpClientModule,
  ReactiveFormsModule,
  RouterOutlet,
  NsReferenceComponent,
  XDocComponent,
  XExamplesComponent,
  XAnchorComponent,
  XApiComponent,
  XTabsComponent,
  XTabComponent,
  XHighlightComponent,
  XPatternComponent,
  XI18nPipe,
  XButtonsComponent,
  XButtonComponent,
  XTooltipDirective,
  XTreeFileComponent,
  XPopoverDirective
];

@NgModule({
  imports: [...modules],
  exports: [...modules]
})
export class ShareModule {}
