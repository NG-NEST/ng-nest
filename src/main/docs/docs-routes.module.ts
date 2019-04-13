import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DocsComponent } from "./docs.component";

const routes: Routes = [
  {
    path: "",
    component: DocsComponent,
    children: [
      { path: "", redirectTo: "index", pathMatch: "full" },
      { path: "index", loadChildren: "./index/index.module#IndexModule" },
      { path: "ui", loadChildren: "./ui/ui.module#UiModule" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocsRoutesModule {}
