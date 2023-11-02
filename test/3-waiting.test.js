import '../src/calculator.js';
import { expect, fixture, html } from '@brightspace-ui/testing';

describe('waiting for things', () => {

	it('should default value to 0', async() => {
		const elem = await fixture(html`<d2l-demo-calculator></d2l-demo-calculator>`);
		expect(elem.value).to.equal('0');
	});

	// more: waiting for events, waitUntil, aTimeout, nextFrame

});
