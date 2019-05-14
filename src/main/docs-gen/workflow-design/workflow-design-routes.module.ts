import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NsWorkflowDesignComponent } from "./workflow-design.component";

const routes: Routes = [
  {
    path: "",
    component: NsWorkflowDesignComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsWorkflowDesignRoutesModule {}
