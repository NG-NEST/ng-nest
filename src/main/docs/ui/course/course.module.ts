import { ShareModule } from 'src/share/share.module';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NsCourseComponent } from "./course.component";
import { NsCourseRoutesModule } from "./course-routes.module";

@NgModule({
  imports: [CommonModule, ShareModule, NsCourseRoutesModule],
  declarations: [NsCourseComponent],
  exports: [NsCourseComponent]
})
export class NsCourseModule {}
