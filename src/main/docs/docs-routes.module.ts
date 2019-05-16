import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NsDocsComponent } from "./docs.component";

const routes: Routes = [
  {
    path: "",
    component: NsDocsComponent,
    children: [
      {
        path: "ui",
        loadChildren: "./ui/ui.module#NsUiModule"
      },
      {
        path: "user-lib",
        loadChildren: "./user-lib/user-lib.module#NsUserLibModule"
      },
      {
        path: "form-design",
        loadChildren: "./form-design/form-design.module#NsFormDesignModule"
      },
      {
        path: "workflow-design",
        loadChildren: "./workflow-design/workflow-design.module#NsWorkflowDesignModule"
      },
      {
        path: "code-generator",
        loadChildren: "./code-generator/code-generator.module#NsCodeGeneratorModule"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsDocsRoutesModule {}
