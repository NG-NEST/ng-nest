import { Component } from '@angular/core';
import { ExDefaultComponent } from './default/default.component';
import { ExScopeComponent } from './scope/scope.component';

@Component({
  selector: 'te-affix',
  standalone: true,
  imports: [ExDefaultComponent, ExScopeComponent],
  templateUrl: './affix.component.html'
})
export class TeAffixComponent {}
