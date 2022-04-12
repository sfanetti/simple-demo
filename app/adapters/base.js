import JSONAPIAdapter from '@ember-data/adapter/json-api';
import config from '../config/environment';
import QueryUtils from '../util/query-utils';
import { inject } from '@ember/service';

/**
 * Base adapter with headers and such - could have kept the headers in environment variables - but here is
 * as good as anyplace
 */
export default class BaseAdapter extends JSONAPIAdapter {
    @inject session;
    @inject fakeBackend;

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
        const path = super.pathForType(modelName);
        const params = QueryUtils.getQueryParams(query);
        return `${this.host}/${this.namespace}/${path}/?${params}`;
    }

    query(store, type, query) {
        const fakeResponse = this.fakeBackend.returnFakeBackEndIfNecessary(this.host, store, type, query);

        if (fakeResponse) {
            return fakeResponse;
        }
        return super.query(store, type, query);
    }

}
