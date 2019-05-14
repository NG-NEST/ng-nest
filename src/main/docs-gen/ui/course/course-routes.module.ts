import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NsCourseComponent } from "./course.component";

const routes: Routes = [
  {
    path: "",
    component: NsCourseComponent,
    children: [
      {
        path: "guide",
        loadChildren: "./guide/docs-guide.module#NsDocsGuideModule"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsCourseRoutesModule {}
