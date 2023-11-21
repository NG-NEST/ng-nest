import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Exception404Component } from './404.component';
import { Exception404RoutesModule } from './404-routes.module';
import { XI18nPipe } from '@ng-nest/ui/i18n';

@NgModule({
  imports: [CommonModule, XI18nPipe, Exception404RoutesModule],
  declarations: [Exception404Component],
  exports: [Exception404Component]
})
export class Exception404Module {}
