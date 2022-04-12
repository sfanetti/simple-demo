import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | common/scroll-container', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
      <Common::ScrollContainer>
        template block text
      </Common::ScrollContainer>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
