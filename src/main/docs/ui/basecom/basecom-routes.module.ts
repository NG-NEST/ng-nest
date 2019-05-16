import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NsBasecomComponent } from "./basecom.component";

const routes: Routes = [
  {
    path: "",
    component: NsBasecomComponent,
    children: [
      {
        path: "icon",
        loadChildren: "./icon/docs-icon.module#NsDocsIconModule"
      },
      {
        path: "input",
        loadChildren: "./input/docs-input.module#NsDocsInputModule"
      },
      {
        path: "button",
        loadChildren: "./button/docs-button.module#NsDocsButtonModule"
      },
      {
        path: "radio",
        loadChildren: "./radio/docs-radio.module#NsDocsRadioModule"
      },
      {
        path: "checkbox",
        loadChildren: "./checkbox/docs-checkbox.module#NsDocsCheckboxModule"
      },
      {
        path: "select",
        loadChildren: "./select/docs-select.module#NsDocsSelectModule"
      },
      {
        path: "datetime",
        loadChildren: "./datetime/docs-datetime.module#NsDocsDatetimeModule"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsBasecomRoutesModule {}
