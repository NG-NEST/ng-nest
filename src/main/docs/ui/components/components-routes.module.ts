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
      { path: "icon", loadChildren: "../../ui-bak/components/icon/icon.module#NmDocIconModule" },
      { path: "input-bak", loadChildren: "../../ui-bak/components/input/input.module#NmDocInputModule" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutesModule {}
