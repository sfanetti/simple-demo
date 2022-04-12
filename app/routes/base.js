import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import ResponseUtils from '../util/response-utils';

export default class BaseRoute extends Route {
    @inject router;
    @inject session;

    takeParamsTemplate(params) {
        return params;
    }

    async modelTemplate (type, params) {
        try {
            let response;
            if (type) {
                response = await this.store.query(type, this.takeParamsTemplate(params));
            } else {
                response = {};
            }

            return ResponseUtils.processResponse(response, params, this.session);
        } catch(e) {
            // newRelic error beacon
            this.router.transitionTo('error');
        }

    }
}
