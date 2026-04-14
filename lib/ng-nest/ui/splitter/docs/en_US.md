---
category: Others
title: Splitter
subtitle: Used to separate panels and adjust their size
order: 1
---

## When To Use

- When you need to display multiple resizable areas in limited space
- When users need to customize the display ratio of different content areas
- Suitable for layout editors, IDE interfaces, data dashboards and other scenarios

## Code Demo

### Basic Usage

Basic horizontal split panel.

{{ default }}

## API

### x-splitter

| Property | Description | Type | Default | Global Config |
| --- | --- | --- | --- | --- |
| direction | Split direction | `'horizontal' \| 'vertical'` | `'horizontal'` | ✅ |

### x-splitter-panel

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| min | Panel minimum size | `string \| number` | `'0'` |
| max | Panel maximum size | `string \| number` | `'100%'` |
| size | Panel default size | `string \| number` | - |

### x-splitter-bar

Splitter bar component, used to create draggable separator lines between panels.
