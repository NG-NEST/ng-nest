---
order: 4
label: '国际化'
---

# 国际化

NG-NEST 组件内部默认使用中文，若希望使用其他语言，则需要进行多语言设置。以英文为例，在 app.module.ts 中：

{{ __1\__my-app:src/app/app.module.ts:false:true }}

```info
en_US 是语言包名称，可自定义语言包。
```

## 运行时修改

NG-NEST 提供了一个全局服务 XI18nService 用于动态切换语言：

{{ __2\__toggle:toggle.ts:false:false }}

## 用法：管道或指令

首先需要引入对应的模块：

{{ __3\__module:module.ts:false:false }}

然后在模板中使用下面的方式调用：

{{ __4\__html:html.html:false:false }}

## 支持语言

| 语言             | 语言包名 |
| ---------------- | -------- |
| 阿拉伯           | ar_EG    |
| 亞美尼亞         | hy_AM    |
| 保加利亚语       | bg_BG    |
| 加泰罗尼亚语     | ca_ES    |
| 捷克语           | cs_CZ    |
| 丹麦语           | da_DK    |
| 德语             | de_DE    |
| 希腊语           | el_GR    |
| 英语             | en_GB    |
| 英语（美式）     | en_US    |
| 西班牙语         | es_ES    |
| 爱沙尼亚语       | et_EE    |
| 波斯语           | fa_IR    |
| 芬兰语           | fi_FI    |
| 法语（比利时）   | fr_BE    |
| 法语             | fr_FR    |
| 希伯来语         | he_IL    |
| 印地语           | hi_IN    |
| 克罗地亚语       | hr_HR    |
| 匈牙利           | hu_HU    |
| 冰岛语           | is_IS    |
| 印度尼西亚语     | id_ID    |
| 意大利语         | it_IT    |
| 日语             | ja_JP    |
| 格鲁吉亚语       | ka_GE    |
| 卡纳达语         | kn_IN    |
| 韩语/朝鲜语      | ko_KR    |
| 库尔德语         | ku_IQ    |
| 拉脱维亚语       | lv_LV    |
| 马来语           | ms_MY    |
| 蒙古语           | mn_MN    |
| 挪威             | nb_NO    |
| 尼泊尔语         | ne_NP    |
| 荷兰语（比利时） | nl_BE    |
| 荷兰语           | nl_NL    |
| 波兰语           | pl_PL    |
| 葡萄牙语(巴西)   | pt_BR    |
| 葡萄牙语         | pt_PT    |
| 斯洛伐克语       | sk_SK    |
| 塞尔维亚         | sr_RS    |
| 斯洛文尼亚       | sl_SI    |
| 瑞典语           | sv_SE    |
| 泰米尔语         | ta_IN    |
| 泰语             | th_TH    |
| 土耳其语         | tr_TR    |
| 罗马尼亚语       | ro_RO    |
| 俄罗斯语         | ru_RU    |
| 乌克兰语         | uk_UA    |
| 越南语           | vi_VN    |
| 简体中文         | zh_CN    |
| 繁体中文         | zh_TW    |
