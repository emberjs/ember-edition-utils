const { setEdition, has, _getEdition } = require('./index');

const { test } = QUnit;

const OriginalConsole = Object.assign({}, console);

QUnit.module('@ember/edition-utils', function(hooks) {
  // only a test helper **because** we don't want folks to
  // use this in actual shared packages, they should instead
  // use `has`
  function getEdition() {
    return process.env.EMBER_EDITION;
  }

  hooks.afterEach(function() {
    delete process.env.EMBER_EDITION;
    delete process.env.EMBER_VERSION;
    Object.assign(console, OriginalConsole);
  });

  QUnit.module('setEdition', function() {
    test('the edition name that is passed, sets the edition', function(assert) {
      setEdition('octane');

      assert.strictEqual(getEdition(), 'octane');
    });

    test('normalizes the edition name that is passed in (lowercasing)', function(assert) {
      setEdition('OCTANE');

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

    test('should match case insensitively', function(assert) {
      setEdition('octane');

      assert.ok(has('OCTANE'));
    });


    test('should not "have" octane, when edition is classic', function(assert) {
      setEdition('classic');

      assert.notOk(has('octane'));
    });

    test('should infer edition from process.env.EMBER_VERSION with a warning', function(assert) {
      assert.expect(2);

      process.env.EMBER_VERSION = 'octane';
      console.log = (...args) => {
        assert.deepEqual(args, [
          'Please update to using @ember/edition-utils. Using process.env.EMBER_VERSION to declare your application / addon as "octane" ready is deprecated.',
        ]);
      }

      assert.ok(has('octane'), 'finds process.env.EMBER_VERSION');
    });
  });
});
