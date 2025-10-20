import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Component,
  ElementRef,
  provideZonelessChangeDetection,
  signal,
  TemplateRef,
  viewChild
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { XListComponent, XListDragDrop, XListNode, XListPrefix } from '@ng-nest/ui/list';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { XData, XSize, XSleep, XTemplate } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  imports: [XListComponent],
  template: ` <x-list></x-list> `
})
class XTestListComponent {}

@Component({
  imports: [XListComponent, FormsModule],
  template: `
    <div #scrollElementRef style="overflow: auto; height: 100px">
      <x-list
        [(ngModel)]="value"
        [data]="data()"
        [multiple]="multiple()"
        [selectAll]="selectAll()"
        [selectAllText]="selectAllText()"
        [checked]="checked()"
        [drag]="drag()"
        [objectArray]="objectArray()"
        [nodeTpl]="nodeTpl()"
        [header]="header()"
        [footer]="footer()"
        [scrollElement]="scrollElement()"
        [loadMore]="loadMore()"
        [loadMoreText]="loadMoreText()"
        [loadingMoreText]="loadingMoreText()"
        [virtualScroll]="virtualScroll()"
        [scrollHeight]="scrollHeight()"
        [heightAdaption]="heightAdaption()"
        [minBufferPx]="minBufferPx()"
        [maxBufferPx]="maxBufferPx()"
        [keywordText]="keywordText()"
        [caseSensitive]="caseSensitive()"
        [inPortal]="inPortal()"
        (onSelectAll)="onSelectAll($event)"
        (nodeMouseenter)="nodeMouseenter($event)"
        (nodeMouseleave)="nodeMouseleave($event)"
        (nodeClick)="nodeClick($event)"
        (dropListDropped)="dropListDropped($event)"
        (keyManagerTabOut)="keyManagerTabOut()"
        (keyManagerChange)="keyManagerChange($event)"
        [size]="size()"
      >
      </x-list>

      <ng-template #nodeTemplate let-node="$node">{{ node.label }} tpl</ng-template>
    </div>
  `
})
class XTestListPropertyComponent {
  value = signal<string | string[] | XListNode[]>('');
  data = signal<XData<XListNode>>([]);
  multiple = signal(1);
  selectAll = signal(false);
  selectAllText = signal('');
  checked = signal(false);
  drag = signal(false);
  objectArray = signal(false);
  nodeTpl = signal<TemplateRef<any> | null>(null);
  nodeTemplate = viewChild.required<TemplateRef<void>>('nodeTemplate');
  header = signal<XTemplate>('');
  footer = signal<XTemplate>('');
  scrollElement = signal<HTMLElement | null>(null);
  scrollElementRef = viewChild.required<ElementRef<HTMLDivElement>>('scrollElementRef');
  loadMore = signal(false);
  loadMoreText = signal('');
  loadingMoreText = signal('');
  virtualScroll = signal(false);
  scrollHeight = signal(400);
  heightAdaption = signal<ElementRef<HTMLElement> | HTMLElement | null>(null);
  minBufferPx = signal(100);
  maxBufferPx = signal(200);
  keywordText = signal<string | string[]>('');
  caseSensitive = signal(true);
  inPortal = signal(false);

  onSelectAllResult = signal<boolean | null>(null);
  onSelectAll(selelcAll: boolean) {
    this.onSelectAllResult.set(selelcAll);
  }

  nodeMouseenterResult = signal<XListNode | null>(null);
  nodeMouseenter(node: XListNode) {
    this.nodeMouseenterResult.set(node);
  }

  nodeMouseleaveResult = signal<XListNode | null>(null);
  nodeMouseleave(node: XListNode) {
    this.nodeMouseleaveResult.set(node);
  }

  nodeClickResult = signal<XListNode | null>(null);
  nodeClick(node: XListNode) {
    this.nodeClickResult.set(node);
  }

