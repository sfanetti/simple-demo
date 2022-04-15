import {module, test} from 'qunit';
import {setupRenderingTest} from 'ember-qunit';
import {find, render} from '@ember/test-helpers';
import {hbs} from 'ember-cli-htmlbars';

let testRouteName, testClinicianId, testCptCode;

const MOCK_CPT_CODE = 'my-cpt-code';
const MOCK_CLINICIAN_ID = 'my-clinician-id';
const DESCRIPTION = 'Cranial Drilling';
const DURATION = 120;
const RATE = 500;
const CALL_TO_BOOK = true;
const LINKS = {self: 'http://www.example.com'};
const CLINICIAN = {id: MOCK_CLINICIAN_ID };

class MockCode {
    constructor() {
        this.id = MOCK_CPT_CODE;
        this.description = DESCRIPTION;
        this.duration = DURATION;
        this.rate = RATE;
        this.callToBook = CALL_TO_BOOK;
        this.links = LINKS;
        this.clinician = CLINICIAN;
    }
}

class MockRouterService {
    static create() {
        return new MockRouterService();
    }

    transitionTo(routeName, clinicianId) {
        testRouteName = routeName;
        testClinicianId = clinicianId;
    }

}

class MockSession {
    static create() {
        return new MockSession();
    }
    set cptCode(val) {
        testCptCode = val;
    }
}

module('Integration | Component | pick/cpt-code', function (hooks) {
    setupRenderingTest(hooks);

    hooks.beforeEach(function () {
        this.owner.register('service:router', MockRouterService);
        this.owner.register('service:session', MockSession);
    });

    test('it renders with mock data and button clicks go where they are supposed to', async function (assert) {
        const code = new MockCode();
        this.set('code', code);
        this.set('clinicianId', MOCK_CLINICIAN_ID);

        await render(hbs`<Pick::CptCode @code={{code}} @clinicianId={{clinicianId}} />`);

        const description = find('h3.description');
        assert.equal(description.textContent, DESCRIPTION, 'The description was found');

        const calloutUrl = find('a.call-out').attributes.href.textContent;
        assert.equal(calloutUrl, LINKS.self, 'link is set');

        const duration = find('.duration');
        assert.equal(duration.textContent, `${DURATION} minutes`, 'duration was set');

        const cost = find('.cost');
        assert.equal(cost.textContent, `$${RATE}`, 'The rate was set');

        const button = find('button.btn-select-service');

        await button.click();

        assert.equal(testRouteName, 'pick-office', 'The office id was selected');
        assert.equal(testClinicianId, MOCK_CLINICIAN_ID, 'The clinician ID was passed on click to set the route');
        assert.equal(testCptCode, MOCK_CPT_CODE, 'The cpt code was passed on click to set session var');
    });
});
