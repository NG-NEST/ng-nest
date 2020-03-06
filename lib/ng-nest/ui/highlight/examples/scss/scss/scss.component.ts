import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ex-scss',
  templateUrl: './scss.component.html'
})
export class ExScssComponent implements OnInit {
  scss = `@mixin highlight {
  display: block;
  width: 100%;
  background-color: #eff0f1;
  > pre {
    display: flex;
    padding: 0;
    margin: 0;
    > code {
      padding: 1rem;
      line-height: 1.3rem;
    }
  }
}

body {
  @include highlight();
}
`;
  constructor() {}

  ngOnInit() {}
}
