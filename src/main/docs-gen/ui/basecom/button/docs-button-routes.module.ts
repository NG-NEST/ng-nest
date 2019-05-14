import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NsDocsButtonComponent } from "./docs-button.component";

const routes: Routes = [
  {
    path: "",
    component: NsDocsButtonComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsDocsButtonRoutesModule {}
