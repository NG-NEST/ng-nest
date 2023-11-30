import { Component } from '@angular/core';
import { XHighlightComponent } from '@ng-nest/ui/highlight';

@Component({
  selector: 'ex-typescript',
  standalone: true,
  imports: [XHighlightComponent],
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
