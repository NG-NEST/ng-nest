import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NsDocsIntroductionComponent } from "./docs-introduction.component";

const routes: Routes = [
  {
    path: "",
    component: NsDocsIntroductionComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsDocsIntroductionRoutesModule {}
