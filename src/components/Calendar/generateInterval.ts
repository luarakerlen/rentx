import { eachDayOfInterval, format } from 'date-fns';
import { MarkedDatesProps, DayProps } from '.';
import { getPlatformDate } from '../../utils';
import theme from '../../styles/theme';

export function generateInterval(start: DayProps, end: DayProps) {
	let interval: MarkedDatesProps = {};

	eachDayOfInterval({
		start: new Date(start.timestamp),
		end: new Date(end.timestamp),
	}).forEach((item) => {
		const date = format(getPlatformDate(item), 'yyyy-MM-dd');

		interval = {
			...interval,
			[date]: {
				color:
					date === start.dateString || date === end.dateString
						? theme.colors.main
						: theme.colors.main_light,
				textColor:
					date === start.dateString || date === end.dateString
						? theme.colors.main_light
						: theme.colors.main,
			},
		};
	});

	return interval;
}
