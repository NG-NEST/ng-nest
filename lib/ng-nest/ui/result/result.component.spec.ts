import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XResultComponent, XResultPrefix, XResultStatus } from '@ng-nest/ui/result';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { XTemplate } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  imports: [XResultComponent],
  template: ` <x-result> </x-result> `
})
class XTestResultComponent {}

@Component({
  imports: [XResultComponent],
  template: ` <x-result [status]="status()" [title]="title()" [icon]="icon()" [subTitle]="subTitle()"> </x-result> `
})
class XTestResultPropertyComponent {
  status = signal<XResultStatus>('info');
  title = signal<XTemplate | null>(null);
  icon = signal<XTemplate | null>(null);
  subTitle = signal<XTemplate | null>(null);
}

xdescribe(XResultPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestResultComponent, XTestResultPropertyComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  xdescribe('default.', () => {
    let fixture: ComponentFixture<XTestResultComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestResultComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XResultComponent));
      expect(com).toBeDefined();
    });
  });
  xdescribe(`input.`, async () => {
    let fixture: ComponentFixture<XTestResultPropertyComponent>;
    let component: XTestResultPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestResultPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('status.', () => {
      component.status.set('success');
      fixture.detectChanges();
      const result = fixture.debugElement.query(By.css('.x-result'));
      expect(result.nativeElement).toHaveClass('x-result-success');
    });
    it('title.', () => {
      component.title.set('title');
      fixture.detectChanges();
      const title = fixture.debugElement.query(By.css('.x-result-title')).nativeElement;
      expect(title.innerText).toBe('title');
    });
    it('icon.', () => {
      component.icon.set('fto-user');
      fixture.detectChanges();
      const icon = fixture.debugElement.query(By.css('x-icon')).nativeElement;
      expect(icon).toHaveClass('fto-user');
    });
    it('subTitle.', () => {
      component.subTitle.set('sub title');
      fixture.detectChanges();
      const subTitle = fixture.debugElement.query(By.css('.x-result-subTitle')).nativeElement;
      expect(subTitle.innerText).toBe('sub title');
    });
  });
});
