import { XIconModule } from '@ng-nest/ui/icon';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XBadgeComponent } from './badge.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XFenceModule } from '@ng-nest/ui/fence';
import { XBadgeModule } from './badge.module';
import { FormsModule } from '@angular/forms';
import { XBadgePrefix } from './badge.type';
import { XButtonModule } from '@ng-nest/ui/button';

describe(XBadgePrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, XBadgeModule, XButtonModule, XFenceModule, XIconModule],
      declarations: [TestXBadgeComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXBadgeComponent>;
    let badge: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXBadgeComponent);
      fixture.detectChanges();
      badge = fixture.debugElement.query(By.directive(XBadgeComponent));
    });
    it('should create.', () => {
      expect(badge).toBeDefined();
    });
  });
});

@Component({
  template: `
    <div class="row">
      <x-badge value="12">
        <x-button>评论</x-button>
      </x-badge>
      <x-badge value="3">
        <x-button>回复</x-button>
      </x-badge>
    </div>
    <div class="row">
      <x-badge value="12" type="primary">
        <x-button>评论</x-button>
      </x-badge>
      <x-badge value="12" type="success">
        <x-button>评论</x-button>
      </x-badge>
      <x-badge value="12" type="info">
        <x-button>评论</x-button>
      </x-badge>
      <x-badge value="12" type="warning">
        <x-button>评论</x-button>
      </x-badge>
      <x-badge value="12" type="danger">
        <x-button>评论</x-button>
      </x-badge>
      <x-badge value="12" type="text">
        <x-button>评论</x-button>
      </x-badge>
    </div>
    <div class="row">
      <x-badge value="200" max="99">
        <x-button>评论</x-button>
      </x-badge>
      <x-badge value="300" max="200">
        <x-button>回复</x-button>
      </x-badge>
    </div>
    <div class="row">
      <x-badge value="new">
        <x-button>评论</x-button>
      </x-badge>
      <x-badge value="hot">
        <x-button>回复</x-button>
      </x-badge>
    </div>
    <div class="row">
      <x-badge dot>
        <x-button type="primary">评论</x-button>
      </x-badge>
      <x-badge dot>
        <x-icon type="fto-user"></x-icon>
      </x-badge>
    </div>
  `,
  styles: [
    `
      .row {
        display: flex;
        align-items: center;
      }
      .row:not(:first-child) {
        margin-top: 1rem;
      }
      .row x-badge:not(:first-child) {
        margin-left: 2rem;
      }
    `
  ]
})
class TestXBadgeComponent {}
