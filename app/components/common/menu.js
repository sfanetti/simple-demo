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
        const { isDisabled, requires = [], path } = state;
        const pathName = requires.reduce((acc, key) => {
            const val = this.session[key];
            acc = acc.replace(`:${key}`, val);
            return acc
        }, path);
        if (!isDisabled) {
            this.router.transitionTo(pathName).catch(() => {
                window.location.pathname = pathName;
            });
        }
    }
}
