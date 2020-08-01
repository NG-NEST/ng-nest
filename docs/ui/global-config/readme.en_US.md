---
order: 4
label: 'Global Config'
---

# Global Config

We have added global configuration capabilities to component parameters, which you can use to define the default behavior of the component.

## How to use

To provide default configuration items for some components, provide an object in the root injector that conforms to the `XConfig` interface according to the injection token `X_CONFIG`, such as:

{{ ____my-app:src/app/app.module.ts:false:fasle }}

These configuration items will be injected into the `XConfigService` service and saved

## Priority of a global configuration item

For any one attribute, the priority of the values from each source is as follows:

A value that is set separately for an instance of a component > Global default values provided through `X_CONFIG` > `Ng-Nest` has built-in default values.

## View all available global configurations

The type definition information provided in the `XConfig` interface helps you find all the components and properties that support global configuration items. In addition, the documentation for each component indicates which properties can be specified as global configuration items.
