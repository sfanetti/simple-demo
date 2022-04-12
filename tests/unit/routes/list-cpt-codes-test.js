import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | list-cpt-codes', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:list-cpt-codes');
    assert.ok(route);
  });
});
