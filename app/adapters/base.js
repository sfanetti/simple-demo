import JSONAPIAdapter from '@ember-data/adapter/json-api';
import config from '../config/environment';
import { inject } from '@ember/service';

export default class BaseAdapter extends JSONAPIAdapter {
    @inject session;

    get host() {
        return this.session.currentHost;
    }

    get namespace() {
        return 'client-portal-api';
    }
    get headers() {
        return {
            'Accept': 'application/vnd.api+json',
            'Api-Version': config.APP.API_VERSION,
            'Application-Build-Version': config.APP.BUILD,
            'Application-Platform': 'web'
        }
    }
    buildURL(modelName, id, snapshot, requestType, query) {
        const { clinician_id } = query || {};
        const path = super.pathForType(modelName);

        return `${this.host}/${this.namespace}/${path}/?filter[clinicianId]=${clinician_id}`;
    }

}
