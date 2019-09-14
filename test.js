const { setEdition, has, _getEdition } = require('./index');

const { test } = QUnit;

QUnit.module('@ember/edition-utils', function(hooks) {
  // only a test helper **because** we don't want folks to
  // use this in actual shared packages, they should instead
  // use `has`
  function getEdition() {
    return process.env.EMBER_EDITION;
  }

  hooks.afterEach(function() {
    delete process.env.EMBER_EDITION;
  });

  QUnit.module('setEdition', function() {
    test('the edition name that is passed, sets the edition', function(assert) {
      setEdition('octane');

      assert.strictEqual(getEdition(), 'octane');
    });
  });

  QUnit.module('has', function() {
    test('should be considered "classic" without an edition set', function(assert) {
      assert.ok(has('classic'));
    });

    test('should be considered "octane" when passing octane', function(assert) {
      setEdition('octane');

      assert.ok(has('octane'));
    });

    test('should not "have" octane, when edition is classic', function(assert) {
      setEdition('classic');

      assert.notOk(has('octane'));
    });
  });
});
