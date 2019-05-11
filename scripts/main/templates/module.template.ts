import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { {{ capName }}Component } from "./{{ fileName }}.component";
import { {{ capName }}RoutesModule } from "./{{ fileName }}-routes.module";
{{ imports }}
@NgModule({
  imports: [CommonModule, {{ capName }}RoutesModule{{ custom }}],
  declarations: [{{ capName }}Component],
  exports: [{{ capName }}Component]
})
export class {{ capName }}Module {}
