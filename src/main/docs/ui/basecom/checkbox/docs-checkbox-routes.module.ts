import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NsDocsCheckboxComponent } from "./docs-checkbox.component";

const routes: Routes = [
  {
    path: "",
    component: NsDocsCheckboxComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsDocsCheckboxRoutesModule {}
