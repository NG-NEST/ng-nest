import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XDocComponent } from './doc.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XDocModule } from '@ng-nest/ui/doc';
import { XDocPrefix } from './doc.property';

describe(XDocPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XDocModule],
      declarations: [TestXDocComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXDocComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXDocComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XDocComponent));
      element = debugElement.nativeElement;
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: 'test-x-doc',
  template: `
    <x-doc>
      <h1>标题1</h1>
      <h2>标题2</h2>
      <h3>标题3</h3>
      <h4>标题4</h4>
      <h5>标题5</h5>
      <p>天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。</p>
      <p>天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。</p>
      <h1 id="快速上手">快速上手</h1>
      <h2 id="第-1-步：使用-angular-cli-创建项目和初始项目">第 1 步：使用 Angular CLI 创建项目和初始项目</h2>
      <p>运行 CLI 命令 ng new 并提供 my-app 名称作为参数。</p>
      <pre><code class="language-bash">$ ng new my-app
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use?
  CSS
&gt; SCSS   [ https://sass-lang.com/documentation/syntax#scss                ]
  Sass   [ https://sass-lang.com/documentation/syntax#the-indented-syntax ]
  Less   [ http://lesscss.org                                             ]
  Stylus [ http://stylus-lang.com                                         ]</code></pre>
      <blockquote><p>此处请选择 SCSS 来做样式语言，暂不支持其它的样式语言。</p></blockquote>
      <p>Angular CLI 会安装必要的 Angular npm 包和其他依赖包。这可能要花几分钟的时间，CLI 会创建一个工作区和一个简单的欢迎应用。</p>
      <h2 id="第-2-步：使用-npm-安装-ng-nestui">第 2 步：使用 npm 安装 @ng-nest/ui</h2>
      <p>转到 workspace 文件夹（my-app），安装 <code>@ng-nest/ui</code> 。</p>
      <pre><code class="language-bash">$ cd my-app
$ npm install @ng-nest/ui</code></pre>
      <pre><code class="language-primary">Angular CLI 会安装必要的 Angular npm 包和其他依赖包。这可能要花几分钟的时间，CLI 会创建一个工作区和一个简单的欢迎应用。</code></pre>
      <pre><code class="language-success">Angular CLI 会安装必要的 Angular npm 包和其他依赖包。这可能要花几分钟的时间，CLI 会创建一个工作区和一个简单的欢迎应用。</code></pre>
      <pre><code class="language-danger">Angular CLI 会安装必要的 Angular npm 包和其他依赖包。这可能要花几分钟的时间，CLI 会创建一个工作区和一个简单的欢迎应用。</code></pre>
      <pre><code class="language-warning">Angular CLI 会安装必要的 Angular npm 包和其他依赖包。这可能要花几分钟的时间，CLI 会创建一个工作区和一个简单的欢迎应用。</code></pre>
      <pre><code class="language-info">Angular CLI 会安装必要的 Angular npm 包和其他依赖包。这可能要花几分钟的时间，CLI 会创建一个工作区和一个简单的欢迎应用。</code></pre>
      <blockquote>
        <blockquote><p>此处请选择 SCSS 来做样式语言，暂不支持其它的样式语言。</p></blockquote>
      </blockquote>
      <blockquote>
        <blockquote>
          <blockquote><p>erer 此处请选择 SCSS 来做样式语言，暂不支持其它的样式语言。</p></blockquote>
        </blockquote>
      </blockquote>
      <blockquote>
        <ul>
          <li>此处请选择 SCSS 来做样式语言，暂不支持其它的样式语言。</li>
          <li>此处请选择 SCSS 来做样式语言，暂不支持其它的样式语言。</li>
          <li>此处请选择 SCSS 来做样式语言，暂不支持其它的样式语言。</li>
        </ul>
      </blockquote>
      <blockquote>
        <ul>
          <li>此处请选择 SCSS 来做样式语言，暂不支持其它的样式语言。</li>
          <li>此处请选择 SCSS 来做样式语言，暂不支持其它的样式语言。</li>
          <li>此处请选择 SCSS 来做样式语言，暂不支持其它的样式语言。</li>
        </ul>
      </blockquote>
      <ul>
        <li>此处请选择 SCSS 来做样式语言，暂不支持其它的样式语言。</li>
      </ul>
      <p>~ 此处请选择 SCSS 来做样式语言，暂不支持其它的样式语言。</p>
    </x-doc>
  `
})
class TestXDocComponent {}
