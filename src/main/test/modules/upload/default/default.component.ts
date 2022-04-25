import { Component } from '@angular/core';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  model1 = [{ url: 'http://127.0.0.1:3000/upload/1650888347319-新建文本文档.txt', name: '新建文本文档' }];

  change($event: any) {
    console.log($event);
  }
}
