import '../src/calculator.js';
import { clickElem, expect, fixture, html, sendKeysElem } from '@brightspace-ui/testing';
import { calculate } from '../src/calculate.js';

describe('basics', () => {

	/* the basics: describe, it, expect/assert, skip/only */

	it('should return the correct value for a simple expression', () => {
		const result = calculate('1+2');
		expect(result).to.equal(3);
	});

	it('should return the correct value for a complex expression', () => {
		const result = calculate('1+2*3');
		expect(result).to.equal(7);
	});

	it('should return ERR for an invalid expression', () => {
		const result = calculate('1+2*3+');
		expect(result).to.equal('ERR');
	});

});

describe('fixture', () => {

	it('should render 17 buttons', async() => {
		/* fixture waits for all nested Lit elements' updateComplete */
		const elem = await fixture(html`<d2l-demo-calculator></d2l-demo-calculator>`);
		expect(elem.shadowRoot.querySelectorAll('button').length).to.equal(17);
	});

	it('should support French', async() => {
		/* configuration */
		const elem = await fixture(
			html`<d2l-demo-calculator></d2l-demo-calculator>`,
			{ lang: 'fr' }
		);
		expect(elem.shadowRoot.querySelector('[data-key="clear"]').innerText).to.equal('effacer');
	});

	// more: configuring rtl, viewport, media

});

describe('waiting for things', () => {

	it('should default value to 0', async() => {
		/* asynchronous components can implement getUpdateComplete */
		const elem = await fixture(html`<d2l-demo-calculator></d2l-demo-calculator>`);
		expect(elem.value).to.equal('0');
	});

	// more: waiting for events, waitUntil, aTimeout, nextFrame

});

describe('accessibility', () => {

	it('should pass aXe validation', async() => {
		const elem = await fixture(html`<d2l-demo-calculator></d2l-demo-calculator>`);
		await expect(elem).to.be.accessible();
	});

});

describe('mouse & keyboard', () => {

	let elem, input;
	beforeEach(async() => {
		elem = await fixture(html`<d2l-demo-calculator></d2l-demo-calculator>`);
		input = elem.shadowRoot.querySelector('input');
	});

	it('should calculate 1 + 1 using mouse', async() => {
		await clickElem(elem.shadowRoot.querySelector('[data-key="1"]'));
		await clickElem(elem.shadowRoot.querySelector('[data-key="+"]'));
		await clickElem(elem.shadowRoot.querySelector('[data-key="1"]'));
		await clickElem(elem.shadowRoot.querySelector('[data-key="="]'));
		expect(elem.value).to.equal('2');
	});

	it('should calculate 1 + 1 using keyboard', async() => {
		await sendKeysElem(input, 'press', '1');
		await sendKeysElem(input, 'press', '+');
		await sendKeysElem(input, 'press', '1');
		await sendKeysElem(input, 'press', '=');
		expect(elem.value).to.equal('2');
	});

	// more: focusElem, sendKeys, hoverElem, hoverAt, clickAt

});
