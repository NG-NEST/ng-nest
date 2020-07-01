import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { XDocModule } from '@ng-nest/ui/doc';
import { XExamplesModule } from '@ng-nest/ui/examples';
import { XApiModule } from '@ng-nest/ui/api';
import { XTabsModule } from '@ng-nest/ui/tabs';
import { XHighlightModule } from '@ng-nest/ui/highlight';
import { XPatternModule } from '@ng-nest/ui/pattern';

const modules = [
  CommonModule,
  FormsModule,
  RouterModule,
  HttpClientModule,
  ReactiveFormsModule,
  XDocModule,
  XExamplesModule,
  XApiModule,
  XTabsModule,
  XHighlightModule,
  XPatternModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules]
})
export class ShareModule {}
