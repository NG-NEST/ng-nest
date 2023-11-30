import { Component } from '@angular/core';
import { XHighlightComponent } from '@ng-nest/ui/highlight';

@Component({
  selector: 'ex-scss',
  standalone: true,
  imports: [XHighlightComponent],
  templateUrl: './scss.component.html'
})
export class ExScssComponent {
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
}
