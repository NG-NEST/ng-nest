import { XIconModule } from '@ng-nest/ui/icon';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XSkeletonComponent } from './skeleton.component';
import { Component, DebugElement, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { XSkeletonModule } from '@ng-nest/ui/skeleton';
import { FormsModule } from '@angular/forms';
import { XSkeletonPrefix, XSkeletonRow } from './skeleton.property';
import { XButtonModule } from '@ng-nest/ui/button';
import { XContainerModule } from '@ng-nest/ui/container';
import { XSwitchModule } from '@ng-nest/ui/switch';
import { XAvatarModule } from '@ng-nest/ui/avatar';
import { XLinkModule } from '@ng-nest/ui/link';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XThemeModule } from '@ng-nest/ui/theme';

describe(XSkeletonPrefix, () => {
  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        XThemeModule,
        FormsModule,
        XSkeletonModule,
        XSwitchModule,
        XButtonModule,
        XContainerModule,
        XLayoutModule,
        XAvatarModule,
        XIconModule,
        XLinkModule
      ],
      declarations: [TestXSkeletonComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXSkeletonComponent>;
    let skeleton: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXSkeletonComponent);
      fixture.detectChanges();
      skeleton = fixture.debugElement.query(By.directive(XSkeletonComponent));
    });
    it('should create.', () => {
      expect(skeleton).toBeDefined();
    });
  });
});

@Component({
  template: `
    <div class="test-skeletion">
      <x-theme showDark></x-theme>
      <div class="row">
        <x-skeleton></x-skeleton>
      </div>
      <div class="row">
        <x-skeleton active></x-skeleton>
      </div>
      <div class="row">
        <x-switch [(ngModel)]="loading" (ngModelChange)="change()"></x-switch>
        <ul class="news">
          <li>
            <x-skeleton [loading]="loading" active>
              <h3>生于忧患,死于安乐</h3>
              <p>
                舜发于畎亩之中，傅说举于版筑之间，胶鬲举于鱼盐之中，管夷吾举于士，孙叔敖举于海，百里奚举于市。故天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为，所以动心忍性，曾益其所不能。
              </p>
            </x-skeleton>
          </li>
        </ul>
      </div>
      <div class="row">
        <x-skeleton [data]="dataCustom"></x-skeleton>
      </div>
      <div class="row">
        <x-switch [(ngModel)]="loadingList" (ngModelChange)="change()"></x-switch>
        <ul class="news">
          <li *ngFor="let item of list; let i = index">
            <x-skeleton [loading]="loadingList" [data]="dataCustom" active>
              <x-row justify="start" space="1">
                <x-col inherit class="content">
                  <x-avatar src="https://ngnest.com/assets/img/logo/logo-144x144.png" size="medium"></x-avatar>
                </x-col>
                <x-col class="content">
                  <x-row>
                    <x-col>
                      <h3>生于忧患，死于安乐 {{ i + 1 }}</h3>
                      <p>
                        舜发于畎亩之中，傅说举于版筑之间，胶鬲举于鱼盐之中，管夷吾举于士，孙叔敖举于海，百里奚举于市。故天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为，所以动心忍性，曾益其所不能。
                      </p>
                    </x-col>
                  </x-row>
                  <x-row justify="start" space="1">
                    <x-col inherit>
                      <x-link icon="fto-star">18</x-link>
                    </x-col>
                    <x-col inherit>
                      <x-link icon="fto-thumbs-up">50</x-link>
                    </x-col>
                    <x-col inherit>
                      <x-link icon="fto-info">100</x-link>
                    </x-col>
                    <x-col></x-col>
                    <x-col inherit>
                      <div [ngStyle]="{ 'white-space': 'nowrap' }">2020-03-17 22:22</div>
                    </x-col>
                  </x-row>
                </x-col>
                <x-col inherit class="content">
                  <img src="https://ngnest.com/assets/img/logo/logo-144x144.png" [style.width]="'10rem'" [style.height]="'9rem'" />
                </x-col>
              </x-row>
            </x-skeleton>
          </li>
        </ul>
      </div>
      <div class="row">
        <x-skeleton [data]="dataTable" border active></x-skeleton>
      </div>
    </div>
  `,
  styles: [
    `
      .test-skeletion {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      .row:not(:first-child) {
        margin-top: 2rem;
      }
      .row .news li {
        padding-bottom: 1rem;
      }
      .row .news li:not(:first-child) {
        padding-top: 1rem;
        border-top: 0.0625rem solid var(--x-border-200);
      }
      .row .news h3 {
        margin: 0;
      }
      .row .news p {
        margin: 0.5rem 0;
      }
      .row .news .content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
class TestXSkeletonComponent {
  dataCustom: XSkeletonRow[] = [
    {
      flex: true,
      space: 1,
      cols: [
        { type: 'avatar', width: '3rem', height: '3rem' },
        {
          rows: [
            { cols: [{ type: 'title', width: '10rem' }] },
            { cols: [{}] },
            { cols: [{}] },
            { cols: [{ span: 16 }] },
            {
              space: 1,
              flex: true,
              cols: [{ width: '3rem' }, { width: '3rem' }, { width: '3rem' }, { type: 'transparent' }, { width: '9rem' }]
            }
          ]
        },
        { type: 'img', width: '10rem', height: '9rem' }
      ]
    }
  ];
  dataTable: XSkeletonRow[] = [
    {
      flex: true,
      space: 1,
      cols: [
        { type: 'title', width: '3rem' },
        { type: 'title', span: 4 },
        { type: 'title', span: 6 },
        { type: 'title', span: 4 },
        { type: 'title', span: 10 }
      ]
    },
    {
      flex: true,
      space: 1,
      cols: [{ width: '3rem' }, { span: 4 }, { span: 6 }, { span: 4 }, { span: 10 }]
    },
    {
      flex: true,
      space: 1,
      cols: [{ width: '3rem' }, { span: 4 }, { span: 6 }, { span: 4 }, { span: 10 }]
    },
    {
      flex: true,
      space: 1,
      cols: [{ width: '3rem' }, { span: 4 }, { span: 6 }, { span: 4 }, { span: 10 }]
    },
    {
      flex: true,
      space: 1,
      cols: [{ width: '3rem' }, { span: 4 }, { span: 6 }, { span: 4 }, { span: 10 }]
    }
  ];
  loading = false;
  loadingList = true;
  list = new Array(3).fill({});
  constructor(private cdr: ChangeDetectorRef) {}
  change() {
    this.cdr.detectChanges();
  }
}
