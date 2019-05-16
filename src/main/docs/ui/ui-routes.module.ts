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
        path: "basecom",
        loadChildren: "./basecom/basecom.module#NsBasecomModule"
      },
      {
        path: "popup",
        loadChildren: "./popup/popup.module#NsPopupModule"
      },
      {
        path: "table",
        loadChildren: "./table/docs-table.module#NsDocsTableModule"
      },
      {
        path: "tree",
        loadChildren: "./tree/docs-tree.module#NsDocsTreeModule"
      },
      {
        path: "form",
        loadChildren: "./form/docs-form.module#NsDocsFormModule"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsUiRoutesModule {}
