import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NsDocsModalComponent } from "./docs-modal.component";

const routes: Routes = [
  {
    path: "",
    component: NsDocsModalComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsDocsModalRoutesModule {}
