---
category: Others
title: Splitter 分隔面板
subtitle: 用于分隔面板并调整其大小
order: 1
---

## 何时使用

- 当需要在有限空间内展示多个可调整大小的区域时
- 当用户需要自定义不同内容区域的显示比例时
- 适用于布局编辑器、IDE 界面、数据看板等场景

## 代码演示

### 基本用法

基本的水平分隔面板。

{{ default }}

## API

### x-splitter

| 参数 | 说明 | 类型 | 默认值 | 全局配置 |
| --- | --- | --- | --- | --- |
| direction | 分割方向 | `'horizontal' \| 'vertical'` | `'horizontal'` | ✅ |

### x-splitter-panel

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| min | 面板最小尺寸 | `string \| number` | `'0'` |
| max | 面板最大尺寸 | `string \| number` | `'100%'` |
| size | 面板默认尺寸 | `string \| number` | - |

### x-splitter-bar

分隔条组件，用于在面板之间创建可拖动的分隔线。
