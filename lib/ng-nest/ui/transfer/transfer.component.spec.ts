import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  XTransferComponent,
  XTransferListStyle,
  XTransferNode,
  XTransferPrefix,
  XTransferType
} from '@ng-nest/ui/transfer';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { XComputedStyle, XData, XQuery, XTemplate } from '@ng-nest/ui/core';
import { XTableColumn } from '@ng-nest/ui/table';
import { provideAnimations } from '@angular/platform-browser/animations';
import { XInputComponent } from '@ng-nest/ui/input';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Component({
  imports: [XTransferComponent],
  template: ` <x-transfer> </x-transfer> `
})
class XTestTransferComponent {}

@Component({
  imports: [XTransferComponent, XInputComponent, FormsModule, JsonPipe],
  template: `
    <x-transfer
      [data]="data()"
      [type]="type()"
      [titles]="titles()"
      [listStyle]="listStyle()"
      [hiddenCheckAll]="hiddenCheckAll()"
      [drag]="drag()"
      [search]="search()"
      [tableHeadSearchTpl]="tableHeadSearchTpl()"
      [nodeTpl]="nodeTpl()"
      [titleTpl]="titleTpl()"
      [footerTpl]="footerTpl()"
      [tableColumns]="tableColumns()"
      [(tableIndex)]="tableIndex"
      [(tableSize)]="tableSize"
      [tableQuery]="tableQuery()"
      [(tableTotal)]="tableTotal"
      [inverse]="inverse()"
    >
    </x-transfer>

    <ng-template #nodeTemplate let-node="$node">{{ node.label }} tpl</ng-template>
    <ng-template #titleTemplate let-title="$title">{{ title }} tpl</ng-template>
    <ng-template #footerTemplate1 let-source="$source">footer1 tpl</ng-template>
    <ng-template #footerTemplate2 let-source="$source">footer2 tpl</ng-template>
    <ng-template #tableHeadSearchTemplate1 let-column="$column">
      @switch (column.id) {
        @case ('id') {
          <x-input
            [style.width.%]="100"
            [(ngModel)]="searchValue.id"
            (ngModelChange)="searchChange($event, 'id')"
          ></x-input>
        }
        @case ('name') {
          <x-input
            [style.width.%]="100"
            [(ngModel)]="searchValue.name"
            (ngModelChange)="searchChange($event, 'name')"
          ></x-input>
        }
      }
    </ng-template>
    <ng-template #tableHeadSearchTemplate2 let-column="$column">
      @switch (column.id) {
        @case ('id') {
          <x-input
            [style.width.%]="100"
            [(ngModel)]="searchValue.id"
            (ngModelChange)="searchChange($event, 'id')"
          ></x-input>
        }
        @case ('name') {
          <x-input
            [style.width.%]="100"
            [(ngModel)]="searchValue.name"
            (ngModelChange)="searchChange($event, 'name')"
          ></x-input>
        }
      }
    </ng-template>
  `
})
class XTestTransferPropertyComponent {
  data = signal<XData<XTransferNode>>([]);
  type = signal<XTransferType>('list');
  titles = signal<string[] | null>(null);
  listStyle = signal<XTransferListStyle | null>(null);
  hiddenCheckAll = signal<boolean[] | null>(null);
  drag = signal(false);
  search = signal(false);
  tableHeadSearchTpl = signal<XTemplate[] | null>(null);
  tableHeadSearchTemplate1 = viewChild.required<TemplateRef<void>>('tableHeadSearchTemplate1');
  tableHeadSearchTemplate2 = viewChild.required<TemplateRef<void>>('tableHeadSearchTemplate2');
  nodeTpl = signal<TemplateRef<void> | null>(null);
  nodeTemplate = viewChild.required<TemplateRef<void>>('nodeTemplate');
  titleTpl = signal<TemplateRef<void> | null>(null);
  titleTemplate = viewChild.required<TemplateRef<void>>('titleTemplate');
  footerTpl = signal<(TemplateRef<void> | null)[]>([]);
  footerTemplate1 = viewChild.required<TemplateRef<void>>('footerTemplate1');
  footerTemplate2 = viewChild.required<TemplateRef<void>>('footerTemplate2');
  tableColumns = signal<XTableColumn[] | null>(null);
  tableIndex = signal(1);
  tableSize = signal(10);
  tableQuery = signal<XQuery>({});
  tableTotal = signal(0);
  inverse = signal(false);

