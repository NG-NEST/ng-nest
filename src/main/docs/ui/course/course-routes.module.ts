import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CourseComponent } from "./course.component";

const routes: Routes = [
  {
    path: "",
    component: CourseComponent,
    children: [
      { path: "", redirectTo: "guide", pathMatch: "full" },
      { path: "guide", loadChildren: "./guide/guide.module#GuideModule" },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutesModule {}
