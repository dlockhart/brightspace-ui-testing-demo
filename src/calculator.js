import { css, html, LitElement } from 'lit';
import { calculate } from './calculate.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

class Calculator extends LitElement {

	static get properties() {
		return {
			value: { state: true, type: String },
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
				padding: 30px;
			}
			:host([hidden]) {
				display: none;
			}
			button {
				background-color: #f1f4f5;
				color: #040101;
			}
			button:hover {
				background-color: #ffffff;
			}
			button:focus-visible {
				box-shadow: 0 0 0 2px #45535c, 0 0 0 4px #fa9719;
				outline: none;
			}
			button.action {
				background-color: #fa9719;
			}
			button.action:hover {
				background-color: #ffb720;
			}
			button.action:focus-visible {
				box-shadow: none;
				outline: 2px solid #ffffff;
			}
			button, input {
				border: none;
				border-radius: 20px;
				font-size: 1.5rem;
				font-weight: bold;
				padding: 10px 20px;
			}
			input {
				background-color: #74dbe6;
				text-align: right;
			}
		`;
	}

	constructor() {
		super();
		this.keys = [
			{ value: 'clear', area: 'clear', action: () => this.value = '0' },
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
			{ value: '=', area: 'equal', action: () => this.value = calculate(this.value) },
			{ value: '0', area: 'zero' },
			{ value: '.', area: 'decimal' }
		];
		this.value = '0';
	}

	render() {
		return html`
			<input type="text" style="grid-area: input" readonly .value="${this.value}" aria-label="value">
			${this.keys.map(key => this._createKey(key))}
		`;
	}

	_createKey(key) {
		const buttonClass = classMap({
			action: key.action
		});
		const action = key.action || (() => {
			if (this.value === '0') {
				this.value = key.value;
			} else {
				this.value += key.value;
			}
		});
		return html`<button type="button" style="grid-area: ${key.area}" class="${ifDefined(buttonClass)}" @click="${action}">${key.value}</button>`;
	}

}
customElements.define('d2l-demo-calculator', Calculator);
