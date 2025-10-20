import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { XCollapseComponent } from './collapse.component';
import { XCollapsePanelComponent } from './collapse-panel.component';
import { XCollapseIconPosition, XCollapsePrefix } from './collapse.property';
import { provideAnimations } from '@angular/platform-browser/animations';
import { XIconComponent } from '@ng-nest/ui/icon';

@Component({
  selector: 'x-test-collapse',
  imports: [XCollapseComponent, XCollapsePanelComponent],
  template: `
    <x-collapse>
      <x-collapse-panel label="one">one panel</x-collapse-panel>
      <x-collapse-panel label="two">two panel</x-collapse-panel>
      <x-collapse-panel label="three">three panel</x-collapse-panel>
    </x-collapse>
  `
})
class XTestCollapseComponent {}

@Component({
  selector: 'x-test-collapse-property',
  imports: [XCollapseComponent, XCollapsePanelComponent, XIconComponent],
  template: `
    <x-collapse
      [accordion]="accordion()"
      [icon]="iconTpl"
      [showIcon]="showIcon()"
      [iconPosition]="iconPosition()"
      [ghost]="ghost()"
      [bordered]="bordered()"
    >
      <x-collapse-panel label="one">one panel</x-collapse-panel>
      <x-collapse-panel label="two">two panel</x-collapse-panel>
      <x-collapse-panel label="three">three panel</x-collapse-panel>
    </x-collapse>
    <ng-template #iconTpl>
      <x-icon type="ado-caret-right"></x-icon>
    </ng-template>
  `
})
class XTestCollapsePropertyComponent {
  accordion = signal(false);
  showIcon = signal(true);
  iconPosition = signal<XCollapseIconPosition>('right');
  ghost = signal(false);
  bordered = signal(false);
}

@Component({
  selector: 'x-test-collapse-panel-active',
  imports: [XCollapseComponent, XCollapsePanelComponent],
  template: `
    <x-collapse>
      <x-collapse-panel label="one">one panel</x-collapse-panel>
      <x-collapse-panel label="two" active>two panel</x-collapse-panel>
      <x-collapse-panel label="three">three panel</x-collapse-panel>
    </x-collapse>
  `
})
class XTestCollapsePanelActive {}

xdescribe(XCollapsePrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestCollapseComponent, XTestCollapsePropertyComponent, XTestCollapsePanelActive],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  xdescribe('default.', () => {
    let fixture: ComponentFixture<XTestCollapseComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestCollapseComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XCollapseComponent));
      expect(com).toBeDefined();

      const panels = fixture.debugElement.queryAll(By.directive(XCollapsePanelComponent));
      expect(panels).toBeDefined();
    });
    it('property.', () => {
      const color = fixture.debugElement.query(By.css('.x-collapse'));
      expect(color).toBeDefined();

      const labels = fixture.debugElement.queryAll(By.css('.x-collapse-panel-header-title'));
      expect(labels[0].nativeElement.textContent).toBe('one');
      expect(labels[1].nativeElement.textContent).toBe('two');
      expect(labels[2].nativeElement.textContent).toBe('three');

      const bodies = fixture.debugElement.queryAll(By.css('.x-collapse-panel-body'));
      expect(bodies.length).toBe(0);

      const headers = fixture.debugElement.queryAll(By.css('.x-collapse-panel-header'));
      headers[0].nativeElement.click();
      headers[1].nativeElement.click();
      headers[2].nativeElement.click();
      fixture.detectChanges();
      const com = fixture.debugElement.query(By.css('x-collapse'));
      const active = com.componentInstance.active();
      expect(active).toContain(0);
      expect(active).toContain(1);
      expect(active).toContain(2);
    });
  });
  xdescribe(`input.`, async () => {
    let fixture: ComponentFixture<XTestCollapsePropertyComponent>;
    let component: XTestCollapsePropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestCollapsePropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('accordion.', () => {
      component.accordion.set(true);
      fixture.detectChanges();
      const headers = fixture.debugElement.queryAll(By.css('.x-collapse-panel-header'));
      headers[0].nativeElement.click();
      headers[1].nativeElement.click();
      headers[2].nativeElement.click();
      fixture.detectChanges();
      const com = fixture.debugElement.query(By.css('x-collapse'));
      const active = com.componentInstance.active();
      expect(active).not.toContain(0);
      expect(active).not.toContain(1);
      expect(active).toContain(2);
    });
    it('icon.', () => {
      const icon = fixture.debugElement.query(By.css('.ado-caret-right'));
      expect(icon).not.toBeNull();
    });
    it('showIcon.', () => {
      const icon = fixture.debugElement.query(By.css('.ado-caret-right'));
      expect(icon).not.toBeNull();

      component.showIcon.set(false);
      fixture.detectChanges();
      const iconChange = fixture.debugElement.query(By.css('.ado-caret-right'));
      expect(iconChange).toBeNull();
    });
    it('iconPosition.', () => {
      const header = fixture.debugElement.query(By.css('.x-collapse-panel-header'));
      expect(header.nativeElement).toHaveClass('x-collapse-panel-icon-right');

      component.iconPosition.set('left');
      fixture.detectChanges();
      expect(header.nativeElement).toHaveClass('x-collapse-panel-icon-left');
    });
    it('ghost.', () => {
      const collapse = fixture.debugElement.query(By.css('.x-collapse'));
      expect(collapse.nativeElement).not.toHaveClass('x-collapse-ghost');

      component.ghost.set(true);
      fixture.detectChanges();
      expect(collapse.nativeElement).toHaveClass('x-collapse-ghost');
    });
    it('bordered.', () => {
      const collapse = fixture.debugElement.query(By.css('.x-collapse'));
      expect(collapse.nativeElement).not.toHaveClass('x-collapse-bordered');

      component.bordered.set(true);
      fixture.detectChanges();
      expect(collapse.nativeElement).toHaveClass('x-collapse-bordered');
    });
  });
  xdescribe('panel active.', () => {
    let fixture: ComponentFixture<XTestCollapsePanelActive>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestCollapsePanelActive);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XCollapseComponent));
      expect(com).toBeDefined();

      const panels = fixture.debugElement.queryAll(By.directive(XCollapsePanelComponent));
      expect(panels).toBeDefined();
    });
  });
});
