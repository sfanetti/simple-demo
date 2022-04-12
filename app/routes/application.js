import Route from '@ember/routing/route';
import config from '../config/environment';
import StorageProvider, { STORAGE_LOCAL } from '../util/storage-provider';
import { inject } from '@ember/service';

export default class ApplicationRoute extends Route {
    @inject intl;

    beforeModel() {
        const storage = StorageProvider.getStorage(STORAGE_LOCAL, 'simple-demo');
        const defaultLocale = storage.getItem('locale') || config.APP.DEFAULT_LOCALE;
        this.intl.setLocale([defaultLocale]);
    }
}
