// https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
// assumes n >= 0
function getOrdinalSuffix(n: number) {
	const j = n % 10;
	const k = n % 100;
	if (j === 1 && k !== 11) {
		return "st";
	}
	if (j === 2 && k !== 12) {
		return "nd";
	}
	if (j === 3 && k !== 13) {
		return "rd";
	}
	return "th";
}

const format = new Intl.NumberFormat("en-US");

function thousandSeparator(n: number) {
	return format.format(n);
}

export function formatOrdinal(n: number) {
	return `${thousandSeparator(n)}${getOrdinalSuffix(n)}`;
}
