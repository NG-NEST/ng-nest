import { ShareModule } from 'src/share/share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { {{ __capName }}Component } from './{{ __fileName }}.component';
import { {{ __capName }}RoutesModule } from './{{ __fileName }}-routes.module';
{{ __imports }}
@NgModule({
  imports: [CommonModule, ShareModule, {{ __capName }}RoutesModule{{ __modules }}],
  declarations: [{{ __capName }}Component{{ __declarations }}],
  exports: [{{ __capName }}Component]
})
export class {{ __capName }}Module {}
