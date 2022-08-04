import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Accessory, BackButton, Button, ImageSlider } from '../../components';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { format } from 'date-fns';

import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon, getPlatformDate } from '../../utils';
import { useTheme } from 'styled-components';
import { api } from '../../services/api';

import {
	CarImages,
	Container,
	Header,
	Content,
	Details,
	Description,
	Brand,
	Name,
	Rent,
	Period,
	Price,
	Accessories,
	Footer,
	RentalPeriod,
	CalendarIcon,
	DateInfo,
	DateTitle,
	DateValue,
	RentalPrice,
	RentalPriceLabel,
	RentalPriceDetails,
	RentalPriceQuota,
	RentalPriceTotal,
} from './styles';
import { Alert } from 'react-native';

interface RentalPeriod {
	startFormatted: string;
	endFormatted: string;
}

interface Params {
	car: CarDTO;
	dates: string[];
}

export function SchedulingDetails() {
	const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
		{} as RentalPeriod
	);

	const route = useRoute();
	const { car, dates } = route.params as Params;

	const theme = useTheme();
	const navigation = useNavigation<any>();

	const rentalTotal = Number(dates.length * car.rent.price);

	async function handleConfirmRental() {
		const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

		const unavailable_dates = [
			...schedulesByCar.data.unavailable_dates,
			...dates,
		];

		await api.post('/schedules_byuser', {
			user_id: 1,
			car,
			start_date: rentalPeriod.startFormatted,
			end_date: rentalPeriod.endFormatted,
		});

		api
			.put(`/schedules_bycars/${car.id}`, {
				id: car.id,
				unavailable_dates,
			})
			.then(() => navigation.navigate('SchedulingComplete'))
			.catch(() =>
				Alert.alert('Agendamento', 'Não foi possível confirmar o agendamento.')
			);
	}

	useEffect(() => {
		setRentalPeriod({
			startFormatted: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
			endFormatted: format(
				getPlatformDate(new Date(dates[dates.length - 1])),
				'dd/MM/yyyy'
			),
		});
	}, []);

	return (
		<Container>
			<Header>
				<BackButton />
			</Header>

			<CarImages>
				<ImageSlider imagesUrl={car.photos} />
			</CarImages>

			<Content>
				<Details>
					<Description>
						<Brand>{car.brand}</Brand>
						<Name>{car.name}</Name>
					</Description>

					<Rent>
						<Period>{car.rent.period}</Period>
						<Price>R$ {car.rent.price}</Price>
					</Rent>
				</Details>

				<Accessories>
					{car.accessories.map((accessory) => (
						<Accessory
							key={accessory.type}
							name={accessory.name}
							icon={getAccessoryIcon(accessory.type)}
						/>
					))}
				</Accessories>

				<RentalPeriod>
					<CalendarIcon>
						<Feather
							name='calendar'
							size={RFValue(24)}
							color={theme.colors.shape}
						/>
					</CalendarIcon>
					<DateInfo>
						<DateTitle>DE</DateTitle>
						<DateValue>{rentalPeriod.startFormatted}</DateValue>
					</DateInfo>

					<Feather
						name='chevron-right'
						size={RFValue(10)}
						color={theme.colors.text}
					/>

					<DateInfo>
						<DateTitle>ATÉ</DateTitle>
						<DateValue>{rentalPeriod.endFormatted}</DateValue>
					</DateInfo>
				</RentalPeriod>

				<RentalPrice>
					<RentalPriceLabel>TOTAL</RentalPriceLabel>
					<RentalPriceDetails>
						<RentalPriceQuota>
							R$ {car.rent.price} x{dates.length} diárias
						</RentalPriceQuota>
						<RentalPriceTotal>R$ {rentalTotal}</RentalPriceTotal>
					</RentalPriceDetails>
				</RentalPrice>
			</Content>

			<Footer>
				<Button
					title='Alugar agora'
					color={theme.colors.success}
					onPress={handleConfirmRental}
				/>
			</Footer>
		</Container>
	);
}
