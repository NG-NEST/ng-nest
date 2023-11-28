import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ChangeDetectorRef } from '@angular/core';
import { XI18nPipe, XI18nDirective } from '@ng-nest/ui/i18n';
import { XI18nPrefix } from './i18n.property';
import { XCommentComponent, XCommentNode } from '@ng-nest/ui/comment';
import { XAddMinutes, XAddHours } from '@ng-nest/ui/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XI18nService } from './i18n.service';
import en_US from './languages/en_US';
import zh_CN from './languages/zh_CN';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe(XI18nPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        XI18nPipe,
        XI18nDirective,
        HttpClientTestingModule,
        XButtonComponent,
        XCommentComponent
      ],
      declarations: [TestXI18nComponent]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXI18nComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXI18nComponent);
      fixture.detectChanges();
    });
    it('should create.', () => {
      expect(true).toBe(true);
    });
  });
});

@Component({
  template: `
    <div class="row">
      <x-button (click)="english()">切换为英文</x-button>
      <x-button (click)="chinese()">切换为中文</x-button>
      <x-button>{{ 'comment.comments' | xI18n }}</x-button>
      <p x-i18n="comment.comments"></p>

      <x-comment [data]="data"></x-comment>
    </div>
  `
})
class TestXI18nComponent {
  now = new Date();
  src = 'https://ngnest.com/assets/img/logo/logo-144x144.png';
  content = `天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。
    天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。
    天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。
    天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。
    天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。
    天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。
    天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。
    天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。`;
  data: XCommentNode[] = [
    {
      id: '1',
      src: this.src,
      author: '张琪峰',
      datetime: XAddMinutes(this.now, -40),
      content: this.content,
      count: 23,
      likes: 88,
      children: [
        {
          id: '1-1',
          pid: '1',
          src: this.src,
          author: '刘三',
          datetime: XAddMinutes(this.now, -30),
          content: this.content,
          likes: 2
        },
        {
          id: '1-2',
          pid: '1',
          src: this.src,
          author: '刘四',
          datetime: XAddMinutes(this.now, -35),
          content: this.content,
          likes: 0
        },
        {
          id: '1-2',
          pid: '1',
          src: this.src,
          author: '刘五',
          datetime: XAddMinutes(this.now, -38),
          content: this.content,
          likes: 0
        }
      ]
    },
    {
      id: '2',
      src: this.src,
      author: '李牧云',
      datetime: XAddMinutes(this.now, -50),
      content: this.content,
      count: 2,
      likes: 88,
      children: [
        {
          id: '1-1',
          pid: '1',
          src: this.src,
          author: '刘三',
          datetime: XAddMinutes(this.now, -30),
          content: this.content,
          likes: 2
        },
        {
          id: '1-2',
          pid: '1',
          src: this.src,
          author: '刘四',
          datetime: XAddMinutes(this.now, -35),
          content: this.content,
          likes: 0
        }
      ]
    },
    {
      id: '3',
      src: this.src,
      author: '刘芸',
      datetime: XAddHours(this.now, -5),
      content: this.content,
      count: 0,
      likes: 10,
      children: []
    }
  ];

  constructor(private i18nService: XI18nService, private cdr: ChangeDetectorRef) {}

  index = 1;

  english() {
    this.i18nService.setLocale(
      {
        ...en_US
      },
      true
    );
    this.cdr.detectChanges();
  }

  chinese() {
    this.i18nService.setLocale(zh_CN);
    this.cdr.detectChanges();
  }
}
