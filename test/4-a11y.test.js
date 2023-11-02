import '../src/calculator.js';
import { expect, fixture, html } from '@brightspace-ui/testing';

describe('accessibility', () => {

	it('should pass aXe validation', async() => {
		const elem = await fixture(html`<d2l-demo-calculator></d2l-demo-calculator>`);
		await expect(elem).to.be.accessible();
	});

});
