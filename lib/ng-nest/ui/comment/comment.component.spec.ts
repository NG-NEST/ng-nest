import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XCommentComponent, XCommentNode, XCommentPrefix } from '@ng-nest/ui/comment';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XDataArray } from '@ng-nest/ui/core';

@Component({
  imports: [XCommentComponent],
  template: ` <x-comment></x-comment> `
})
class XTestCommentComponent {}

@Component({
  imports: [XCommentComponent],
  template: `
    <x-comment
      [data]="data()"
      [contentMax]="contentMax()"
      (likeClick)="likeClick($event)"
      (commentClick)="commentClick($event)"
      (replyClick)="replyClick($event)"
    ></x-comment>
  `
})
class XTestCommentPropertyComponent {
  data = signal<XDataArray<XCommentNode>>([]);
  contentMax = signal(512);

  likeClickResult = signal<XCommentNode | null>(null);
  likeClick(node: XCommentNode) {
    this.likeClickResult.set(node);
  }

  commentClickResult = signal<XCommentNode | null>(null);
  commentClick(node: XCommentNode) {
    this.commentClickResult.set(node);
  }

  replyClickResult = signal<XCommentNode | null>(null);
  replyClick(node: XCommentNode) {
    this.replyClickResult.set(node);
  }

  sureClickResult = signal<XCommentNode | null>(null);
  sureClick(node: XCommentNode) {
    this.sureClickResult.set(node);
  }

  moreClickResult = signal<XCommentNode | null>(null);
  moreClick(node: XCommentNode) {
    this.moreClickResult.set(node);
  }
}

xdescribe(XCommentPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestCommentComponent, XTestCommentPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  xdescribe('default.', () => {
    let fixture: ComponentFixture<XTestCommentComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestCommentComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XCommentComponent));
      expect(com).toBeDefined();
    });
  });
  xdescribe(`input.`, async () => {
    let fixture: ComponentFixture<XTestCommentPropertyComponent>;
    // let component: XTestCommentPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestCommentPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('data.', () => {
      // TODO
    });
  });
});
