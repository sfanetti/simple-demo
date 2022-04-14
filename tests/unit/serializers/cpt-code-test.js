import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Serializer | cpt code', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let store = this.owner.lookup('service:store');
    let serializer = store.serializerFor('cpt-code');

    assert.ok(serializer);
  });

  test('it serializes records', function(assert) {
    let store = this.owner.lookup('service:store');
    let record = store.createRecord('cpt-code', {});

    let serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
