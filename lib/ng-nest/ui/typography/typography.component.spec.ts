import { XDocComponent } from '@ng-nest/ui/doc';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XRowComponent, XColComponent } from '@ng-nest/ui/layout';
import { XTypographyComponent } from '@ng-nest/ui/typography';
import { XTypographyPrefix } from './typography.property';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

xdescribe(XTypographyPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestXTypographyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  xdescribe(`default.`, () => {
    let fixture: ComponentFixture<TestXTypographyComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTypographyComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XTypographyComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: 'test-x-typography',
  imports: [XTypographyComponent, XRowComponent, XColComponent, XDocComponent],
  template: `
    <x-doc>
      <x-row space="1">
        <x-col span="24"><x-typography [text]="text"></x-typography></x-col>
      </x-row>
      <x-row space="1">
        <x-col span="24">
          <table>
            <tr>
              <th width="120">层级</th>
              <th>字体大小</th>
            </tr>
            <tr [style.font-size.rem]="0.75">
              <td>辅助文字</td>
              <td>0.75rem Extra Small</td>
            </tr>
            <tr [style.font-size.rem]="0.825">
              <td>正文（小）</td>
              <td>0.825rem Small</td>
            </tr>
            <tr [style.font-size.rem]="0.875">
              <td>正文</td>
              <td>0.875rem Base</td>
            </tr>
            <tr [style.font-size.rem]="1">
              <td>小标题</td>
              <td>1rem Medium</td>
            </tr>
            <tr [style.font-size.rem]="1.125">
              <td>标题</td>
              <td>1.125rem large</td>
            </tr>
            <tr [style.font-size.rem]="1.25">
              <td>主标题</td>
              <td>1.25rem Extra large</td>
            </tr>
          </table>
        </x-col>
      </x-row>
      <x-row space="1">
        <x-col span="24">
          <table>
            <tr>
              <th width="80">行高</th>
              <th width="140">值</th>
              <th>显示</th>
            </tr>
            <tr>
              <td>无行高</td>
              <td>line-height: 1rem</td>
              <td [style.line-height.rem]="1" [innerHtml]="text"></td>
            </tr>
            <tr>
              <td>紧凑</td>
              <td>line-height: 1.3rem</td>
              <td [style.line-height.rem]="1.3" [innerHtml]="text"></td>
            </tr>
            <tr>
              <td>常规</td>
              <td>line-height: 1.5rem</td>
              <td [style.line-height.rem]="1.5" [innerHtml]="text"></td>
            </tr>
            <tr>
              <td>常规</td>
              <td>line-height: 1.7rem</td>
              <td [style.line-height.rem]="1.7" [innerHtml]="text"></td>
            </tr>
          </table>
        </x-col>
      </x-row>
    </x-doc>
  `
})
class TestXTypographyComponent {
  text = '天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。';
  textLineHeight =
    '天将降大任于是人也，必先苦其心志，<br/>劳其筋骨，饿其体肤，空乏其身，<br/>行拂乱其所为也，所以动心忍性，增益其所不能。';
}
