import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XDocComponent } from '@ng-nest/ui/doc';
import { XDocPrefix } from './doc.property';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XThemeModule } from '@ng-nest/ui/theme';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XRowComponent, XColComponent } from '@ng-nest/ui/layout';
import { XBadgeComponent } from '@ng-nest/ui/badge';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XExamplesModule } from '@ng-nest/ui/examples';
import { XApiComponent } from '@ng-nest/ui/api';
import { XTabsModule } from '@ng-nest/ui/tabs';
import { XHighlightModule } from '@ng-nest/ui/highlight';
import { XPatternComponent } from '@ng-nest/ui/pattern';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe(XDocPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        XThemeModule,
        XDocComponent,
        XIconComponent,
        XRowComponent,
        XColComponent,
        XBadgeComponent,
        XButtonComponent,
        XExamplesModule,
        XApiComponent,
        XTabsModule,
        XHighlightModule,
        XPatternComponent
      ],
      declarations: [
        TestXDocComponent,
        ExColorComponent,
        ExCustomComponent,
        ExDefaultComponent,
        ExDotComponent,
        ExMaxComponent
      ]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXDocComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXDocComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XDocComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: 'test-x-doc',
  template: `
    <x-theme showDark></x-theme>
    <x-doc>
      <h1 id="badge-标记">Badge 标记</h1>
      <p>出现在按钮、图标旁的数字或状态标记。</p>
      <h2 id="单独引入此组件">单独引入此组件</h2>
      <p><x-highlight [type]="'typescript'" [data]="vcwurln"></x-highlight></p>
      <h2 id="示例代码">示例代码</h2>
      <p>
        <x-examples>
          <x-tabs layout="left" nodeJustify="start" size="large">
            <x-tab label="基础用法"
              ><x-tabs layout="top" nodeJustify="center" size="large">
                <x-tab label="基础用法">
                  <div class="x-examples-html"><ex-default></ex-default></div>

                  <div class="x-examples-info">
                    <ul>
                      <li>展示新消息数量。</li>
                      <li>定义 <code>value</code> 属性，它接受 <code>number</code> 或者 <code>string</code>。</li>
                    </ul>
                  </div>

                  <div class="x-examples-code">
                    <x-tabs layout="top" nodeJustify="center" size="medium">
                      <x-tab label="default.component.html"
                        ><x-highlight [type]="'html'" [data]="ndfqhd"></x-highlight>
                      </x-tab>
                      <x-tab label="default.component.scss"
                        ><x-highlight [type]="'scss'" [data]="dwxdlq"></x-highlight>
                      </x-tab>
                      <x-tab label="default.component.ts"
                        ><x-highlight [type]="'typescript'" [data]="cfixqt"></x-highlight>
                      </x-tab>
                    </x-tabs>
                  </div>
                </x-tab>
                <x-tab label="最大值">
                  <div class="x-examples-html"><ex-max></ex-max></div>

                  <div class="x-examples-info">
                    <p>
                      由 <code>max</code> 属性定义，它接受一个 <code>number</code>，需要注意的是，只有当
                      <code>value</code> 为 <code>number</code> 时，它才会生效。
                    </p>
                  </div>

                  <div class="x-examples-code">
                    <x-tabs layout="top" nodeJustify="center" size="medium">
                      <x-tab label="max.component.html"
                        ><x-highlight [type]="'html'" [data]="trxoqr"></x-highlight>
                      </x-tab>
                      <x-tab label="max.component.scss"
                        ><x-highlight [type]="'scss'" [data]="ghvlqn"></x-highlight>
                      </x-tab>
                      <x-tab label="max.component.ts"
                        ><x-highlight [type]="'typescript'" [data]="ezuvkp"></x-highlight>
                      </x-tab>
                    </x-tabs>
                  </div>
                </x-tab>
                <x-tab label="自定义">
                  <div class="x-examples-html"><ex-custom></ex-custom></div>

                  <div class="x-examples-info">
                    <ul>
                      <li>可以显示数字以外的文本内容。</li>
                      <li>定义 <code>value</code> 为 <code>string</code> 类型是时可以用于显示自定义文本。</li>
                    </ul>
                  </div>

                  <div class="x-examples-code">
                    <x-tabs layout="top" nodeJustify="center" size="medium">
                      <x-tab label="custom.component.html"
                        ><x-highlight [type]="'html'" [data]="olieox"></x-highlight>
                      </x-tab>
                      <x-tab label="custom.component.scss"
                        ><x-highlight [type]="'scss'" [data]="ckmbii"></x-highlight>
                      </x-tab>
                      <x-tab label="custom.component.ts"
                        ><x-highlight [type]="'typescript'" [data]="wksoii"></x-highlight>
                      </x-tab>
                    </x-tabs>
                  </div>
                </x-tab>
                <x-tab label="小红点">
                  <div class="x-examples-html"><ex-dot></ex-dot></div>

                  <div class="x-examples-info">
                    <ul>
                      <li>以红点的形式标注需要关注的内容。</li>
                      <li>设置 <code>dot</code> 属性，它接受一个 <code>boolean</code> 。</li>
                    </ul>
                  </div>

                  <div class="x-examples-code">
                    <x-tabs layout="top" nodeJustify="center" size="medium">
                      <x-tab label="dot.component.html"
                        ><x-highlight [type]="'html'" [data]="qpjmie"></x-highlight>
                      </x-tab>
                      <x-tab label="dot.component.scss"
                        ><x-highlight [type]="'scss'" [data]="rovvyy"></x-highlight>
                      </x-tab>
                      <x-tab label="dot.component.ts"
                        ><x-highlight [type]="'typescript'" [data]="uyewmf"></x-highlight>
                      </x-tab>
                    </x-tabs>
                  </div>
                </x-tab>
                <x-tab label="颜色">
                  <div class="x-examples-html"><ex-color></ex-color></div>

                  <div class="x-examples-info">
                    <p>设置 <code>type</code> 属性显示不同的背景色。</p>
                  </div>

                  <div class="x-examples-code">
                    <x-tabs layout="top" nodeJustify="center" size="medium">
                      <x-tab label="color.component.html"
                        ><x-highlight [type]="'html'" [data]="pdmpno"></x-highlight>
                      </x-tab>
                      <x-tab label="color.component.scss"
                        ><x-highlight [type]="'scss'" [data]="pgjhrb"></x-highlight>
                      </x-tab>
                      <x-tab label="color.component.ts"
                        ><x-highlight [type]="'typescript'" [data]="ohpyfz"></x-highlight>
                      </x-tab>
                    </x-tabs>
                  </div>
                </x-tab>
              </x-tabs>
            </x-tab>
          </x-tabs>
        </x-examples>
      </p>
      <h2 id="api">API</h2>
      <p>
        <x-api
          ><h3 class="x-api-selector"><span>x-badge</span> <span>component</span></h3>
          <p></p>
          <h3>XBadgeProperty</h3>
          <p></p>
          <table class="x-api-interface">
            <tr>
              <th colspan="5">Input</th>
            </tr>
            <tr>
              <th>参数</th>
              <th>说明</th>
              <th>输入类型</th>
              <th>默认值</th>
              <th>全局设置</th>
            </tr>
            <tr>
              <td>
                <span><code>type</code></span>
              </td>
              <td>背景颜色<span></span></td>
              <td><code [innerHTML]="'XBadgeType'"></code></td>
              <td><code [innerHTML]="'danger'"></code></td>
              <td></td>
            </tr>
            <tr>
              <td>
                <span><code>max</code></span>
              </td>
              <td>最大值<span></span></td>
              <td><code [innerHTML]="'XNumber'"></code></td>
              <td><code [innerHTML]="''"></code></td>
              <td></td>
            </tr>
            <tr>
              <td>
                <span><code>value</code></span>
              </td>
              <td>显示值<span></span></td>
              <td><code [innerHTML]="'XNumber'"></code></td>
              <td><code [innerHTML]="''"></code></td>
              <td></td>
            </tr>
            <tr>
              <td>
                <span><code>dot</code></span>
              </td>
              <td>是否显示小红点<span></span></td>
              <td><code [innerHTML]="'XBoolean'"></code></td>
              <td><code [innerHTML]="''"></code></td>
              <td></td>
            </tr>
          </table>
          <h3>Type</h3>
          <table class="x-api-type">
            <tr>
              <th>类型</th>
              <th>说明</th>
              <th>值</th>
            </tr>
            <tr>
              <td><code [innerHTML]="'XBadgeType'"></code></td>
              <td>标记类型</td>
              <td><code [innerHTML]="'primary'"></code></td>
            </tr></table
        ></x-api>
      </p>
    </x-doc>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
    `
  ]
})
class TestXDocComponent {
  ndfqhd = `<div class="row">
  <x-badge value="12">
    <x-button>评论</x-button>
  </x-badge>
  <x-badge value="3">
    <x-button>回复</x-button>
  </x-badge>
</div>
`;
  dwxdlq = `:host {
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
}
`;
  cfixqt = `import { Component } from '@angular/core';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {}
`;
  trxoqr = `<div class="row">
  <x-badge value="200" max="99">
    <x-button>评论</x-button>
  </x-badge>
  <x-badge value="300" max="200">
    <x-button>回复</x-button>
  </x-badge>
</div>
`;
  ghvlqn = `:host {
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
}
`;
  ezuvkp = `import { Component } from '@angular/core';

@Component({
  selector: 'ex-max',
  templateUrl: './max.component.html',
  styleUrls: ['./max.component.scss']
})
export class ExMaxComponent {}
`;
  olieox = `<div class="row">
  <x-badge value="new">
    <x-button>评论</x-button>
  </x-badge>
  <x-badge value="hot">
    <x-button>回复</x-button>
  </x-badge>
</div>
`;
  ckmbii = `:host {
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
}
`;
  wksoii = `import { Component } from '@angular/core';

@Component({
  selector: 'ex-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class ExCustomComponent {}
`;
  qpjmie = `<div class="row">
  <x-badge dot>
    <x-button type="primary">评论</x-button>
  </x-badge>
  <x-badge dot>
    <x-icon type="fto-user"></x-icon>
  </x-badge>
</div>
`;
  rovvyy = `:host {
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
}
`;
  uyewmf = `import { Component } from '@angular/core';

@Component({
  selector: 'ex-dot',
  templateUrl: './dot.component.html',
  styleUrls: ['./dot.component.scss']
})
export class ExDotComponent {}
`;
  pdmpno = `<div class="row">
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
`;
  pgjhrb = `:host {
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
}
`;
  ohpyfz = `import { Component } from '@angular/core';

@Component({
  selector: 'ex-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ExColorComponent {}
`;
  vcwurln = `import { XBadgeComponent } from '@ng-nest/ui/badge';`;
}

