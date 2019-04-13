import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UiComponent } from "./ui.component";

const routes: Routes = [
  {
    path: "",
    component: UiComponent,
    children: [
      { path: "", redirectTo: "introduction", pathMatch: "full" },
      { path: "introduction", loadChildren: "./introduction/introduction.module#IntroductionModule" },
      { path: "course", loadChildren: "./course/course.module#CourseModule" },
      { path: "components", loadChildren: "./components/components.module#ComponentsModule" },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiRoutesModule {}
