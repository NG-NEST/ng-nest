import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NsDocsTreeComponent } from "./docs-tree.component";

const routes: Routes = [
  {
    path: "",
    component: NsDocsTreeComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsDocsTreeRoutesModule {}
