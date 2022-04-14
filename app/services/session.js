import Service from '@ember/service';
import config from '../config/environment';
import { tracked } from '@glimmer/tracking';


export default class SessionService extends Service {
    @tracked currentHost = config.APP.API_HOST;
    @tracked clinicianId = config.APP.INITIAL_CUSTOMER_ID;
    @tracked cptCode;
    @tracked officeId;

    @tracked isLightTheme = true;

    resetToDefaults() {
        this.currentHost = config.APP.API_HOST;
        this.clinicianId = config.APP.INITIAL_CUSTOMER_ID;
        this.cptCode = '';
        this.officeId = '';
    }

    switchTheme() {
        this.isLightTheme = !this.isLightTheme;
    }

}
