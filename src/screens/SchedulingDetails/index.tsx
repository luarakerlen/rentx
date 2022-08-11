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
import { Alert, StatusBar } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';

interface RentalPeriod {
	startFormatted: string;
	endFormatted: string;
}

interface Params {
	car: CarDTO;
	dates: string[];
}

export function SchedulingDetails() {
	const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);

	const netInfo = useNetInfo();
	const [isLoading, setIsLoading] = useState(false);
	const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
		{} as RentalPeriod
	);

	const route = useRoute();
	const { car, dates } = route.params as Params;

	const theme = useTheme();
	const navigation = useNavigation<any>();

	const rentalTotal = Number(dates.length * car.price);

	async function handleConfirmRental() {
		setIsLoading(true);

		// const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

		// const unavailable_dates = [
		// 	...schedulesByCar.data.unavailable_dates,
		// 	...dates,
		// ];

		await api
			.post('rentals', {
				user_id: 1,
				car_id: car.id,
				start_date: new Date(dates[0]),
				end_date: new Date(dates[dates.length - 1]),
				total: rentalTotal,
			})
			.then(() =>
				navigation.navigate('Confirmation', {
					title: 'Carro alugado!',
					message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.`,
					nextScreenRoute: 'Home',
				})
			)
			.catch(() => {
				Alert.alert('Agendamento', 'Não foi possível confirmar o agendamento.');
				setIsLoading(false);
			});
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

	useEffect(() => {
		async function fetchCarUpdated() {
			const response = await api.get(`/cars/${car.id}`);
			setCarUpdated(response.data);
		}

		if (netInfo.isConnected === true) {
			fetchCarUpdated();
		}
	}, [netInfo.isConnected]);

	return (
		<Container>
			<StatusBar
				barStyle='dark-content'
				backgroundColor='transparent'
				translucent
			/>
			<Header>
				<BackButton />
			</Header>

			<CarImages>
				<ImageSlider
					imagesUrl={
						!!carUpdated.photos
							? carUpdated.photos
							: [{ id: car.thumbnail, photo: car.thumbnail }]
					}
				/>
			</CarImages>

			<Content>
				<Details>
					<Description>
						<Brand>{car.brand}</Brand>
						<Name>{car.name}</Name>
					</Description>

					<Rent>
						<Period>{car.period}</Period>
						<Price>R$ {car.price}</Price>
					</Rent>
				</Details>

				{carUpdated.accessories && (
					<Accessories>
						{carUpdated.accessories.map((accessory) => (
							<Accessory
								key={accessory.type}
								name={accessory.name}
								icon={getAccessoryIcon(accessory.type)}
							/>
						))}
					</Accessories>
				)}

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
							R$ {car.price} x{dates.length} diárias
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
					enabled={!isLoading}
					isLoading={isLoading}
				/>
			</Footer>
		</Container>
	);
}
