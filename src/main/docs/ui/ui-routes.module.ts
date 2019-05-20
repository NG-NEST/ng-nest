import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NsUiComponent } from "./ui.component";

const routes: Routes = [
  {
    path: "",
    component: NsUiComponent,
    children: [
      {
        path: "introduction",
        loadChildren: "./introduction/docs-introduction.module#NsDocsIntroductionModule"
      },
      {
        path: "course",
        loadChildren: "./course/course.module#NsCourseModule"
      },
      {
        path: "components",
        loadChildren: "./components/components.module#NsComponentsModule"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsUiRoutesModule {}
