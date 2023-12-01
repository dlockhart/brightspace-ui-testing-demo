import '../src/calculator.js';
import { expect, fixture, html, sendKeysElem } from '@brightspace-ui/testing';

describe('input', () => {

	it('should remove the last digit when backspace is pressed', async() => {
		const elem = await fixture(html`<d2l-demo-calculator></d2l-demo-calculator>`);
		const input = elem.shadowRoot.querySelector('input');
		await sendKeysElem(input, 'type', '1234');
		await sendKeysElem(input, 'press', 'Backspace');
		await sendKeysElem(input, 'press', 'Backspace');
		expect(elem.value).to.equal('12');
	});

});
