import { Component, signal } from '@angular/core';
import { XMenuComponent } from '@ng-nest/ui/menu';

@Component({
  selector: 'ex-size',
  standalone: true,
  imports: [XMenuComponent],
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class ExSizeComponent {
  data = signal([
    { id: 1, label: '最新活动', icon: 'fto-gift' },
    { id: 2, label: '产品', icon: 'fto-package' },
    { id: 3, label: '解决方案', icon: 'fto-layers' },
    { id: 4, label: '帮助和支持', icon: 'fto-phone' },
    { id: 5, pid: 2, label: '云基础' },
    { id: 6, pid: 2, label: '智能大数据' },
    { id: 7, pid: 2, label: '行业应用' },
    { id: 8, pid: 2, label: '区块链' },
    { id: 9, pid: 2, label: '专有云' },
    { id: 10, pid: 5, label: '计算' },
    { id: 11, pid: 5, label: '网络' },
    { id: 12, pid: 5, label: '存储' },
    { id: 13, pid: 5, label: '数据库' }
  ]);
}
