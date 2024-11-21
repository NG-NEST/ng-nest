import { Component, signal } from '@angular/core';
import { XHighlightComponent } from '@ng-nest/ui/highlight';

@Component({
  selector: 'ex-html',
  imports: [XHighlightComponent],
  templateUrl: './html.component.html'
})
export class ExHtmlComponent {
  html = signal(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>NG-NEST</title>
    <base href="/" />

    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
  </head>
  <body>
    NG-NEST
  </body>
</html>`);
}
