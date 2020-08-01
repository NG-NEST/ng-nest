---
order: 4
label: 'Internationalization'
---

# Internationalization

The NG-NEST Component uses chinese by default. If you want to use a different language, you need to set up multiple languages. Take English as an examples, in app.module.ts：

{{ __1\__my-app:src/app/app.module.ts:false:true }}

```info
en_US is the name of the language package that you can customize.
```

## Runtime modification

NG-NEST provides a global service XI18nService for dynamically switching languages:

{{ __2\__toggle:toggle.ts:false:false }}

## Usage: Pipe or Directive

First, the corresponding module should be introduced:

{{ __3\__module:module.ts:false:false }}

Then call in the template using the following method:

{{ __4\__html:html.html:false:false }}

## Supported languages

| Language              | Package Name |
| --------------------- | ------------ |
| Arabic                | ar_EG        |
| Armenian              | hy_AM        |
| Bulgarian             | bg_BG        |
| Catalan               | ca_ES        |
| Czech                 | cs_CZ        |
| Denmark               | da_DK        |
| German                | de_DE        |
| Greek                 | el_GR        |
| English (Global)      | en_GB        |
| English               | en_US        |
| Spanish               | es_ES        |
| Estonian              | et_EE        |
| Persian               | fa_IR        |
| Finnish               | fi_FI        |
| French (Belgium)      | fr_BE        |
| French (France)       | fr_FR        |
| Hebrew                | he_IL        |
| Croatian              | hr_HR        |
| Hindi                 | hi_IN        |
| Hungarian             | hu_HU        |
| Indonesian            | id_ID        |
| Italian               | it_IT        |
| Icelandic             | is_IS        |
| Japanese              | ja_JP        |
| Georgian              | ka_GE        |
| Kannada               | kn_IN        |
| Korean                | ko_KR        |
| Kurdish               | ku_IQ        |
| Latvian               | lv_LV        |
| Malay                 | ms_MY        |
| Mongolian             | mn_MN        |
| Norwegian             | nb_NO        |
| Nepal                 | ne_NP        |
| Dutch (Belgium)       | nl_BE        |
| Dutch                 | nl_NL        |
| Polish                | pl_PL        |
| Portuguese (Brazil)   | pt_BR        |
| Portuguese            | pt_PT        |
| Slovak                | sk_SK        |
| Serbian               | sr_RS        |
| Slovenian             | sl_SI        |
| Swedish               | sv_SE        |
| Tamil                 | ta_IN        |
| Thai                  | th_TH        |
| Turkish               | tr_TR        |
| Romanian              | ro_RO        |
| Russian               | ru_RU        |
| Ukrainian             | uk_UA        |
| Vietnamese            | vi_VN        |
| Chinese (Simplified)  | zh_CN        |
| Chinese (Traditional) | zh_TW        |
