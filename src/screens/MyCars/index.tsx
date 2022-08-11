import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton, Car, LoadAnimation } from '../../components';
import { api } from '../../services/api';
import { AntDesign } from '@expo/vector-icons';
import { Car as ModelCar } from '../../database/model/car';

import {
	Container,
	Header,
	Subtitle,
	Title,
	Content,
	Appointments,
	AppointmentsTitle,
	AppointmentsQuantity,
	CarWrapper,
	CarFooter,
	CarFooterTitle,
	CarFooterPeriod,
	CarFooterDate,
} from './styles';
import { format, parseISO } from 'date-fns';
import { useIsFocused } from '@react-navigation/native';

interface DataProps {
	id: string;
	car: ModelCar;
	start_date: string;
	end_date: string;
}

export function MyCars() {
	const theme = useTheme();
	const screenIsFocus = useIsFocused();

	const [appointments, setAppointments] = useState<DataProps[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchCars() {
			try {
				const response = await api.get(`rentals`);
				const dataFormatted = response.data.map((data: DataProps) => {
					return {
						id: data.id,
						car: data.car,
						start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
						end_date: format(parseISO(data.end_date), 'dd/MM/yyyy'),
					};
				});

				setAppointments(dataFormatted);
			} catch (error) {
				console.log('erro ao listar agendamentos', error);
			} finally {
				setIsLoading(false);
			}
		}

		fetchCars();
	}, [screenIsFocus]);

	return (
		<Container>
			<Header>
				<StatusBar
					barStyle='light-content'
					translucent
					backgroundColor='transparent'
				/>
				<BackButton color={theme.colors.shape} />
				<Title>Seus agendamentos estão aqui.</Title>
				<Subtitle>Conforto, segurança e praticidade.</Subtitle>
			</Header>

			{isLoading ? (
				<LoadAnimation />
			) : (
				<Content>
					<Appointments>
						<AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
						<AppointmentsQuantity>{appointments.length}</AppointmentsQuantity>
					</Appointments>

					<FlatList
						data={appointments}
						keyExtractor={(item) => item.id}
						showsVerticalScrollIndicator={false}
						renderItem={({ item }) => (
							<CarWrapper>
								<Car data={item.car} />
								<CarFooter>
									<CarFooterTitle>Período</CarFooterTitle>
									<CarFooterPeriod>
										<CarFooterDate>{item.start_date}</CarFooterDate>
										<AntDesign
											name='arrowright'
											color={theme.colors.title}
											style={{ marginHorizontal: 10 }}
										/>
										<CarFooterDate>{item.end_date}</CarFooterDate>
									</CarFooterPeriod>
								</CarFooter>
							</CarWrapper>
						)}
					/>
				</Content>
			)}
		</Container>
	);
}
