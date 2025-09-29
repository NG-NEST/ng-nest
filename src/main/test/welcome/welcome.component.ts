import { Component } from '@angular/core';
import { ExDefaultComponent, ExStyleComponent, ExVariantComponent } from '@ng-nest/ui/welcome/examples';

@Component({
  selector: 'te-welcome',
  imports: [ExDefaultComponent, ExVariantComponent, ExStyleComponent],
  templateUrl: './welcome.component.html'
})
export class TeWelcomeComponent {}
