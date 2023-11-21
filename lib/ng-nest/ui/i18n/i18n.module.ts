import { NgModule } from '@angular/core';
import { XI18nPipe } from './i18n.pipe';
import { XI18nDirective } from './i18n.directive';

@NgModule({
  imports: [XI18nPipe, XI18nDirective],
  exports: [XI18nPipe, XI18nDirective]
})
export class XI18nModule {}
