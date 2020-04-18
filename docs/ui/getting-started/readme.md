---
order: 2
label: '快速上手'
---

# 快速上手

## 第 1 步：使用 Angular CLI 创建项目和初始项目

运行 CLI 命令 ng new 并提供 my-app 名称作为参数。

```bash
$ ng new my-app
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use?
  CSS
> SCSS   [ https://sass-lang.com/documentation/syntax#scss                ]
  Sass   [ https://sass-lang.com/documentation/syntax#the-indented-syntax ]
  Less   [ http://lesscss.org                                             ]
  Stylus [ http://stylus-lang.com                                         ]
```

> 此处请选择 SCSS 来做样式语言，暂不支持其它的样式语言。

Angular CLI 会安装必要的 Angular npm 包和其他依赖包。这可能要花几分钟的时间，CLI 会创建一个工作区和一个简单的欢迎应用。

## 第 2 步：使用 npm 安装 @ng-nest/ui

转到 workspace 文件夹（my-app），安装 `@ng-nest/ui` 。

```bash
$ cd my-app
$ npm install @ng-nest/ui
```
