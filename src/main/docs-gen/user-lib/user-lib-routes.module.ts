import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NsUserLibComponent } from "./user-lib.component";

const routes: Routes = [
  {
    path: "",
    component: NsUserLibComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsUserLibRoutesModule {}
