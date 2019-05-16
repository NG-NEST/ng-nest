import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NsDocsInputComponent } from "./docs-input.component";

const routes: Routes = [
  {
    path: "",
    component: NsDocsInputComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsDocsInputRoutesModule {}
