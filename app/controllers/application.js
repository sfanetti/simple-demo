import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject } from '@ember/service';

export default class ApplicationController extends Controller {
    @tracked _isReady = true;
    @inject router;


    get isReady() {
        const currentRoute = this.router.currentRouteName;
        return currentRoute.indexOf('404') === -1;
    }
}
