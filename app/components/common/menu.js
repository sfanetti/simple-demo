import Component from '@glimmer/component';
import { ROUTES } from "simple-demo/router";
import { inject } from '@ember/service';
import { action } from '@ember/object';
/**
 * Simple route tracking menu
 */
export default class MenuComponent extends Component {
    @inject router;
    @inject session;

    get states() {
        const currentRouteName = this.router.currentRouteName;
        return ROUTES.map(state => {
            const { route, requires } = state;
            const isActive = currentRouteName === route;
            const isDisabled = requires && !requires.every(field => {
                return !!this.session.get(field);
            });
            return {...state, isActive, isDisabled};
        });
    }

    @action
    onClickMenu(state) {
        const { route, isDisabled, params } = state;
        this.session.resetToDefaults();
        if (!isDisabled) {
            if (params) {
                this.router.transitionTo(route, this.session.clinicianId);
            } else {
                this.router.transitionTo(route);
            }
        }
    }
}
