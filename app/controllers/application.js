import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject } from '@ember/service';
import { action } from '@ember/object';


export default class ApplicationController extends Controller {
    @tracked _isReady = true;
    @inject router;
    @inject session;

    @tracked className = 'fubar';


    get isReady() {
        const currentRoute = this.router.currentRouteName;
        return currentRoute.indexOf('404') === -1;
    }

    @action
    onToggleTheme() {
        this.session.isLightTheme = !this.session.isLightTheme;
    }
}