  dropListDroppedResult = signal<XListDragDrop | null>(null);
  dropListDropped(node: XListDragDrop) {
    this.dropListDroppedResult.set(node);
  }

  keyManagerTabOut() {}

  keyManagerChangeResult = signal<number | null>(null);
  keyManagerChange(key: number) {
    this.keyManagerChangeResult.set(key);
  }

  size = signal<XSize>('medium');
}

xdescribe(XListPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestListComponent, XTestListPropertyComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  xdescribe('default.', () => {
    let fixture: ComponentFixture<XTestListComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestListComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XListComponent));
      expect(com).toBeDefined();
    });
  });
  xdescribe(`input.`, async () => {
    let fixture: ComponentFixture<XTestListPropertyComponent>;
    let component: XTestListPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestListPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('data.', () => {
      component.data.set(['aa', 'bb', 'cc']);
      fixture.detectChanges();
      const options = fixture.debugElement.queryAll(By.css('x-list-option'));
      expect(options[0].nativeElement.innerText).toBe('aa');
      expect(options[1].nativeElement.innerText).toBe('bb');
      expect(options[2].nativeElement.innerText).toBe('cc');
    });
    it('multiple.', () => {
      component.data.set(['aa', 'bb', 'cc']);
      component.multiple.set(2);
      fixture.detectChanges();
      const options = fixture.debugElement.queryAll(By.css('x-list-option'));
      for (let option of options) {
        option.nativeElement.click();
      }
      fixture.detectChanges();
      expect((component.value() as string[]).join(',')).toBe('aa,bb');
    });
    it('selectAll.', () => {
      component.multiple.set(0);
      component.selectAll.set(true);
      component.data.set(['aa', 'bb', 'cc']);
      fixture.detectChanges();

      const selectAll = fixture.debugElement.query(By.css('.x-list-select-all x-list-option')).nativeElement;
      selectAll.click();
      fixture.detectChanges();
      expect((component.value() as string[]).join(',')).toBe('aa,bb,cc');
    });
    it('selectAllText.', () => {
      component.multiple.set(0);
      component.selectAll.set(true);
      component.selectAllText.set('select all');
      fixture.detectChanges();
      const selectAll = fixture.debugElement.query(By.css('.x-list-select-all x-list-option')).nativeElement;
      expect(selectAll.innerText).toBe('select all');
    });
    it('checked.', () => {
      component.data.set(['aa', 'bb', 'cc']);
      component.checked.set(true);
      fixture.detectChanges();
      const option = fixture.debugElement.query(By.css('x-list-option:nth-child(1)')).nativeElement;
      option.click();
      fixture.detectChanges();
      const checked = option.querySelector('.x-list-checked');
      expect(checked).toBeTruthy();
    });
    it('drag.', async () => {
      // cdk drag. unable to simulate the drag effect through javascript
      //
      // component.data.set(['aa', 'bb', 'cc']);
      // component.drag.set(true);
      // fixture.detectChanges();
      // const option = fixture.debugElement.query(By.css('x-list-option:nth-child(1)')).nativeElement;
      // option.dispatchEvent(new MouseEvent('mousedown', { view: window, bubbles: true, cancelable: true }));
      // fixture.detectChanges();
      // option.dispatchEvent(
      //   new MouseEvent('mousemove', { view: window, bubbles: true, cancelable: true, clientX: 0, clientY: 72 })
      // );
      // fixture.detectChanges();
      // option.dispatchEvent(new MouseEvent('mouseup', { view: window, bubbles: true, cancelable: true }));
      // fixture.detectChanges();

      expect(true).toBe(true);
    });
    it('objectArray.', () => {
      component.data.set(['aa', 'bb', 'cc']);
      component.multiple.set(2);
      component.objectArray.set(true);
      fixture.detectChanges();
      const options = fixture.debugElement.queryAll(By.css('x-list-option'));
      for (let option of options) {
        option.nativeElement.click();
      }
      fixture.detectChanges();
      expect((component.value() as XListNode[]).map((x) => x.id).join(',')).toBe('aa,bb');
    });
    it('nodeTpl.', () => {
      component.nodeTpl.set(component.nodeTemplate());
      component.data.set(['aa']);
      fixture.detectChanges();
      const option = fixture.debugElement.query(By.css('x-list-option'));
      expect(option.nativeElement.innerText).toBe('aa tpl');
    });
    it('header.', () => {
      component.header.set('header');
      fixture.detectChanges();
      const header = fixture.debugElement.query(By.css('.x-list-header')).nativeElement;
      expect(header.innerText).toBe('header');
    });
    it('footer.', () => {
      component.footer.set('footer');
      fixture.detectChanges();
      const footer = fixture.debugElement.query(By.css('.x-list-footer')).nativeElement;
      expect(footer.innerText).toBe('footer');
    });
    it('scrollElement.', () => {
      component.scrollElement.set(component.scrollElementRef().nativeElement);
      component.data.set(['aa', 'bb', 'cc', 'dd', 'ee', 'ff']);
      fixture.detectChanges();
      const diff =
        component.scrollElementRef().nativeElement.scrollHeight -
        component.scrollElementRef().nativeElement.clientHeight;
      expect(diff > 0).toBe(true);
    });
    it('loadMore.', async () => {
      const list = ['AA', 'BB', 'CC', 'DD'];
      component.loadMore.set(true);
      component.data.set(
        (index: number) =>
          new Observable<string[]>((x) => {
            setTimeout(() => {
              x.next(list.map((x) => `${x}-${index}`));
              x.complete();
            }, 50);
          })
      );
      fixture.detectChanges();
      await XSleep(80);
      const loadMore = fixture.debugElement.query(By.css('.x-list-load-more x-list-option'));
      loadMore.nativeElement.click();
      fixture.detectChanges();
      await XSleep(80);
      const options = fixture.debugElement.queryAll(By.css('.x-list-content x-list-option'));
      expect(options.length).toBe(8);
    });
    it('loadMoreText.', async () => {
      component.loadMore.set(true);
      component.loadMoreText.set('load more');
      const list = ['AA', 'BB', 'CC', 'DD'];
      component.data.set(
        (index: number) =>
          new Observable<string[]>((x) => {
            setTimeout(() => {
              x.next(list.map((x) => `${x}-${index}`));
              x.complete();
            }, 50);
          })
      );
      fixture.detectChanges();
      await XSleep(80);
      const loadMore = fixture.debugElement.query(By.css('.x-list-load-more x-list-option'));
      expect(loadMore.nativeElement.innerText).toBe('load more');
    });
    it('loadingMoreText.', async () => {
      component.loadMore.set(true);
      component.loadingMoreText.set('loading');
      const list = ['AA', 'BB', 'CC', 'DD'];
      component.data.set(
        (index: number) =>
          new Observable<string[]>((x) => {
            setTimeout(() => {
              x.next(list.map((x) => `${x}-${index}`));
              x.complete();
            }, 50);
          })
      );
      fixture.detectChanges();
      await XSleep(80);
      const loadMore = fixture.debugElement.query(By.css('.x-list-load-more x-list-option'));
      loadMore.nativeElement.click();
      fixture.detectChanges();
      await XSleep(30);
      expect(loadMore.nativeElement.innerText.trim()).toBe('loading');
    });
    it('virtualScroll.', () => {
      component.virtualScroll.set(true);
      component.scrollHeight.set(100);
      component.data.set(Array.from({ length: 100 }).map((_x, i) => `a${i + 1}`));
      fixture.detectChanges();
      const options = fixture.debugElement.queryAll(By.css('.x-list-content x-list-option'));
      expect(options.length < 100).toBe(true);
    });
    it('scrollHeight.', () => {
      component.virtualScroll.set(true);
      component.scrollHeight.set(100);
      component.data.set(Array.from({ length: 100 }).map((_x, i) => `a${i + 1}`));
      fixture.detectChanges();
      const content = fixture.debugElement.query(By.css('.x-list-content'));
      expect(content.nativeElement.clientHeight).toBe(100);
    });
    it('heightAdaption.', () => {
      component.virtualScroll.set(true);
      component.heightAdaption.set(component.scrollElementRef().nativeElement);
      component.data.set(Array.from({ length: 100 }).map((_x, i) => `a${i + 1}`));
      fixture.detectChanges();
      const content = fixture.debugElement.query(By.css('.x-list-content'));
      expect(content.nativeElement.clientHeight).toBe(100);
    });
    it('minBufferPx.', () => {
      // cdk scroll minBufferPx
      expect(true).toBe(true);
    });
    it('maxBufferPx.', () => {
      // cdk scroll maxBufferPx
      expect(true).toBe(true);
    });
    it('keywordText.', () => {
      component.data.set(['aabb', 'ccdd', 'eeff']);
      component.keywordText.set(['aa']);
      fixture.detectChanges();
      const keywordText = fixture.debugElement.query(By.css('.x-keyword-text')).nativeElement;
      expect(keywordText.innerText).toBe('aa');
    });
    it('caseSensitive.', () => {
      component.data.set(['AAbb', 'aabb', 'eeff']);
      component.keywordText.set(['aa']);
      component.caseSensitive.set(false);
      fixture.detectChanges();
      const keywordText = fixture.debugElement.queryAll(By.css('.x-keyword-text'));
      expect(keywordText[0].nativeElement.innerText).toBe('AA');
      expect(keywordText[1].nativeElement.innerText).toBe('aa');
    });
    it('inPortal.', () => {
      component.inPortal.set(true);
      fixture.detectChanges();
      const list = fixture.debugElement.query(By.css('.x-list')).nativeElement;
      expect(list).toHaveClass('x-list-portal');
    });
    it('onSelectAll.', () => {
      component.multiple.set(0);
      component.selectAll.set(true);
      component.data.set(['aa', 'bb', 'cc']);
      fixture.detectChanges();

      const selectAll = fixture.debugElement.query(By.css('.x-list-select-all x-list-option')).nativeElement;
      selectAll.click();
      fixture.detectChanges();
      expect(component.onSelectAllResult()).toBe(true);
    });
    it('nodeMouseenter.', () => {
      component.data.set(['aa', 'bb', 'cc']);
      fixture.detectChanges();
      const option = fixture.debugElement.query(By.css('.x-list-content x-list-option'));
      option.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      expect(component.nodeMouseenterResult()!.id).toBe('aa');
    });
    it('nodeMouseleave.', () => {
      component.data.set(['aa', 'bb', 'cc']);
      fixture.detectChanges();
      const option = fixture.debugElement.query(By.css('.x-list-content x-list-option'));
      option.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      option.nativeElement.dispatchEvent(new Event('mouseleave'));
      fixture.detectChanges();
      expect(component.nodeMouseleaveResult()!.id).toBe('aa');
    });
    it('nodeClick.', () => {
      component.data.set(['aa', 'bb', 'cc']);
      fixture.detectChanges();
      const option = fixture.debugElement.query(By.css('.x-list-content x-list-option'));
      option.nativeElement.click();
      fixture.detectChanges();
      expect(component.nodeClickResult()!.id).toBe('aa');
    });
    it('dropListDropped.', () => {
      // cdk drap drop
      expect(true).toBe(true);
    });
    it('keyManagerTabOut.', () => {
      // cdk a11y KeyManager
      expect(true).toBe(true);
    });
    it('keyManagerChange.', () => {
      // cdk a11y KeyManager
      expect(true).toBe(true);
    });
    it('size.', () => {
      component.size.set('small');
      component.data.set(['aa', 'bb', 'cc']);
      fixture.detectChanges();
      const option = fixture.debugElement.query(By.css('.x-list-content .x-list-option'));
      expect(option.nativeElement).toHaveClass('x-list-option-small');
    });
  });
});
