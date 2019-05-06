import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";

import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgMoonModule } from "ng-moon";
import { ShareModule } from "src/share/share.module";
import { MainRoutesModule } from "src/main/routes.module";

import { HighlightModule } from "ngx-highlightjs";

import xml from "highlight.js/lib/languages/xml";
import scss from "highlight.js/lib/languages/scss";
import typescript from "highlight.js/lib/languages/typescript";
import { TestComponent } from './test/test.component';

export function hljsLanguages() {
  return [
    { name: "typescript", func: typescript },
    { name: "scss", func: scss },
    { name: "xml", func: xml }
  ];
}

@NgModule({
  declarations: [AppComponent, TestComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ShareModule,
    MainRoutesModule,
    HighlightModule.forRoot({
      languages: hljsLanguages
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
