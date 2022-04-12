import Service from '@ember/service';
import config from '../config/environment';
import { tracked } from '@glimmer/tracking';
import StorageProvider, { STORAGE_LOCAL } from '../util/storage-provider';

const KEY_HOST = 'lastHost';
const KEY_CLINICIAN = 'lastClinician';
const storage = StorageProvider.getStorage(STORAGE_LOCAL, 'simple-demo');

export default class SessionService extends Service {
    @tracked currentHost;
    @tracked clinicianId;
    @tracked cptCode;
    @tracked officeId;

    constructor(){
        super(...arguments);
        this.currentHost = storage.getItem(KEY_HOST) || config.APP.API_HOST;
        this.clinicianId = storage.getItem(KEY_CLINICIAN) || config.APP.INITIAL_CUSTOMER_ID;
    }

    resetToDefaults() {
        this.currentHost = config.APP.API_HOST;
        this.clinicianId = config.APP.INITIAL_CUSTOMER_ID;
        this.cptCode = '';
        this.officeId = '';

        this.persistLastHost();
    }

    persistLastHost() {
        storage.setItem(KEY_HOST, this.currentHost);
        storage.setItem(KEY_CLINICIAN, this.clinicianId);
    }
}
