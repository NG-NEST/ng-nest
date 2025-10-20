import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XCommentComponent, XCommentNode, XCommentPrefix } from '@ng-nest/ui/comment';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { XAddHours, XAddMinutes, XDataArray, XSleep } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'x-test-comment',
  imports: [XCommentComponent],
  template: ` <x-comment></x-comment> `
})
class XTestCommentComponent {}

@Component({
  selector: 'x-test-comment-property',
  imports: [XCommentComponent],
  template: `
    <x-comment
      [data]="data()"
      [contentMax]="contentMax()"
      (likeClick)="likeClick($event)"
      (commentClick)="commentClick($event)"
      (replyClick)="replyClick($event)"
      (sureClick)="sureClick($event)"
      (moreClick)="moreClick($event)"
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

describe(XCommentPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestCommentComponent, XTestCommentPropertyComponent],
      providers: [provideAnimations, provideHttpClient(withFetch()), provideZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  describe('default.', () => {
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
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestCommentPropertyComponent>;
    let component: XTestCommentPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestCommentPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    const now = new Date();
    const src = 'https://ngnest.com/img/logo/logo-144x144.png';
    const content = ``;
    const data = [
      {
        id: '1',
        src: src,
        author: '      ',
        datetime: XAddMinutes(now, -40),
        content: content,
        count: 23,
        likes: 88,
        children: [
          {
            id: '1-1',
            pid: '1',
            src: src,
            author: '',
            datetime: XAddMinutes(now, -30),
            content: content,
            likes: 2
          },
          {
            id: '1-2',
            pid: '1',
            src: src,
            author: '',
            datetime: XAddMinutes(now, -35),
            content: content,
            likes: 0
          },
          {
            id: '1-3',
            pid: '1',
            src: src,
            author: '',
            datetime: XAddMinutes(now, -38),
            content: content,
            likes: 0
          }
        ]
      },
      {
        id: '2',
        src: src,
        author: '      ',
        datetime: XAddMinutes(now, -50),
        content: content,
        count: 2,
        likes: 88,
        children: [
          {
            id: '2-1',
            pid: '2',
            src: src,
            author: '',
            datetime: XAddMinutes(now, -30),
            content: content,
            likes: 2
          },
          {
            id: '2-2',
            pid: '2',
            src: src,
            author: '',
            datetime: XAddMinutes(now, -35),
            content: content,
            likes: 0
          }
        ]
      },
      {
        id: '3',
        src: src,
        author: '  ܿ',
        datetime: XAddHours(now, -5),
        content: content,
        count: 0,
        likes: 10,
        children: []
      }
    ];
    it('data.', () => {
      component.data.set(data);
      fixture.detectChanges();

      const items = fixture.debugElement.queryAll(By.css('.x-comment-item'));
      expect(items.length).toEqual(data.length);
    });

    it('likeClick.', () => {
      component.data.set(data);
      fixture.detectChanges();

      const like = fixture.debugElement.query(By.css('.x-comment-like'));
      like.nativeElement.click();

      fixture.detectChanges();
      expect(component.likeClickResult()).not.toBeNull();
      expect(component.likeClickResult()!.id).toBe('1');
    });

    it('commentClick.', () => {
      component.data.set(data);
      fixture.detectChanges();

      const comment = fixture.debugElement.query(By.css('.x-comment-button'));
      comment.nativeElement.click();

      fixture.detectChanges();
      expect(component.commentClickResult()).not.toBeNull();
      expect(component.commentClickResult()!.id).toBe('1');
    });

    it('replyClick.', () => {
      component.data.set(data);
      fixture.detectChanges();

      const reply = fixture.debugElement.query(By.css('.x-comment-reply-button'));
      reply.nativeElement.click();

      fixture.detectChanges();
      expect(component.replyClickResult()).not.toBeNull();
      expect(component.replyClickResult()!.id).toBe('1-1');
    });

    it('sureClick.', async () => {
      component.data.set(data);
      fixture.detectChanges();

      const comment = fixture.debugElement.query(By.css('.x-comment-button'));
      comment.nativeElement.click();
      await XSleep(200);
      fixture.detectChanges();
      const sure = fixture.debugElement.query(By.css('.x-comment-sure-button'));
      sure.nativeElement.click();
      fixture.detectChanges();
      expect(component.sureClickResult()).not.toBeNull();
      expect(component.sureClickResult()!.id).toBe('1-1');
    });

    it('moreClick.', () => {
      component.data.set(data);
      fixture.detectChanges();

      const more = fixture.debugElement.query(By.css('.x-comment-more-button'));
      more.nativeElement.click();

      fixture.detectChanges();
      expect(component.moreClickResult()).not.toBeNull();
      expect(component.moreClickResult()!.id).toBe('1');
    });
  });
});
