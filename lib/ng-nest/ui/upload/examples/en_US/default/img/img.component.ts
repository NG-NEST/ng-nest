import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XUploadComponent } from '@ng-nest/ui/upload';

@Component({
  selector: 'ex-img',
  imports: [FormsModule, XUploadComponent, XIconComponent],
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ExImgComponent {
  imgs = signal([
    {
      url: 'https://ngnest.com/static/docs/course/rbac/1-introduction/demo/1__ng-nest-admin/light.png',
      name: 'Bright style'
    },
    {
      url: 'https://ngnest.com/static/docs/course/rbac/1-introduction/demo/1__ng-nest-admin/dark.png',
      name: 'Dark style'
    },
    { url: 'error', name: 'Wrong address' }
  ]);
}
