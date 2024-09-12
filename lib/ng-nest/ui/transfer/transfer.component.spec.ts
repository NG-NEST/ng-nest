import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  XTransferComponent,
  XTransferListStyle,
  XTransferNode,
  XTransferPrefix,
  XTransferType
} from '@ng-nest/ui/transfer';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XData, XQuery, XTemplate } from '@ng-nest/ui/core';
import { XTableColumn } from '@ng-nest/ui/table';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  standalone: true,
  imports: [XTransferComponent],
  template: ` <x-transfer> </x-transfer> `
})
class XTestTransferComponent {}

@Component({
  standalone: true,
  imports: [XTransferComponent],
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
  nodeTpl = signal<TemplateRef<void> | null>(null);
  titleTpl = signal<TemplateRef<void> | null>(null);
  footerTpl = signal<TemplateRef<void> | null>(null);
  tableColumns = signal<XTableColumn[] | null>(null);
  tableIndex = signal(1);
  tableSize = signal(10);
  tableQuery = signal<XQuery>({});
  tableTotal = signal(0);
  inverse = signal(false);
}

describe(XTransferPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestTransferComponent, XTestTransferPropertyComponent],
      providers: [
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  describe('default.', () => {
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
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestTransferPropertyComponent>;
    // let component: XTestTransferPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestTransferPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('data.', () => {
      expect(true).toBe(true);
    });
    it('type.', () => {
      expect(true).toBe(true);
    });
    it('titles.', () => {
      expect(true).toBe(true);
    });
    it('listStyle.', () => {
      expect(true).toBe(true);
    });
    it('hiddenCheckAll.', () => {
      expect(true).toBe(true);
    });
    it('drag.', () => {
      expect(true).toBe(true);
    });
    it('search.', () => {
      expect(true).toBe(true);
    });
    it('tableHeadSearchTpl.', () => {
      expect(true).toBe(true);
    });
    it('nodeTpl.', () => {
      expect(true).toBe(true);
    });
    it('titleTpl.', () => {
      expect(true).toBe(true);
    });
    it('footerTpl.', () => {
      expect(true).toBe(true);
    });
    it('tableColumns.', () => {
      expect(true).toBe(true);
    });
    it('tableIndex.', () => {
      expect(true).toBe(true);
    });
    it('tableSize.', () => {
      expect(true).toBe(true);
    });
    it('tableQuery.', () => {
      expect(true).toBe(true);
    });
    it('tableTotal.', () => {
      expect(true).toBe(true);
    });
    it('inverse.', () => {
      expect(true).toBe(true);
    });
  });
});
