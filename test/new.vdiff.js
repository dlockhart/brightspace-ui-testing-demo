import '../src/calculator.js';
import { clickElem, expect, fixture, focusElem, html } from '@brightspace-ui/testing';

const viewport = { width: 860 };

describe('calculator', () => {

	let elem;
	beforeEach(async() => {
		elem = await fixture(html`<d2l-demo-calculator></d2l-demo-calculator>`, { viewport });
	});

	it('calculator', async() => {
		await expect(elem).to.be.golden();
	});

	it('focus display', async() => {
		await focusElem(elem.shadowRoot.querySelector('input'));
		await expect(elem).to.be.golden();
	});

	it('focus clear', async() => {
		await focusElem(elem.shadowRoot.querySelector('button[data-key="clear"]'));
		await expect(elem).to.be.golden();
	});

	it('click 5', async() => {
		await clickElem(elem.shadowRoot.querySelector('button[data-key="five"]'));
		await expect(elem).to.be.golden();
	});

});
