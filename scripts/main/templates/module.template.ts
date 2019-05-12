import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { {{ __capName }}Component } from "./{{ __fileName }}.component";
import { {{ __capName }}RoutesModule } from "./{{ __fileName }}-routes.module";
{{ __imports }}
@NgModule({
  imports: [CommonModule, {{ __capName }}RoutesModule{{ __custom }}],
  declarations: [{{ __capName }}Component],
  exports: [{{ __capName }}Component]
})
export class {{ __capName }}Module {}
