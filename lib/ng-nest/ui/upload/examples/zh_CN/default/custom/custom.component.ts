import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XUploadComponent } from '@ng-nest/ui/upload';

@Component({
  selector: 'ex-custom',
  standalone: true,
  imports: [FormsModule, XUploadComponent, JsonPipe],
  templateUrl: './custom.component.html'
})
export class ExCustomComponent {
  model1 = signal([{ url: 'http://127.0.0.1:3000/upload/1650888347319-新建文本文档.txt', name: '新建文本文档' }]);

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
