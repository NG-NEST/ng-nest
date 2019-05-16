import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NsDocsDatetimeComponent } from "./docs-datetime.component";

const routes: Routes = [
  {
    path: "",
    component: NsDocsDatetimeComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsDocsDatetimeRoutesModule {}
