import { Component } from '@angular/core';

@Component({
  selector: 'ex-typescript',
  templateUrl: './typescript.component.html'
})
export class ExTypescriptComponent {
  typescript = `import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor() {}
}`;
}
