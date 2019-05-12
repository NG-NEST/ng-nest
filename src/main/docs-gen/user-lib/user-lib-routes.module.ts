import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NsUserLibComponent } from "./user-lib.component";
{{ __imports }}
const routes: Routes = [
  {
    path: "",
    component: NsUserLibComponent,
    children: [{{ __children }}]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsUserLibRoutesModule {}