  searchValue = {
    id: '',
    name: ''
  };

  searchChange(value: string, field: string) {
    console.log(value, field);
  }
}

xdescribe(XTransferPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestTransferComponent, XTestTransferPropertyComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  xdescribe('default.', () => {
    let fixture: ComponentFixture<XTestTransferComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestTransferComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XTransferComponent));
      expect(com).toBeDefined();
    });
  });
  xdescribe(`input.`, async () => {
    let fixture: ComponentFixture<XTestTransferPropertyComponent>;
    let component: XTestTransferPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestTransferPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    const defTable = (size = 10, index = 1, total = 20) => {
      component.tableTotal.set(total);
      component.tableIndex.set(index);
      component.data.set((_index: number, _size: number, _query: XQuery) =>
        of({
          total: total,
          list: Array.from({ length: size }).map((_, i) => ({ id: i + 1, name: 'name' + (i + 1) }))
        })
      );
      component.tableColumns.set([
        { label: 'Id', id: 'id' },
        { label: 'Name', id: 'name' }
      ]);
    };
    it('data.', () => {
      component.data.set(['node1', 'node2', 'node3']);
      fixture.detectChanges();
      let list = fixture.debugElement.query(By.css('.x-transfer-droplist'));
      expect(list.nativeElement.innerText).toBe('node1\nnode2\nnode3');
    });
    it('type.', () => {
      component.data.set([
        { id: 1, label: 'node1' },
        { id: 2, label: 'node2' },
        { id: 3, label: 'node3' },
        { id: 4, label: 'node4', pid: 3 },
        { id: 5, label: 'node5', pid: 3 },
        { id: 6, label: 'node6', pid: 3 }
      ]);
      component.type.set('tree');
      fixture.detectChanges();
      const tree = fixture.debugElement.query(By.css('x-tree'));
      expect(tree).toBeTruthy();
    });
    it('titles.', () => {
      component.titles.set(['title1', 'title2']);
      fixture.detectChanges();
      const titles = fixture.debugElement.queryAll(By.css('.x-transfer-title'));
      expect(titles[0].nativeElement.innerText).toBe('title1\n0 /');
      expect(titles[1].nativeElement.innerText).toBe('title2\n0 /');
    });
    it('listStyle.', () => {
      component.listStyle.set([{ backgroundColor: 'rgb(255, 0, 0)' }, { backgroundColor: 'rgb(0, 255, 0)' }]);
      fixture.detectChanges();
      const list = fixture.debugElement.queryAll(By.css('.x-transfer-list'));
      expect(XComputedStyle(list[0].nativeElement, 'background-color')).toBe('rgb(255, 0, 0)');
      expect(XComputedStyle(list[1].nativeElement, 'background-color')).toBe('rgb(0, 255, 0)');
    });
    it('hiddenCheckAll.', () => {
      component.hiddenCheckAll.set([true, true]);
      fixture.detectChanges();
      const checkAll = fixture.debugElement.queryAll(By.css('.x-transfer-check-all'));
      expect(checkAll.length).toBe(0);
    });
    it('drag.', () => {
      // cdk drag
      expect(true).toBe(true);
    });
    it('search.', async () => {
      component.data.set(['node1', 'node2', 'node3']);
      component.search.set(true);
      fixture.detectChanges();
      const search = fixture.debugElement.query(By.css('.x-transfer-search'));
      expect(search).toBeTruthy();
    });
    it('tableHeadSearchTpl.', () => {
      component.type.set('table');
      component.tableColumns.set([
        { id: 'checked', label: '', rowChecked: true, headChecked: true, type: 'checkbox', width: 60 },
        { id: 'id', label: 'Id', flex: 0.5, left: 0 },
        { id: 'name', label: 'Name', flex: 1 }
      ]);
      component.data.set((_index: number, _size: number, _query: XQuery) =>
        of({
          total: 100,
          list: [
            { id: 1, name: 'node1' },
            { id: 2, name: 'node2' },
            { id: 3, name: 'node3' }
          ]
        })
      );
      component.tableHeadSearchTpl.set([component.tableHeadSearchTemplate1(), component.tableHeadSearchTemplate2()]);
      fixture.detectChanges();
      const inputs = fixture.debugElement.queryAll(By.css('.x-table .x-table-search input'));
      expect(inputs.length).toBe(4);
    });
    it('nodeTpl.', () => {
      component.data.set(['node1', 'node2', 'node3']);
      component.nodeTpl.set(component.nodeTemplate());
      fixture.detectChanges();
      const list = fixture.debugElement.query(By.css('.x-transfer-list'));
      expect(list.nativeElement.innerText).toBe('node1 tpl\nnode2 tpl\nnode3 tpl');
      expect(true).toBe(true);
    });
    it('titleTpl.', () => {
      component.titles.set(['title1', 'title2']);
      component.titleTpl.set(component.titleTemplate());
      fixture.detectChanges();
      const titles = fixture.debugElement.queryAll(By.css('.x-transfer-title'));
      expect(titles[0].nativeElement.innerText).toBe('title1 tpl');
      expect(titles[1].nativeElement.innerText).toBe('title2 tpl');
    });
    it('footerTpl.', () => {
      component.footerTpl.set([component.footerTemplate1(), component.footerTemplate2()]);
      fixture.detectChanges();
      // console.log(component.footerTpl());
      const footers = fixture.debugElement.queryAll(By.css('.x-transfer-footer'));
      expect(footers[0].nativeElement.innerText).toBe('footer1 tpl');
      expect(footers[1].nativeElement.innerText).toBe('footer2 tpl');
    });
    it('tableColumns.', () => {
      component.type.set('table');
      component.tableColumns.set([
        { id: 'checked', label: '', rowChecked: true, headChecked: true, type: 'checkbox', width: 60 },
        { id: 'id', label: 'Id', flex: 0.5, left: 0 },
        { id: 'name', label: 'Name', flex: 1 }
      ]);
      component.data.set((_index: number, _size: number, _query: XQuery) =>
        of({
          total: 100,
          list: [
            { id: 1, name: 'node1' },
            { id: 2, name: 'node2' },
            { id: 3, name: 'node3' }
          ]
        })
      );
      fixture.detectChanges();
      const table = fixture.debugElement.query(By.css('x-table'));
      expect(table).toBeTruthy();
    });
    it('tableIndex.', () => {
      defTable(10, 2);
      component.type.set('table');
      fixture.detectChanges();
      const pageLink = fixture.debugElement.query(By.css('x-table .x-pagination-link .x-button-activated'));
      expect(pageLink.nativeElement.innerText).toBe('2');
    });
    it('tableSize.', () => {
      component.tableSize.set(5);
      component.type.set('table');
      defTable(5);
      fixture.detectChanges();
      const pageLinks = fixture.debugElement.queryAll(By.css('x-table .x-pagination-link'));
      expect(pageLinks.length).toBe(4);
      let trs = fixture.debugElement.queryAll(By.css('x-table tbody tr'));
      expect(trs.length).toBe(5);
    });
    it('tableQuery.', () => {
      component.tableQuery.set({ filter: [{ field: 'name', value: 'name1' }] });
      component.tableColumns.set([
        { label: 'Id', id: 'id' },
        { label: 'Name', id: 'name' }
      ]);
      let data = Array.from({ length: 100 }).map((_, i) => ({ id: i + 1, name: 'name' + (i + 1) }));
      component.data.set(
        (_index: number, _size: number, query: XQuery) =>
          new Observable((x) => {
            let list = data.filter((y) => y.name === query.filter![0].value!);
            x.next({
              total: list.length,
              list
            });
            x.complete();
          })
      );
      component.type.set('table');
      fixture.detectChanges();
      let trs = fixture.debugElement.queryAll(By.css('.x-table tbody tr'));
      expect(trs.length).toBe(1);
      expect(trs[0].nativeElement.innerText).toContain('1\nname1');
    });
    it('tableTotal.', () => {
      defTable(10, 1, 10);
      component.type.set('table');
      fixture.detectChanges();
      let trs = fixture.debugElement.queryAll(By.css('.x-table tbody tr'));
      expect(trs.length).toBe(10);
    });
    it('inverse.', () => {
      component.inverse.set(true);
      fixture.detectChanges();
      const inverse = fixture.debugElement.query(By.css('.x-transfer-inverse'));
      expect(inverse).toBeTruthy();
    });
  });
});
