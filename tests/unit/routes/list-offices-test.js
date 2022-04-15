import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | pick-office', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:pick-office');
    assert.ok(route);
  });
});
