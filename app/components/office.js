import Component from '@glimmer/component';
import config from '../config/environment';

export default class OfficeComponent extends Component {
    get mapUrl() {
        debugger;
        const url = config.GOOGLE_MAPS.SRC_URL;
        const { geolocation } = this.args.office;

        return `${url}&q=${geolocation.lat},${geolocation.lng}`;
    }
}
