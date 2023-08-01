import { Component } from '@angular/core';

@Component({
  selector: 'ex-leaf',
  templateUrl: './leaf.component.html'
})
export class ExLeafComponent {
  data = [
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
    { id: 13, pid: 10, label: '数据库' },
    { id: 14, pid: 10, label: '网络' },
    { id: 15, pid: 10, label: '存储' },
    { id: 16, pid: 10, label: '数据库' }
  ];
}
