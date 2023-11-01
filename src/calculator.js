import { css, html, LitElement } from 'lit';
import { calculate } from './calculate.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize/localize-mixin.js';

class Calculator extends LocalizeMixin(LitElement) {

	static get properties() {
		return {
			loading: { state: true },
			value: { type: String },
		};
	}

	static get styles() {
		return css`
			:host {
				background-color: #45535c;
				border: 4px solid #1d262d;
				border-radius: 20px;
				display: grid;
				grid-gap: 15px;
				grid-template-areas:
					"input input input input"
					"clear clear divide multiply"
					"seven eight nine subtract"
					"four five six add"
					"one two three equal"
					"zero zero decimal equal";
				grid-template-columns: repeat(4, 1fr);
				min-width: 300px;
				padding: 30px;
			}
			:host([hidden]) {
				display: none;
			}
			button, input {
				border-radius: 15px;
				font-size: 1.5rem;
				font-weight: bold;
				padding: 10px 20px;
			}
			button:disabled {
				opacity: 0.1;
			}
			button {
				background-color: #f1f4f5;
				border: none;
				border-bottom-color: #c2c6c1;
				border-bottom-style: solid;
				border-bottom-width: 6px;
				color: #040101;
			}
			button:hover {
				background-color: #ffffff;
			}
			input:focus-visible, button:focus-visible {
				box-shadow: 0 0 0 2px #45535c, 0 0 0 4px #fa9719;
				outline: none;
			}
			button.action {
				background-color: #fa9719;
				border-bottom-color: #c77216;
			}
			button.action:hover {
				background-color: #ffb720;
			}
			
			input {
				background-color: #74dbe6;
				border: 3px solid #5db0bb;
				margin-bottom: 40px;
				text-align: right;
			}
		`;
	}

	constructor() {
		super();
		this.keys = [
			{ value: 'clear', term: 'clear', area: 'clear', action: () => this._reset() },
			{ value: '/', area: 'divide' },
			{ value: '*', area: 'multiply' },
			{ value: '7', area: 'seven' },
			{ value: '8', area: 'eight' },
			{ value: '9', area: 'nine' },
			{ value: '-', area: 'subtract' },
			{ value: '4', area: 'four' },
			{ value: '5', area: 'five' },
			{ value: '6', area: 'six' },
			{ value: '+', area: 'add' },
			{ value: '1', area: 'one' },
			{ value: '2', area: 'two' },
			{ value: '3', area: 'three' },
			{ value: '=', area: 'equal', aliasKey: 'Enter', action: () => this.value = calculate(this.value).toString() },
			{ value: '0', area: 'zero' },
			{ value: '.', area: 'decimal' }
		];
		this.loading = true;
		this.value = 'Booting up...';
		this._loadingCompletePromise = new Promise(resolve => { this._loadingCompleteResolve = resolve; });
	}

	static get localizeConfig() {
		const langResources = {
			'ar': { 'clear': 'محو' },
			'en': { 'clear': 'clear' },
			'fr': { 'clear': 'effacer' },
		};
		return {
			importFunc: async lang => langResources[lang]
		};
	}

	connectedCallback() {
		super.connectedCallback();
		setTimeout(async() => {
			this.loading = false;
			this._reset();
			await this.updateComplete;
			this._loadingCompleteResolve();
		}, 1000);
	}

	render() {
		const keydown = (e) => this._handleKey(e.key);
		return html`
			<input
				aria-label="value"
				?disabled="${this.loading}"
				@keydown="${keydown}"
				readonly 
				style="grid-area: input"
				type="text"
				.value="${this.value}">
			${this.keys.map(key => this._createKey(key))}
		`;
	}

	getLoadingComplete() {
		return this._loadingCompletePromise;
	}

	_createKey(key) {
		const buttonClass = classMap({
			action: key.action
		});
		const handleClick = (e) => this._handleKey(e.target.dataset.key);
		const text = key.term ? this.localize(key.term) : key.value;
		return html`
			<button
				class="${ifDefined(buttonClass)}"
				@click="${handleClick}"
				data-key="${key.value}"
				?disabled="${this.loading}"
				style="grid-area: ${key.area}"
				type="button">${text}</button>
		`;
	}

	_handleKey(keyValue) {
		if (keyValue === 'Escape') return this._reset();
		const key = this.keys.find(key => key.value === keyValue || key.aliasKey === keyValue);
		if (!key) return;
		const action = key.action || (() => {
			if (this.value === '0' && key.value !== '.') {
				this.value = key.value;
			} else {
				this.value += key.value;
			}
			this.dispatchEvent(new CustomEvent('change', { detail: this.value }));
		});
		action();
	}

	_reset() {
		this.value = '0';
	}

}
customElements.define('d2l-demo-calculator', Calculator);
