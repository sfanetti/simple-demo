import Component from '@glimmer/component';
import config from '../../config/environment';
import { inject } from '@ember/service';
import { action } from '@ember/object';

export default class OfficeComponent extends Component {
    @inject session;
    @inject router;

    get mapUrl() {
        const url = config.GOOGLE_MAPS.SRC_URL;
        const { geolocation } = this.args.office;

        return `${url}&q=${geolocation.lat},${geolocation.lng}`;
    }

    @action
    onSelectOffice(id) {
        this.session.officeId = id;
        this.router.transitionTo('pick-date-time', this.args.clinicianId );
    }
}
