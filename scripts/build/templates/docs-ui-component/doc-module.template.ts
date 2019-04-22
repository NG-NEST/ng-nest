import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NmDoc{{ componentName }}Component } from "./{{ component }}.component";
import { NgMoonModule } from "ng-moon";
import { ShareModule } from "src/share/share.module";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: "", component: NmDoc{{ componentName }}Component }]),
    NgMoonModule,
    ShareModule
  ],
  declarations: [NmDoc{{ componentName }}Component],
  exports: [NmDoc{{ componentName }}Component]
})
export class NmDoc{{ componentName }}Module {}
