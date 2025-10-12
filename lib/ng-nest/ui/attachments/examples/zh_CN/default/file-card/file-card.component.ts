import { Component } from '@angular/core';
import { XFileCardComponent } from '@ng-nest/ui/attachments';

@Component({
  selector: 'ex-file-card',
  imports: [XFileCardComponent],
  templateUrl: './file-card.component.html',
  styleUrl: './file-card.component.scss'
})
export class ExFileCardComponent {
  files = [
    {
      name: 'excel-file.xlsx',
      size: 100000
    },
    {
      name: 'word-file.docx',
      size: 200000
    },
    {
      name: 'image-file.png',
      size: 300000
    },
    {
      name: 'pdf-file.pdf',
      size: 400000
    },
    {
      name: 'ppt-file.pptx',
      size: 500000
    },
    {
      name: 'video-file.mp4',
      size: 600000
    },
    {
      name: 'audio-file.mp3',
      size: 700000
    },
    {
      name: 'zip-file.zip',
      size: 800000
    },
    {
      name: 'markdown-file.md',
      description: 'Custom description here'
    },
    {
      name: 'image-file.png',
      url: 'https://ngnest.com/static/docs/course/rbac/1-introduction/demo/1__ng-nest-admin/light.png',
      size: 100000
    }
  ];
}
