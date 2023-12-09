import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XNotificationService } from '@ng-nest/ui/notification';

@Component({
  selector: 'ex-type',
  standalone: true,
  imports: [CommonModule, XButtonComponent],
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class ExTypeComponent {
  content =
    '天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。';
  constructor(public notification: XNotificationService) {}
}
