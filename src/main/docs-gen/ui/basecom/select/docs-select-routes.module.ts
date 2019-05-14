import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NsDocsSelectComponent } from "./docs-select.component";

const routes: Routes = [
  {
    path: "",
    component: NsDocsSelectComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsDocsSelectRoutesModule {}
