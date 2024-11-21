import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XSwitchComponent } from '@ng-nest/ui/switch';

@Component({
  selector: 'ex-text',
  imports: [FormsModule, XSwitchComponent, XIconComponent],
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class ExTextComponent {}
