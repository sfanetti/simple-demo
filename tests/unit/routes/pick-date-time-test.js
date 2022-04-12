import {module, test} from 'qunit';
import {setupTest} from 'ember-qunit';

module('Unit | Route | pick-date-time', function (hooks) {
    setupTest(hooks);

    test('it exists', function (assert) {
        let route = this.owner.lookup('route:pick-date-time');
        assert.ok(route);
    });
});
