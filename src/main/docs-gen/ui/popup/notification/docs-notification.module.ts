import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NsDocsNotificationComponent } from "./docs-notification.component";
import { NsDocsNotificationRoutesModule } from "./docs-notification-routes.module";

@NgModule({
  imports: [CommonModule, NsDocsNotificationRoutesModule],
  declarations: [NsDocsNotificationComponent],
  exports: [NsDocsNotificationComponent]
})
export class NsDocsNotificationModule {}
