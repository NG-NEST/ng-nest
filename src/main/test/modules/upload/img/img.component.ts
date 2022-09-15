import { Component } from '@angular/core';

@Component({
  selector: 'ex-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ExImgComponent {
  imgs = [
    { url: 'https://ngnest.com/static/docs/course/rbac/1-introduction/demo/1__ng-nest-admin/light.png', name: '明亮风格' },
    {
      url: 'https://ngnest.com/static/docs/course/rbac/1-introduction/demo/1__ng-nest-admin/dark.png',
      name: '黑暗风格'
    },
    { url: 'error', name: '错误的地址' }
  ];
}
