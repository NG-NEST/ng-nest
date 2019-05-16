import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NsPopupComponent } from "./popup.component";

const routes: Routes = [
  {
    path: "",
    component: NsPopupComponent,
    children: [
      {
        path: "alert",
        loadChildren: "./alert/docs-alert.module#NsDocsAlertModule"
      },
      {
        path: "message",
        loadChildren: "./message/docs-message.module#NsDocsMessageModule"
      },
      {
        path: "modal",
        loadChildren: "./modal/docs-modal.module#NsDocsModalModule"
      },
      {
        path: "notification",
        loadChildren: "./notification/docs-notification.module#NsDocsNotificationModule"
      },
      {
        path: "loading",
        loadChildren: "./loading/docs-loading.module#NsDocsLoadingModule"
      },
      {
        path: "popconfirm",
        loadChildren: "./popconfirm/docs-popconfirm.module#NsDocsPopconfirmModule"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsPopupRoutesModule {}
