import Service from '@ember/service';
import config from '../config/environment';

export default class SessionService extends Service {
    currentHost = config.APP.API_HOST;
    currentClinician = config.APP.INITIAL_CUSTOMER_ID;

}
