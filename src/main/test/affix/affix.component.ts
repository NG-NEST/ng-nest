import { Component } from '@angular/core';
import { ExDefaultComponent, ExScopeComponent } from '@ng-nest/ui/affix/examples';

@Component({
  selector: 'te-affix',
  imports: [ExDefaultComponent, ExScopeComponent],
  templateUrl: './affix.component.html'
})
export class TeAffixComponent {}
