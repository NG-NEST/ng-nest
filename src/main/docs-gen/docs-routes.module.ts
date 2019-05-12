import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NsDocsComponent } from "./docs.component";
{{ __imports }}
const routes: Routes = [
  {
    path: "",
    component: NsDocsComponent,
    children: [{{ __children }}]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsDocsRoutesModule {}
