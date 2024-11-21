import { Component, signal } from '@angular/core';
import { XHighlightComponent } from '@ng-nest/ui/highlight';

@Component({
  selector: 'ex-typescript',
  imports: [XHighlightComponent],
  templateUrl: './typescript.component.html'
})
export class ExTypescriptComponent {
  typescript = signal(`import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor() {}
}`);
}
