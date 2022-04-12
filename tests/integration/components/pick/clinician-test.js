import {module, test} from 'qunit';
import {setupRenderingTest} from 'ember-qunit';
import {find, render} from '@ember/test-helpers';
import {hbs} from 'ember-cli-htmlbars';
import config from '../../../../config/environment';

module('Integration | Component | pick/clinician', function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
        assert.expect(2);
        await render(hbs`<Pick::Clinician />`);

        const chooseClinician = find('.clinician-input-container input');
        assert.equal(chooseClinician.value, config.APP.INITIAL_CUSTOMER_ID,
            'got the clinician Id from environment vars');

        const chooseHost = find('.host-input-container input');
        assert.equal(chooseHost.value, config.APP.API_HOST, 'got the host url from environment vars');
    });
});
