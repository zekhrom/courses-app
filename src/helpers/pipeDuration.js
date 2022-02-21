export const pipeDuration = (minutes) => {
	const hh = Math.floor(minutes / 60);
	const mm = minutes % 60;
	return `${hh < 10 ? '0' + hh : hh}:${mm < 10 ? '0' + mm : mm}`;
};
