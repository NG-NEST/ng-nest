import { XIconComponent } from '@ng-nest/ui/icon';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XRowComponent, XColComponent } from '@ng-nest/ui/layout';
import { XTagComponent } from '@ng-nest/ui/tag';
import { FormsModule } from '@angular/forms';
import { XTagPrefix } from './tag.property';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XContainerComponent } from '@ng-nest/ui/container';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XThemeComponent } from '@ng-nest/ui/theme';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe(XTagPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        XThemeComponent,
        FormsModule,
        XTagComponent,
        XButtonComponent,
        XContainerComponent,
        XRowComponent,
        XColComponent,
        XIconComponent
      ],
      declarations: [TestXTagComponent]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXTagComponent>;
    let tag: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTagComponent);
      fixture.detectChanges();
      tag = fixture.debugElement.query(By.directive(XTagComponent));
    });
    it('should create.', () => {
      expect(tag).toBeDefined();
    });
  });
});

@Component({
  template: `
    <x-theme showDark></x-theme>
    <div class="row">
      <x-tag>标签</x-tag>
      <x-tag type="primary">标签</x-tag>
      <x-tag type="success">标签</x-tag>
      <x-tag type="warning">标签</x-tag>
      <x-tag type="danger">标签</x-tag>
      <x-tag type="info">标签</x-tag>
    </div>
    <div class="row">
      <x-tag dark>标签</x-tag>
      <x-tag type="primary" dark>标签</x-tag>
      <x-tag type="success" dark>标签</x-tag>
      <x-tag type="warning" dark>标签</x-tag>
      <x-tag type="danger" dark>标签</x-tag>
      <x-tag type="info" dark>标签</x-tag>
    </div>

    <div class="row">
      <x-tag size="big">标签</x-tag>
      <x-tag size="large">标签</x-tag>
      <x-tag>标签</x-tag>
      <x-tag size="small">标签</x-tag>
      <x-tag size="mini">标签</x-tag>
    </div>
    <div class="row">
      <x-tag closable>标签</x-tag>
      <x-tag type="primary" closable>标签</x-tag>
      <x-tag type="success" closable>标签</x-tag>
      <x-tag type="warning" closable>标签</x-tag>
      <x-tag type="danger" closable>标签</x-tag>
      <x-tag type="info" closable>标签</x-tag>
    </div>
    <div class="row">
      <x-tag dark closable>标签</x-tag>
      <x-tag type="primary" dark closable>标签</x-tag>
      <x-tag type="success" dark closable>标签</x-tag>
      <x-tag type="warning" dark closable>标签</x-tag>
      <x-tag type="danger" dark closable>标签</x-tag>
      <x-tag type="info" dark closable>标签</x-tag>
    </div>
    <div class="row">
      <x-tag size="large" closable>标签</x-tag>
      <x-tag size="medium" closable>标签</x-tag>
      <x-tag closable>标签</x-tag>
      <x-tag size="small" closable>标签</x-tag>
      <x-tag size="mini" closable>标签</x-tag>
    </div>
    <div class="row">
      <x-tag *ngFor="let tag of tags" type="primary" closable (close)="close(tag)">{{ tag }}</x-tag>
    </div>

    <div class="row">
      <x-tag disabled>标签</x-tag>
      <x-tag type="primary" disabled>标签</x-tag>
      <x-tag type="success" disabled>标签</x-tag>
      <x-tag type="warning" disabled>标签</x-tag>
      <x-tag type="danger" disabled>标签</x-tag>
      <x-tag type="info" disabled>标签</x-tag>
    </div>
    <div class="row">
      <x-tag dark disabled>标签</x-tag>
      <x-tag type="primary" dark disabled>标签</x-tag>
      <x-tag type="success" dark disabled>标签</x-tag>
      <x-tag type="warning" dark disabled>标签</x-tag>
      <x-tag type="danger" dark disabled>标签</x-tag>
      <x-tag type="info" dark disabled>标签</x-tag>
    </div>

    <div class="row">
      <x-tag closable disabled>标签</x-tag>
      <x-tag type="primary" closable disabled>标签</x-tag>
      <x-tag type="success" closable disabled>标签</x-tag>
      <x-tag type="warning" closable disabled>标签</x-tag>
      <x-tag type="danger" closable disabled>标签</x-tag>
      <x-tag type="info" closable disabled>标签</x-tag>
    </div>
    <div class="row">
      <x-tag dark closable disabled>标签</x-tag>
      <x-tag type="primary" dark closable disabled>标签</x-tag>
      <x-tag type="success" dark closable disabled>标签</x-tag>
      <x-tag type="warning" dark closable disabled>标签</x-tag>
      <x-tag type="danger" dark closable disabled>标签</x-tag>
      <x-tag type="info" dark closable disabled>标签</x-tag>
    </div>
    <div class="row">
      <x-tag size="large" closable disabled>标签</x-tag>
      <x-tag size="medium" closable disabled>标签</x-tag>
      <x-tag closable disabled>标签</x-tag>
      <x-tag size="small" closable disabled>标签</x-tag>
      <x-tag size="mini" closable disabled>标签</x-tag>
    </div>
    <div class="row">
      <x-tag *ngFor="let tag of tags" type="primary" closable disabled (close)="close(tag)">{{ tag }}</x-tag>
    </div>
    <div class="row">
      <x-tag bordered="false" size="large" closable disabled>标签</x-tag>
      <x-tag bordered="false" size="medium" closable disabled>标签</x-tag>
      <x-tag bordered="false" closable disabled>标签</x-tag>
      <x-tag bordered="false" size="small" closable disabled>标签</x-tag>
      <x-tag bordered="false" size="mini" closable disabled>标签</x-tag>
    </div>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      .row:not(:first-child) {
        margin-top: 1rem;
      }
      .row x-tag:not(:first-child) {
        margin-left: 1rem;
      }
    `
  ]
})
class TestXTagComponent {
  tags = ['标签一', '标签二', '标签三', '标签四', '标签五'];
  constructor(private cdr: ChangeDetectorRef) {}
  close(tag: string) {
    this.tags.splice(this.tags.indexOf(tag), 1);
    this.cdr.detectChanges();
  }
}
