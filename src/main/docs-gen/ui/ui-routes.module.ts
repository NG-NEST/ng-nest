import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NsUiComponent } from "./ui.component";
{{ __imports }}
const routes: Routes = [
  {
    path: "",
    component: NsUiComponent,
    children: [{{ __children }}]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsUiRoutesModule {}
