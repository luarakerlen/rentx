import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import {
	BackButton,
	Button,
	Calendar,
	DayProps,
	generateInterval,
	MarkedDatesProps,
} from '../../components';

import ArrowSvg from '../../assets/arrow.svg';

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
import { StatusBar } from 'react-native';

export function Scheduling() {
	const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
		{} as DayProps
	);
	const [markedDates, setMarkedDates] = useState<MarkedDatesProps>(
		{} as MarkedDatesProps
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
		setMarkedDates(interval)
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
						<DateValueWrapper selected={false}>
							<DateValue>18/06/2021</DateValue>
						</DateValueWrapper>
					</DateInfo>

					<ArrowSvg />

					<DateInfo>
						<DateTitle>ATÉ</DateTitle>
						<DateValueWrapper selected={false}>
							<DateValue></DateValue>
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
