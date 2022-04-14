import Service from '@ember/service';
import config from '../config/environment';
import { tracked } from '@glimmer/tracking';

export default class SessionService extends Service {
    @tracked currentHost = config.APP.API_HOST;
    @tracked clinicianId = config.APP.INITIAL_CUSTOMER_ID;
    @tracked isLightTheme = true;

    resetToDefaults() {
        debugger;
        this.currentHost = config.APP.API_HOST;
        this.clinicianId = config.APP.INITIAL_CUSTOMER_ID;
    }

    switchTheme() {
        this.isLightTheme = !this.isLightTheme;
    }

}
