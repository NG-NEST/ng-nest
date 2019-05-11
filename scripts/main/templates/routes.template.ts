import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { {{ capName }}Component } from "./{{ fileName }}.component";
{{ imports }}
const routes: Routes = [
  {
    path: "",
    component: {{ capName }}Component,
    children: [{{ children }}]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class {{ capName }}RoutesModule {}
