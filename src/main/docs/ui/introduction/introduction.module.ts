import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IntroductionRoutesModule } from './introduction-routes.module';
import { IntroductionComponent } from './introduction.component';

@NgModule({
  imports: [CommonModule, IntroductionRoutesModule],
  declarations: [IntroductionComponent],
  exports: [IntroductionComponent]
})
export class IntroductionModule {}
