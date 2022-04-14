import Component from '@glimmer/component';

/**
 * Simple Cpt Codes view widget
 */
export default class CptCodesComponent extends Component {
    get duration() {
        const { duration } = this.args.code;
        return `${duration} minutes`;
    }

    get cost() {
        const { rate } = this.args.code;
        return rate > 0 ? `$${rate}` : 'Free';
    }
}
