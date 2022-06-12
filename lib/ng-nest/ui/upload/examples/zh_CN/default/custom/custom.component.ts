import { Component } from '@angular/core';

@Component({
  selector: 'ex-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class ExCustomComponent {
  model1 = [{ url: 'http://127.0.0.1:3000/upload/1650888347319-新建文本文档.txt', name: '新建文本文档' }];

  change($event: any) {
    console.log($event);
  }

  uploadReady($event: any) {
    console.log('uploadReady', $event);
  }

  uploading($event: any) {
    console.log('uploading', $event);
  }

  uploadSuccess($event: any) {
    console.log('uploadSuccess', $event);
  }

  uploadError($event: any) {
    console.log('uploadError', $event);
  }

}
