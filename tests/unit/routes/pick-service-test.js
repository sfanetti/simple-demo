import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | pick-service', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:pick-service');
    assert.ok(route);
  });
});
