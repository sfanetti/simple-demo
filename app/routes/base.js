import Route from '@ember/routing/route';

export default class BaseRoute extends Route {
    activate() {
        // send newRelic beacon - user entered route
    }

    deactivate() {
        // send newRelic beacon - user left route
    }
}
