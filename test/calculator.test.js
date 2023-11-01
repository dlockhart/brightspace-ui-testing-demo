import '../src/calculator.js';
import { expect, fixture, html } from '@brightspace-ui/testing';
import { calculate } from '../src/calculate.js';

describe('calculate', () => {

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

describe('Calculator', () => {

	it('should pass all aXe tests', async() => {
		const el = await fixture(html`<d2l-demo-calculator></d2l-demo-calculator>`);
		await expect(el).to.be.accessible();
	});

});
