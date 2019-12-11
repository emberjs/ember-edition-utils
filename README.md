# @ember/edition-utils

This package is the officially supported mechanism for declaring and detecting
the specific edition that a given application is using.

## Usage

### Declaring Edition

In order to declare which edition of Ember your application (or addon's test bed application) is compatible with
you would update your `package.json` to include the following:

```js
{
  "name": "project-name",
  // ...snip
  "ember": {
    "edition": "octane"
  }
}
```

### Detecting Edition

In order to detect if the currently running application is using _at least_ a
specific edition, you would call `has`. This will most commonly be used from
within various addon's to determine which blueprint code to run. For example:

```js
const { has } = require('@ember/edition-utils');

if (has('octane', this.project.root)) {
  // do octane stuff
} else {
  // do classic mode stuff
}
```

### Valid use of the edition value

The edition flag should only be used by addons to determine what blueprint
output to generate and to provide helpful warnings (or errors) at build time.

This does **not** allow for an addon to detect the edition configuration and
change its fundamental implementation. This is quite intentional!

Instead, addons should rely on feature detection techniques like the following
to alter implementations:

* Check to see if given methods/properties exist (this is essentially like how
  browser polyfills work)
* Use a tool like
  [ember-compatibility-helpers](https://github.com/pzuraq/ember-compatibility-helpers)'s
  `gte` method (e.g. `if (gte('ember-source', '3.14.0')) { }`)
* Use
  [@ember/optional-features](https://github.com/emberjs/ember-optional-features)'s
  [`isFeatureEnabled`
  method](https://github.com/emberjs/ember-optional-features#at-build-time-from-an-addon)

## License

This project is licensed under the [MIT License](LICENSE.md).
