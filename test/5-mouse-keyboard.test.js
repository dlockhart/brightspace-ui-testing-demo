import '../src/calculator.js';
import { clickElem, expect, fixture, html, sendKeysElem } from '@brightspace-ui/testing';

describe('mouse & keyboard', () => {

	let elem;
	beforeEach(async() => {
		elem = await fixture(html`<d2l-demo-calculator></d2l-demo-calculator>`);
	});

	it('should calculate 1 + 1 using mouse', async() => {
		await clickElem(elem.shadowRoot.querySelector('[data-key="1"]'));
		await clickElem(elem.shadowRoot.querySelector('[data-key="+"]'));
		await clickElem(elem.shadowRoot.querySelector('[data-key="1"]'));
		await clickElem(elem.shadowRoot.querySelector('[data-key="="]'));
		expect(elem.value).to.equal('2');
	});

	it('should calculate 1 + 1 using keyboard', async() => {
		const input = elem.shadowRoot.querySelector('input');
		await sendKeysElem(input, 'press', '1');
		await sendKeysElem(input, 'press', '+');
		await sendKeysElem(input, 'press', '1');
		await sendKeysElem(input, 'press', '=');
		expect(elem.value).to.equal('2');
	});

	// more: focusElem, sendKeys, hoverElem, hoverAt, clickAt

});
