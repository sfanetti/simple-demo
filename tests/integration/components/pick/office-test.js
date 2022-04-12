import {module, test} from 'qunit';
import {setupRenderingTest} from 'ember-qunit';
import {render, find} from '@ember/test-helpers';
import {hbs} from 'ember-cli-htmlbars';

let testRouteName, testClinicianId, testOfficeId;

const MOCK_OFFICE_ID = 'my-office-id';
const MOCK_CLINICIAN_ID = 'my-clinician-id';
const MOCK_NAME = "Big Jim's House of Cranial Drilling";
const MOCK_PHONE = '1 (912) 867 - 5309';
const MOCK_IS_VIDEO = true;
const MOCK_GEO_LOCATION = {lat: 36.114647, lng: -115.172813};
const MOCK_IS_PUBLIC = false;
const MOCK_LINKS = {self: 'http://www.big-jims.com'};
const MOCK_CLINICIAN = {id: MOCK_CLINICIAN_ID};

class MockOffice {
    constructor(name, phone, isVideo, geoLocation, isPublic, links, clinician) {
        this.id = MOCK_OFFICE_ID;
        this.name = name;
        this.phone = phone;
        this.isVideo = isVideo;
        this.geolocation = geoLocation;
        this.isPublic = isPublic;
        this.links = links;
        this.clinician = clinician;
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

    set officeId(val) {
        testOfficeId = val;
    }
}

module('Integration | Component | pick/office', function (hooks) {
    setupRenderingTest(hooks);

    hooks.beforeEach(function () {
        this.owner.register('service:router', MockRouterService);
        this.owner.register('service:session', MockSession);
    });

    test('it renders with mock data and button clicks go where they are supposed to', async function (assert) {
        this.set('office', new MockOffice(
            MOCK_NAME,
            MOCK_PHONE,
            MOCK_IS_VIDEO,
            MOCK_GEO_LOCATION,
            MOCK_IS_PUBLIC,
            MOCK_LINKS,
            MOCK_CLINICIAN
        ));
        this.set('clinicianId', MOCK_CLINICIAN_ID);

        await render(hbs`<Pick::Office @office={{office}} @clinicianId={{clinicianId}} />`);

        const name = find('h3.name').textContent.trim();
        assert.equal(name, MOCK_NAME, 'The name was found');

        const isShowingVideoIcon = find('.interaction-type > i.fa-camera-web');

        assert.ok(isShowingVideoIcon, 'The video icon is being shown');

        const calloutUrl = find('a.call-out').attributes.href.textContent;
        assert.equal(calloutUrl, MOCK_LINKS.self, 'link is set');

        const phoneNumber = find('.phone-number dd').textContent;
        assert.equal(phoneNumber, MOCK_PHONE, 'the phone number was set');

        const button = find('button.btn-select-office');

        await button.click();

        assert.equal(testRouteName, 'pick-date-time', 'The cpt code was selected');
        assert.equal(testClinicianId, MOCK_CLINICIAN_ID, 'The clinician ID was passed on click to set the route');
        assert.equal(testOfficeId, MOCK_OFFICE_ID, 'The office id was passed on click to set session var');

    });
});
