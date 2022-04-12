import Component from '@glimmer/component';
import { debounce, later } from '@ember/runloop';
import { schedule } from '@ember/runloop';
import { action } from '@ember/object';

const DEBOUNCE_LIMIT = 500;

export default class ScrollContainerComponent extends Component {
    observer;

    constructor() {
        super(...arguments);
        schedule('afterRender', this, function () {
            // I know I know - touching the dom is bad
            // but its for a good cause and only this once
            const element = document.querySelector('.scroll-container');
            if (element) {
                // force attempt to load page 2
                later(this, () => {
                    this.updateScrollRatio(1);
                }, DEBOUNCE_LIMIT);

            }

        })
    }

    willDestroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        super.willDestroy();
    }

    updateScrollRatio(ratio) {
        const payload = { ratio, scrollTop: this.scrollTop, target: this.scrollElement };
        if (this.args.onScrollUpdate) {
            this.args.onScrollUpdate(payload);
        }
    }

    onChildMutation() {
        this.scrollElement.scrollTop = 0;
    }

    @action
    onScroll(e) {
        const { target } = e;
        const parent = target.parentElement;
        const { offsetHeight: parentOffsetHeight } = parent;
        const { scrollTop, scrollHeight } = target;
        this.scrollElement = target;
        this.scrollTop = scrollTop;

        if (!this.observer) {
            this.observer = new MutationObserver(this.onChildMutation.bind(this));
            this.observer.observe(target, { childList: true });
        }
        const range = scrollHeight - parentOffsetHeight;
        const ratio = range ? scrollTop/range : 0;
        debounce(this, this.updateScrollRatio, ratio, DEBOUNCE_LIMIT);
    }
}
