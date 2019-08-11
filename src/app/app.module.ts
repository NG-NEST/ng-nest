import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";

import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ShareModule } from "src/share/share.module";
import { MainRoutesModule } from "src/main/routes.module";
import { NgMoonModule } from "ng-moon";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ShareModule,
    NgMoonModule,
    MainRoutesModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
