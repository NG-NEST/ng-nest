import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ex-html",
  templateUrl: "./html.component.html"
})
export class ExHtmlComponent implements OnInit {
  html = `<!DOCTYPE html>
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
</html>`;
  constructor() {}

  ngOnInit() {}
}
