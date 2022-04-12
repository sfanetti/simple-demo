import {module, test} from 'qunit';
import {setupRenderingTest} from 'ember-qunit';
import {render} from '@ember/test-helpers';
import {hbs} from 'ember-cli-htmlbars';

class MockRouterService {
    static create() {
        return new MockRouterService();
    }
    get currentRouteName() {
        return 'pick-clinician';
    }
}

module('Integration | Component | common/menu', function (hooks) {
    setupRenderingTest(hooks);

    hooks.beforeEach(function () {
        this.owner.register('service:router', MockRouterService);
    });

    test('it renders', async function (assert) {
        assert.expect(4);
        await render(hbs`<Common::Menu />`);
        assert.equal(this.element.firstElementChild.firstElementChild.children.length, 4, 'There are 4 menu items');

        const menuItems = Array.from(this.element.firstElementChild.firstElementChild.children);
        const classes = menuItems.map(a => a.classList);

        classes.forEach((classSet, index) => {
            if (index === 0) {
                assert.ok(classSet.contains('active'), 'The first item is selected by default');
            } else if (index > 1) {
                assert.ok(classSet.contains('disabled'),
                    'The last two options are disabled because there is no service picked')
            }
        });

    });
});
