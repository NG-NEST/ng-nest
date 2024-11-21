import { Component } from '@angular/core';
import { ExDefaultComponent, ExContentComponent } from '@ng-nest/ui/tree-file/examples';

@Component({
  selector: 'te-tree-file',
  imports: [ExDefaultComponent, ExContentComponent],
  templateUrl: './tree-file.component.html'
})
export class TeTreeFileComponent {}
