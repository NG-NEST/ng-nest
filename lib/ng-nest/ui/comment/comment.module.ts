import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { XCommentComponent } from "./comment.component";
import { XCommentReplyComponent } from "./comment-reply.component";
import { FormsModule } from "@angular/forms";
import { XIconModule } from "@ng-nest/ui/icon";
import { XAvatarModule } from "@ng-nest/ui/avatar";
import { XButtonModule } from "@ng-nest/ui/button";
import { XLinkModule } from "@ng-nest/ui/link";
import { XInputModule } from "@ng-nest/ui/input";

@NgModule({
  declarations: [XCommentComponent, XCommentReplyComponent],
  exports: [XCommentComponent, XCommentReplyComponent],
  imports: [CommonModule, FormsModule, XIconModule, XInputModule, XLinkModule, XAvatarModule, XButtonModule]
})
export class XCommentModule {}
