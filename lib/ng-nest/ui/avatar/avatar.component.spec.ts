import { XIconModule } from '@ng-nest/ui/icon';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XAvatarComponent } from './avatar.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { XAvatarModule } from '@ng-nest/ui/avatar';
import { FormsModule } from '@angular/forms';
import { XAvatarPrefix } from './avatar.property';
import { XThemeModule } from '@ng-nest/ui/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe(XAvatarPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, FormsModule, XAvatarModule, XLayoutModule, XIconModule, XThemeModule],
      declarations: [TestXAvatarComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXAvatarComponent>;
    let avatar: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXAvatarComponent);
      fixture.detectChanges();
      avatar = fixture.debugElement.query(By.directive(XAvatarComponent));
    });
    it('should create.', () => {
      expect(avatar).toBeDefined();
    });
  });
});

@Component({
  template: `
    <x-theme showDark></x-theme>
    <div class="row">
      <x-avatar size="big" [src]="src"></x-avatar>
      <x-avatar size="large" [src]="src"></x-avatar>
      <x-avatar [src]="src"></x-avatar>
      <x-avatar size="small" [src]="src"></x-avatar>
      <x-avatar size="mini" [src]="src"></x-avatar>
    </div>
    <div class="row">
      <x-avatar size="big" shape="square" [src]="src"></x-avatar>
      <x-avatar size="large" shape="square" [src]="src"></x-avatar>
      <x-avatar shape="square" [src]="src"></x-avatar>
      <x-avatar size="small" shape="square" [src]="src"></x-avatar>
      <x-avatar size="mini" shape="square" [src]="src"></x-avatar>
    </div>
    <div class="row">
      <x-avatar size="big" [icon]="icon"></x-avatar>
      <x-avatar size="large" [icon]="icon"></x-avatar>
      <x-avatar [icon]="icon"></x-avatar>
      <x-avatar size="small" [icon]="icon"></x-avatar>
      <x-avatar size="mini" [icon]="icon"></x-avatar>
    </div>
    <div class="row">
      <x-avatar size="big" [label]="label"></x-avatar>
      <x-avatar size="large" [label]="label"></x-avatar>
      <x-avatar [label]="label"></x-avatar>
      <x-avatar size="small" [label]="label"></x-avatar>
      <x-avatar size="mini" [label]="label"></x-avatar>
    </div>
    <div class="row">
      <x-avatar src="https://empty"></x-avatar>
    </div>
    <div class="row">
      <x-avatar size="big" [src]="srcFit" fit="fill"></x-avatar>
      <x-avatar size="big" [src]="srcFit" fit="contain"></x-avatar>
      <x-avatar size="big" [src]="srcFit" fit="cover"></x-avatar>
      <x-avatar size="big" [src]="srcFit" fit="none"></x-avatar>
      <x-avatar size="big" [src]="srcFit" fit="scale-down"></x-avatar>
    </div>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      .row {
        display: flex;
        align-items: center;
      }
      .row:not(:first-child) {
        margin-top: 1rem;
      }
      .row x-avatar:not(:first-child) {
        margin-left: 1rem;
      }
    `
  ]
})
class TestXAvatarComponent {
  src = 'https://ngnest.com/assets/img/logo/logo-144x144.png';
  srcFit = 'https://ngnest.com/assets/img/logo/logo-144x144.png';
  icon = 'fto-user';
  label = '王';
}
