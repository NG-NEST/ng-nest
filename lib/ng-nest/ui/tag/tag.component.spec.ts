import { XIconModule } from '@ng-nest/ui/icon';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XTagComponent } from './tag.component';
import { Component, DebugElement, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XFenceModule } from '@ng-nest/ui/fence';
import { XTagModule } from './tag.module';
import { FormsModule } from '@angular/forms';
import { XTagPrefix } from './tag.type';
import { XButtonModule } from '@ng-nest/ui/button';
import { XContainerModule } from '@ng-nest/ui/container';

describe(XTagPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, XTagModule, XButtonModule, XContainerModule, XFenceModule, XIconModule],
      declarations: [TestXTagComponent]
    }).compileComponents();
  }));
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
      <x-tag size="large">标签</x-tag>
      <x-tag size="medium">标签</x-tag>
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
  `,
  styles: [
    `
      .row:not(:first-child) {
        margin-top: 1rem;
      }
      .row x-tag:not(:first-child) {
        margin-left: 0.5rem;
      }
    `
  ]
})
class TestXTagComponent {
  tags = ['标签一', '标签二', '标签三', '标签四', '标签五'];
  constructor(private cdr: ChangeDetectorRef) {}
  close(tag) {
    this.tags.splice(this.tags.indexOf(tag), 1);
    this.cdr.detectChanges();
  }
}
