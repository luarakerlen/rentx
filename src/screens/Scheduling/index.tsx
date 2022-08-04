import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { format } from 'date-fns';
import { getPlatformDate } from '../../utils';

import ArrowSvg from '../../assets/arrow.svg';

import {
	BackButton,
	Button,
	Calendar,
	DayProps,
	generateInterval,
	MarkedDatesProps,
} from '../../components';

import {
	Container,
	Header,
	Title,
	RentalPeriod,
	DateInfo,
	DateTitle,
	DateValueWrapper,
	DateValue,
	Content,
	Footer,
} from './styles';

interface RentalPeriod {
	start: number;
	startFormatted: string;
	end: number;
	endFormatted: string;
}

export function Scheduling() {
	const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
		{} as DayProps
	);
	const [markedDates, setMarkedDates] = useState<MarkedDatesProps>(
		{} as MarkedDatesProps
	);
	const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
		{} as RentalPeriod
	);

	const theme = useTheme();
	const navigation = useNavigation<any>();

	function handleConfirmRental() {
		navigation.navigate('SchedulingDetails');
	}

	function handleChangeDate(date: DayProps) {
		let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
		let end = date;

		if (start.timestamp > end.timestamp) {
			start = end;
			end = start;
		}

		setLastSelectedDate(end);
		const interval = generateInterval(start, end);
		setMarkedDates(interval);

		setRentalPeriod({
			start: start.timestamp,
			end: end.timestamp,
			startFormatted: format(
				getPlatformDate(new Date(start.dateString)),
				'dd/MM/yyyy'
			),
			endFormatted: format(
				getPlatformDate(new Date(end.dateString)),
				'dd/MM/yyyy'
			),
		});
	}

	return (
		<Container>
			<Header>
				<StatusBar
					barStyle='light-content'
					translucent
					backgroundColor='transparent'
				/>
				<BackButton color={theme.colors.shape} />
				<Title>
					Escolha uma {'\n'}
					data de início e {'\n'}
					fim do aluguel
				</Title>

				<RentalPeriod>
					<DateInfo>
						<DateTitle>DE</DateTitle>
						<DateValueWrapper selected={!!rentalPeriod.startFormatted}>
							<DateValue>{rentalPeriod.startFormatted}</DateValue>
						</DateValueWrapper>
					</DateInfo>

					<ArrowSvg />

					<DateInfo>
						<DateTitle>ATÉ</DateTitle>
						<DateValueWrapper selected={!!rentalPeriod.endFormatted}>
							<DateValue>{rentalPeriod.endFormatted}</DateValue>
						</DateValueWrapper>
					</DateInfo>
				</RentalPeriod>
			</Header>

			<Content>
				<Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
			</Content>

			<Footer>
				<Button title='Confirmar' onPress={handleConfirmRental} />
			</Footer>
		</Container>
	);
}
