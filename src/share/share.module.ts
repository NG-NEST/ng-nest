import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { XDocComponent } from '@ng-nest/ui/doc';
import { XExamplesModule } from '@ng-nest/ui/examples';
import { XApiComponent } from '@ng-nest/ui/api';
import { XTabsModule } from '@ng-nest/ui/tabs';
import { XHighlightModule } from '@ng-nest/ui/highlight';
import { XPatternComponent } from '@ng-nest/ui/pattern';
import { XI18nDirective } from '@ng-nest/ui/i18n';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XTooltipModule } from '@ng-nest/ui/tooltip';
import { XAnchorComponent } from '@ng-nest/ui/anchor';
import { NsAdaptionModule } from './adaption/adaption.module';

const modules = [
  CommonModule,
  FormsModule,
  RouterModule,
  HttpClientModule,
  ReactiveFormsModule,
  NsAdaptionModule,
  XDocComponent,
  XExamplesModule,
  XAnchorComponent,
  XApiComponent,
  XTabsModule,
  XHighlightModule,
  XPatternComponent,
  XI18nDirective,
  XButtonComponent,
  XTooltipModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules]
})
export class ShareModule {}
