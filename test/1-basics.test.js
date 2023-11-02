import { calculate } from '../src/calculate.js';
import { expect } from '@brightspace-ui/testing';

describe('basics', () => {

	before(() => { /* runs once before all tests in the block */ });
	after(() => { /* runs once after all tests in the block */ });

	beforeEach(() => { /* runs before each test in the block */ });
	afterEach(() => { /* runs after each test in the block */ });

	// BDD-style expect (TDD-style assert also available)
	it('should return the correct value for a simple expression', () => {
		const result = calculate('1+2');
		expect(result).to.equal(3);
	});

	it('should return ERR for an invalid expression', () => {
		const result = calculate('1+2*3+');
		expect(result).to.equal('ERR');
	});

	// don't leave me here forever please
	it.skip('should skip this test for now', () => {
		expect(true).to.be.false;
	});

});
