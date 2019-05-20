import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NsComponentsComponent } from "./components.component";

const routes: Routes = [
  {
    path: "",
    component: NsComponentsComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsComponentsRoutesModule {}
