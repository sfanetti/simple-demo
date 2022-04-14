import Component from '@glimmer/component';
import { ROUTES } from "simple-demo/router";
import { inject } from '@ember/service';

/**
 * Simple route tracking menu
 */
export default class MenuComponent extends Component {
    @inject router;

    get states() {
        const currentRouteName = this.router.currentRouteName;
        return ROUTES.map(state => {
            const { route } = state;
            const isActive = currentRouteName === route;
            return {...state, isActive};
        });
    }
}
