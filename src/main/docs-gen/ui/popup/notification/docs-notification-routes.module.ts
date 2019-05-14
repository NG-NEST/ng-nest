import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NsDocsNotificationComponent } from "./docs-notification.component";

const routes: Routes = [
  {
    path: "",
    component: NsDocsNotificationComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsDocsNotificationRoutesModule {}
