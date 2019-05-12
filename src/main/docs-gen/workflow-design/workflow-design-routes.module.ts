import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NsWorkflowDesignComponent } from "./workflow-design.component";
{{ __imports }}
const routes: Routes = [
  {
    path: "",
    component: NsWorkflowDesignComponent,
    children: [{{ __children }}]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsWorkflowDesignRoutesModule {}
