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

// 1000000 -> 1,000,000
export function formatThousands(n: number) {
	return format.format(n);
}

// 1012 -> 1,012th
export function formatOrdinal(n: number) {
	return `${formatThousands(n)}${getOrdinalSuffix(n)}`;
}

export function joinListTimes(ns: number[]) {
	return ns.join(" × ");
}

export function joinListCommas(ns: number[]) {
	return ns.join(", ");
}

export function joinListCommasAnd(ns: number[]) {
	switch (ns.length) {
		case 0:
			return "";
		case 1:
			return ns[0]!.toString();
		case 2:
			return `${ns[0]!} and ${ns[1]}`;
		default:
			return `${ns.slice(0, -1).join(", ")}, and ${ns[ns.length - 1]!}`;
	}
}
