import { focusWithKeyboard, VisualDiff } from '@brightspace-ui/visual-diff';
import puppeteer from 'puppeteer';

describe('calculator', () => {

	const visualDiff = new VisualDiff('calculator', import.meta.url);

	let browser, page;
	const selector = '#calculator';

	before(async() => {
		browser = await puppeteer.launch();
		page = await visualDiff.createPage(browser);
		await page.goto(`${visualDiff.getBaseUrl()}/test/old.visual-diff.html`, { waitUntil: ['networkidle0', 'load'] });
		await page.bringToFront();
	});

	beforeEach(async() => {
		await visualDiff.resetFocus(page);
		await new Promise(resolve => setTimeout(resolve, 1000));
	});

	after(async() => await browser.close());

	it('calculator', async function() {
		const rect = await visualDiff.getRect(page, selector);
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

	it('focus display', async function() {
		await page.$eval(selector, elem => {
			const input = elem.shadowRoot.querySelector('input');
			input.focus();
		});
		const rect = await visualDiff.getRect(page, selector);
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

	it('focus clear', async function() {
		await focusWithKeyboard(page, [selector, 'button[data-key="clear"]']);
		const rect = await visualDiff.getRect(page, selector);
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

	it('click 5', async function() {
		await page.$eval(selector, elem => {
			const fiveButton = elem.shadowRoot.querySelector('button[data-key="5"]');
			fiveButton.click();
		});
		const rect = await visualDiff.getRect(page, selector);
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

});
