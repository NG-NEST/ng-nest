---
order: 3
label: 'Custom theme'
---

# Custom theme

The NG-NEST supports some degree of style customization and currently supports customization of primary, secondary, and neutral colors.

## Customize way

The NG-NEST style customization user the `VAR` variable in `CSS3` and provides customization in the following ways:

- Specify by [Global configuration](index/docs/en_US/ui/global-config)
- Set through XConfigService
- Through [Theme](index/docs/en_US/components/theme) component set

## Global configuration

In [Global Configuration](index/docs/en_US/ui/global-config), there is a property on the theme that is dedicated to setting the theme, and the default property will be the system default.

{{ ____config:config.ts:false:false }}

## XConfigService set

The XConfigService service is provided in NG-NEST to switch themes at run time, and the dark style of the document is switched through this service.

{{ ____config-service:config.service.ts:false:false }}

## Theme components

Directly introducing [Theme](index/docs/en_US/components/theme) components use, this component is a component form, can be directly through ngModel to set binding values.
