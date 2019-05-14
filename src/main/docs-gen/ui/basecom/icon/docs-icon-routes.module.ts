import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NsDocsIconComponent } from "./docs-icon.component";

const routes: Routes = [
  {
    path: "",
    component: NsDocsIconComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsDocsIconRoutesModule {}
