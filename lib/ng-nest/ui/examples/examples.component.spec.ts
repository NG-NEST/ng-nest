import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XExamplesComponent } from '@ng-nest/ui/examples';
import { XExamplesPrefix } from './examples.property';
import { XTabsComponent, XTabComponent } from '@ng-nest/ui/tabs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe(XExamplesPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestXExamplesComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXExamplesComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXExamplesComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XExamplesComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: 'test-x-examples',
  imports: [XExamplesComponent, XTabsComponent, XTabComponent],
  template: `
    <x-examples>
      <x-tabs nodeJustify="start">
        <x-tab label="基础用法"
          ><x-tabs [layout]="'top'">
            <x-tab label="默认">
              <div class="x-examples-html">基础用法</div>

              <div class="x-examples-info">
                <p>基础的按钮用法。</p>
                <ul>
                  <li>
                    使用 <code>type</code> 、 <code>plain</code>、 <code>round</code> 和 <code>circle</code> 属性来定义
                    Button 的样式。
                  </li>
                </ul>
              </div>

              <div class="x-examples-code">
                <x-tabs [layout]="'top'" type="card">
                  <x-tab label="default.component.html">456 </x-tab>
                  <x-tab label="default.component.scss">789 </x-tab>
                  <x-tab label="default.component.ts">101112 </x-tab>
                </x-tabs>
              </div>
            </x-tab>
            <x-tab label="默认">
              <div class="x-examples-html">基础用法</div>

              <div class="x-examples-info">
                <p>基础的按钮用法。</p>
                <ul>
                  <li>
                    使用 <code>type</code> 、 <code>plain</code>、 <code>round</code> 和 <code>circle</code> 属性来定义
                    Button 的样式。
                  </li>
                </ul>
              </div>

              <div class="x-examples-code">
                <x-tabs [layout]="'top'" type="card">
                  <x-tab label="default.component.html">456 </x-tab>
                  <x-tab label="default.component.scss">789 </x-tab>
                  <x-tab label="default.component.ts">101112 </x-tab>
                </x-tabs>
              </div>
            </x-tab>
            <x-tab label="默认">
              <div class="x-examples-html">基础用法</div>

              <div class="x-examples-info">
                <p>基础的按钮用法。</p>
                <ul>
                  <li>
                    使用 <code>type</code> 、 <code>plain</code>、 <code>round</code> 和 <code>circle</code> 属性来定义
                    Button 的样式。
                  </li>
                </ul>
              </div>

              <div class="x-examples-code">
                <x-tabs [layout]="'top'">
                  <x-tab label="default.component.html">456 </x-tab>
                  <x-tab label="default.component.scss">789 </x-tab>
                  <x-tab label="default.component.ts">101112 </x-tab>
                </x-tabs>
              </div>
            </x-tab>
          </x-tabs>
        </x-tab>
        <x-tab label="禁用状态"
          ><x-tabs [layout]="'top'">
            <x-tab label="禁用状态">
              <div class="x-examples-html">禁用状态</div>

              <div class="x-examples-info">
                <p>按钮不可用状态。</p>
                <ul>
                  <li>你可以使用 <code>disabled</code> 属性来定义按钮是否可用，它接受一个 <code>Boolean</code> 值。</li>
                </ul>
              </div>

              <div class="x-examples-code">
                <x-tabs [layout]="'top'">
                  <x-tab label="default.component.html">456 </x-tab>
                  <x-tab label="default.component.scss">789 </x-tab>
                  <x-tab label="default.component.ts">101112 </x-tab>
                </x-tabs>
              </div>
            </x-tab>
          </x-tabs>
        </x-tab>
        <x-tab label="文字按钮"
          ><x-tabs [layout]="'top'">
            <x-tab label="文字按钮">
              <div class="x-examples-html">文字按钮</div>

              <div class="x-examples-info">
                <ul>
                  <li>没有边框和背景色的按钮。</li>
                </ul>
              </div>

              <div class="x-examples-code">
                <x-tabs [layout]="'top'">
                  <x-tab label="default.component.html">456 </x-tab>
                  <x-tab label="default.component.scss">789 </x-tab>
                  <x-tab label="default.component.ts">101112 </x-tab>
                </x-tabs>
              </div>
            </x-tab>
          </x-tabs>
        </x-tab>
        <x-tab label="图标按钮"
          ><x-tabs [layout]="'top'">
            <x-tab label="图标按钮">
              <div class="x-examples-html">图标按钮</div>

              <div class="x-examples-info">
                <p>带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。</p>
                <ul>
                  <li>使用 <code>icon</code> 属性即可，<code>icon</code> 的列表可以参考 <code>icon</code> 组件。</li>
                  <li>使用 <code>direction</code> 可以设置在文字右边的图标 。</li>
                </ul>
              </div>

              <div class="x-examples-code">
                <x-tabs [layout]="'top'">
                  <x-tab label="default.component.html">456 </x-tab>
                  <x-tab label="default.component.scss">789 </x-tab>
                  <x-tab label="default.component.ts">101112 </x-tab>
                </x-tabs>
              </div>
            </x-tab>
          </x-tabs>
        </x-tab>
        <x-tab label="按钮组"
          ><x-tabs [layout]="'top'">
            <x-tab label="按钮组">
              <div class="x-examples-html">按钮组</div>

              <div class="x-examples-info">
                <p>以按钮组的方式出现，常用于多项类似操作。</p>
                <ul>
                  <li>使用 <code>&lt;x-buttons&gt;</code> 标签来嵌套你的按钮。</li>
                </ul>
              </div>

              <div class="x-examples-code">
                <x-tabs [layout]="'top'">
                  <x-tab label="default.component.html">456 </x-tab>
                  <x-tab label="default.component.scss">789 </x-tab>
                  <x-tab label="default.component.ts">101112 </x-tab>
                </x-tabs>
              </div>
            </x-tab>
          </x-tabs>
        </x-tab>
        <x-tab label="加载中"
          ><x-tabs [layout]="'top'">
            <x-tab label="加载中">
              <div class="x-examples-html">加载中</div>

              <div class="x-examples-info">
                <p>点击按钮后进行数据加载操作，在按钮上显示加载状态。</p>
                <ul>
                  <li>
                    要设置为 <code>loading</code> 状态，只要设置 <code>loading</code> 属性为 <code>true</code> 即可。
                  </li>
                </ul>
              </div>

              <div class="x-examples-code">
                <x-tabs [layout]="'top'">
                  <x-tab label="default.component.html">456 </x-tab>
                  <x-tab label="default.component.scss">789 </x-tab>
                  <x-tab label="default.component.ts">101112 </x-tab>
                </x-tabs>
              </div>
            </x-tab>
          </x-tabs>
        </x-tab>
        <x-tab label="不同尺寸"
          ><x-tabs [layout]="'top'">
            <x-tab label="不同尺寸">
              <div class="x-examples-html">不同尺寸</div>

              <div class="x-examples-info">
                <p>
                  <code>Button</code>
                  组件提供除了默认值以外的四种尺寸，可以在不同场景下选择合适的按钮尺寸。
                </p>
                <ul>
                  <li>
                    额外的尺寸：<code>large</code>、<code>medium</code>、<code>small</code>、<code>mini</code>，通过设置
                    <code>size</code> 属性来配置它们。
                  </li>
                </ul>
              </div>

              <div class="x-examples-code">
                <x-tabs [layout]="'top'">
                  <x-tab label="default.component.html">456 </x-tab>
                  <x-tab label="default.component.scss">789 </x-tab>
                  <x-tab label="default.component.ts">101112 </x-tab>
                </x-tabs>
              </div>
            </x-tab>
          </x-tabs>
        </x-tab>
      </x-tabs>
    </x-examples>
  `
})
class TestXExamplesComponent {}
