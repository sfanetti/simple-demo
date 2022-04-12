import Controller from '@ember/controller';
import config from '../config/environment'
import StorageProvider, { STORAGE_LOCAL } from '../util/storage-provider';
import { tracked } from '@glimmer/tracking';
import { inject } from '@ember/service';
import { action } from '@ember/object';

const EN_US = 'en-us';
const ALIEN = 'alien';

const IS_LIGHT_THEME = 'isLightTheme';
const LOCALE = 'locale';
const storage = StorageProvider.getStorage(STORAGE_LOCAL, 'simple-demo');

export default class ApplicationController extends Controller {
    @tracked _isReady = true;
    @tracked _locale = this.persistedLocale;
    @tracked isLightTheme = this.persistedTheme;

    @inject router;
    @inject session;
    @inject intl;

    get persistedTheme() {
        return storage.has(IS_LIGHT_THEME) ? storage.getItem(IS_LIGHT_THEME) : window.matchMedia("(prefers-color-scheme:light)").matches;
    }

    set persistedTheme(value) {
        storage.setItem(IS_LIGHT_THEME, value);
    }

    get persistedLocale() {
        return storage.has(LOCALE) ? storage.getItem(LOCALE) : config.APP.DEFAULT_LOCAL;
    }

    set persistedLocale(value) {
        storage.setItem(LOCALE, value);
    }

    get isReady() {
        const currentRoute = this.router.currentRouteName;
        return currentRoute.indexOf('404') === -1;
    }

    get isAlien() {
        return this._locale === ALIEN;
    }

    get localToolTipKey () {
        return this.isAlien ? "tooltips.useEnglish" : "tooltips.useAlien";
    }

    get themeToolTipKey () {
        return this.isLightTheme ? "tooltips.useDarkTheme" : "tooltips.useLightThem"
    }

    @action
    onToggleTheme() {
        this.isLightTheme = !this.isLightTheme;
        this.persistedTheme = this.isLightTheme;
    }

    @action
    onLocaleChange() {
        this._locale = !this._locale || this._locale === EN_US ? ALIEN : EN_US;
        this.intl.setLocale([this._locale]);
        this.persistedLocale = this._locale;

    }
}
