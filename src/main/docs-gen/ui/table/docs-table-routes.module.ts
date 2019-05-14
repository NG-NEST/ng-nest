import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NsDocsTableComponent } from "./docs-table.component";

const routes: Routes = [
  {
    path: "",
    component: NsDocsTableComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsDocsTableRoutesModule {}
