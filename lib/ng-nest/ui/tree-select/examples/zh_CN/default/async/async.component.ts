import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XTreeSelectComponent, XTreeSelectNode } from '@ng-nest/ui/tree-select';
import { Observable } from 'rxjs';

@Component({
  selector: 'ex-async',
  imports: [FormsModule, XTreeSelectComponent],
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.scss']
})
export class ExAsyncComponent {
  data = signal<XTreeSelectNode[]>([
    { id: 1, label: '水果' },
    { id: 2, label: '蔬菜' },
    { id: 3, label: '饮料' },
    { id: 4, label: '苹果', pid: 1 },
    { id: 5, label: '香蕉', pid: 1 },
    { id: 6, label: '梨子', pid: 1 },
    { id: 7, label: '生菜', pid: 2 },
    { id: 8, label: '大白菜', pid: 2 },
    { id: 9, label: '韭菜', pid: 2 },
    { id: 10, label: '汽水', pid: 3 },
    { id: 11, label: '果汁', pid: 3 },
    { id: 12, label: '纯净水', pid: 3 },
    { id: 13, label: '小米蕉', pid: 5 },
    { id: 14, label: '仙人蕉', pid: 5 },
    { id: 15, label: '皇帝蕉', pid: 5 }
  ]);
  model1 = signal<number | null>(null);
  model2 = signal<number | null>(null);

  getData1 = signal(
    new Observable<XTreeSelectNode[]>((x) => {
      setTimeout(() => {
        x.next(JSON.parse(JSON.stringify(this.data())));
        x.complete();
      }, 300);
    })
  );

  getData2 = signal((): Observable<XTreeSelectNode[]> => {
    return new Observable((x) => {
      setTimeout(() => {
        x.next(JSON.parse(JSON.stringify(this.data())));
        x.complete();
      }, 300);
    });
  });

  change(event: any) {
    console.log(event);
  }
}
