import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NsDocsAlertComponent } from "./docs-alert.component";

const routes: Routes = [
  {
    path: "",
    component: NsDocsAlertComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsDocsAlertRoutesModule {}
