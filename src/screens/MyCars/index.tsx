import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton, Car, LoadAnimation } from '../../components';
import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';
import { AntDesign } from '@expo/vector-icons';

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

interface AppointmentsProps {
	id: string;
	user_is: string;
	car: CarDTO;
	start_date: string;
	end_date: string;
}

export function MyCars() {
	const theme = useTheme();

	const [appointments, setAppointments] = useState<AppointmentsProps[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchCars() {
			try {
				const response = await api.get(`/schedules_byuser?user_id=1`);
				setAppointments(response.data);
			} catch (error) {
				console.log('erro ao listar agendamentos', error);
			} finally {
				setIsLoading(false);
			}
		}

		fetchCars();
	}, []);

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