@Component({
  selector: 'ex-color',
  template: `<div class="row">
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
  </div>`,
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
class ExColorComponent {}

@Component({
  selector: 'ex-custom',
  template: `<div class="row">
    <x-badge value="new">
      <x-button>评论</x-button>
    </x-badge>
    <x-badge value="hot">
      <x-button>回复</x-button>
    </x-badge>
  </div>`,
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
class ExCustomComponent {}

@Component({
  selector: 'ex-default',
  template: `<div class="row">
    <x-badge value="12">
      <x-button>评论</x-button>
    </x-badge>
    <x-badge value="3">
      <x-button>回复</x-button>
    </x-badge>
  </div>`,
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
class ExDefaultComponent {}

@Component({
  selector: 'ex-dot',
  template: `<div class="row">
    <x-badge dot>
      <x-button type="primary">评论</x-button>
    </x-badge>
    <x-badge dot>
      <x-icon type="fto-user"></x-icon>
    </x-badge>
  </div> `,
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
class ExDotComponent {}

@Component({
  selector: 'ex-max',
  template: `<div class="row">
    <x-badge value="200" max="99">
      <x-button>评论</x-button>
    </x-badge>
    <x-badge value="300" max="200">
      <x-button>回复</x-button>
    </x-badge>
  </div> `,
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
class ExMaxComponent {}
