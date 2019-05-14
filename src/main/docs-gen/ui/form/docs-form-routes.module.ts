import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NsDocsFormComponent } from "./docs-form.component";

const routes: Routes = [
  {
    path: "",
    component: NsDocsFormComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsDocsFormRoutesModule {}
