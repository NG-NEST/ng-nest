import { Component } from '@angular/core';
import { XNotificationService } from '@ng-nest/ui/notification';

@Component({
  selector: 'ex-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class ExDefaultComponent {
  content = '这个是内容信息这个是内容信息这个是内容信息这个是内容信息这个是内容信息这个是内容信息';
  constructor(public notification: XNotificationService) {}
}
