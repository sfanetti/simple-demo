import Component from '@glimmer/component';
import config from '../../config/environment';
import { inject } from '@ember/service';
import { action } from '@ember/object';

export default class OfficeComponent extends Component {
    @inject session;
    @inject router;

    get mapUrl() {
        const url = config.GOOGLE_MAPS.SRC_URL;
        const { geolocation } = this.args.office || {};
        if (geolocation) {
            return `${url}&q=${geolocation.lat},${geolocation.lng}`;
        }
        return `${url}&q=0,0`;
    }

    get calloutUrl() {
        const { links } = this.args.office || {};
        return links ? links.self : '';
    }

    @action
    onSelectOffice(id) {
        this.session.officeId = id;
        this.router.transitionTo('pick-date-time', this.args.clinicianId );
    }
}
