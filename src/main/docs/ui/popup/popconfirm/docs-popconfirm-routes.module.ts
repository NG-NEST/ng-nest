import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NsDocsPopconfirmComponent } from "./docs-popconfirm.component";

const routes: Routes = [
  {
    path: "",
    component: NsDocsPopconfirmComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsDocsPopconfirmRoutesModule {}
