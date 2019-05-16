import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NsDocsMessageComponent } from "./docs-message.component";

const routes: Routes = [
  {
    path: "",
    component: NsDocsMessageComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsDocsMessageRoutesModule {}
