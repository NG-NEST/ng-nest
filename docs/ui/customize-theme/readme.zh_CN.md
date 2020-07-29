---
order: 3
label: '定制主题'
---

# 定制主题

NG-NEST 支持一定程度的样式定制，目前支持主色、辅助色和中性色的定制。

## 定制方式

NG-NEST 的样式定制使用到了 CSS3 中的 var 变量，并提供以下几种方式定制：

- 通过 [全局配置](index/docs/zh_CN/ui/global-config) 指定
- 通过 XConfigService 设置
- 通过 [Theme 主题](index/docs/zh_CN/ui/components/theme) 组件进行设置

### 全局配置

在 [全局配置](index/docs/zh_CN/ui/global-config) 中有一个 theme 的属性专门设置主题，缺省的属性将会用系统默认设置。

{{ ____config:config.ts:false:false }}

### XConfigService 设置

NG-NEST 中提供了 XConfigService 服务用来在运行时切换主题，文档的暗黑风格就是通过此服务来切换的。

{{ ____config-service:config.service.ts:false:false }}

### Theme 主题组件

直接引入 [Theme 主题](index/docs/zh_CN/ui/components/theme) 组件使用，此组件是一个表单组件，可以直接通过 ngModel 来设置绑定值。
