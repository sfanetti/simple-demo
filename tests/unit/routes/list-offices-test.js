import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | list-offices', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:list-offices');
    assert.ok(route);
  });
});
