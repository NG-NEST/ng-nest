import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ComponentsComponent } from "./components.component";

const routes: Routes = [
  {
    path: "",
    component: ComponentsComponent,
    children: [
      { path: "", redirectTo: "input", pathMatch: "full" },
      { path: "input", loadChildren: "./input/input.module#InputModule" },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutesModule {}
