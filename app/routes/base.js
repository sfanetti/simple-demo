import Route from '@ember/routing/route';
import { on } from '@ember/object/evented';

export default class BaseRoute extends Route {

    constructor(owner, args) {
        super(...arguments);
    }

    activate() {

    }

    deactivate() {
    }
}
