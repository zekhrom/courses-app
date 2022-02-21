export const dateGenerator = (date) => {
	const newDate = new Date(date);
	const day = newDate.getDay();
	const month = newDate.getMonth();
	const year = newDate.getFullYear();

	return `${day < 10 ? '0' + day : day}.${
		month < 10 ? '0' + month : month
	}.${year}`;
};
