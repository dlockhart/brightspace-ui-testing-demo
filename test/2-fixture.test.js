import '../src/calculator.js';
import { expect, fixture, html } from '@brightspace-ui/testing';

describe('fixture', () => {

	it('should render 17 buttons', async() => {
		const elem = await fixture(html`<d2l-demo-calculator></d2l-demo-calculator>`);
		expect(elem.shadowRoot.querySelectorAll('button').length).to.equal(17);
	});

	it('should support French', async() => {
		const elem = await fixture(
			html`<d2l-demo-calculator></d2l-demo-calculator>`,
			{ lang: 'fr' }
		);
		expect(elem.shadowRoot.querySelector('[data-key="clear"]').innerText).to.equal('effacer');
	});

	// more: fixture reuse, configuring rtl, viewport, media

});
