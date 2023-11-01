const validChars = /^[\d+\-*/().\s]+$/;

export function calculate(expression) {

	if (!validChars.test(expression)) {
		throw new Error('Invalid characters in expression');
	}

	try {
		const val = eval(expression);
		return val;
	} catch (e) {
		return 'ERR';
	}

}
