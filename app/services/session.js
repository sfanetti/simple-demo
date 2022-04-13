import Service from '@ember/service';
import config from '../config/environment';
import { tracked } from '@glimmer/tracking';

export default class SessionService extends Service {
    @tracked currentHost = config.APP.API_HOST;
    @tracked clinicianId = config.APP.INITIAL_CUSTOMER_ID;
    @tracked isLightTheme = true;

}
