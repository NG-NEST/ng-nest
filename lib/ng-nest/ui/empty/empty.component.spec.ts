import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XEmptyComponent, XEmptyPrefix } from '@ng-nest/ui/empty';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XTemplate } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  standalone: true,
  imports: [XEmptyComponent],
  template: ` <x-empty> </x-empty> `
})
class XTestEmptyComponent {}

@Component({
  standalone: true,
  imports: [XEmptyComponent],
  template: `
    <x-empty [img]="img()" [content]="content()"> </x-empty>
    <ng-template #imgTpl>img tpl</ng-template>
    <ng-template #contentTpl>content tpl</ng-template>
  `
})
class XTestEmptyPropertyComponent {
  img = signal<XTemplate>('');
  imgTpl = viewChild.required<TemplateRef<void>>('imgTpl');
  content = signal<XTemplate>('');
  contentTpl = viewChild.required<TemplateRef<void>>('contentTpl');
}

describe(XEmptyPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestEmptyComponent, XTestEmptyPropertyComponent],
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
    let fixture: ComponentFixture<XTestEmptyComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestEmptyComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XEmptyComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestEmptyPropertyComponent>;
    let component: XTestEmptyPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestEmptyPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('img.', () => {
      component.img.set('https://ngnest.com/img/logo/logo-144x144.png');
      fixture.detectChanges();
      const img = fixture.debugElement.query(By.css('.x-empty-img'));
      expect(img).toBeTruthy();
      component.img.set(component.imgTpl());
      fixture.detectChanges();
      const empty = fixture.debugElement.query(By.css('.x-empty'));
      expect(empty.nativeElement.innerText).toBe('img tpl\n暂无数据');
    });
    it('content.', () => {
      component.content.set('content');
      fixture.detectChanges();
      const empty = fixture.debugElement.query(By.css('.x-empty'));
      expect(empty.nativeElement.innerText).toBe('content');
      component.content.set(component.contentTpl());
      fixture.detectChanges();
      expect(empty.nativeElement.innerText).toBe('content tpl');
    });
  });
});
