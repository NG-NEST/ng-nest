import { ShareModule } from '@share';
import { NgModule } from '@angular/core';
import { {{ __capName }}Component } from './{{ __fileName }}.component';
import { {{ __capName }}RoutesModule } from './{{ __fileName }}-routes.module';
{{ __imports }}
@NgModule({
  imports: [ShareModule, {{ __capName }}RoutesModule{{ __modules }}],
  declarations: [{{ __capName }}Component{{ __declarations }}],
  exports: [{{ __capName }}Component]
})
export class {{ __capName }}Module {}
