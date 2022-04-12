import Component from '@glimmer/component';
import { inject } from '@ember/service';
import { action } from '@ember/object';

/**
 * Simple Cpt Codes view widget
 */
export default class CptCodesComponent extends Component {
    @inject session;
    @inject router;

    get calloutUrl() {
        const { links } = this.args.code || {};
        return links ? links.self : '';
    }

    @action
    onSelectCode(code) {
        this.session.cptCode = code;
        this.router.transitionTo('pick-office', this.args.clinicianId, code );
    }
}
