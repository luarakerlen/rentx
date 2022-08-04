import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton, Car, Load } from '../../components';
import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';

import {
	Container,
	Header,
	Subtitle,
	Title,
	Content,
	Appointments,
	AppointmentsTitle,
	AppointmentsQuantity,
} from './styles';

interface CarProps {
	id: string;
	user_is: string;
	car: CarDTO;
}

export function MyCars() {
	const theme = useTheme();

	const [cars, setCars] = useState<CarProps[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchCars() {
			try {
				const response = await api.get(`/schedules_byuser?user_id=1`);
				setCars(response.data);
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

			<Content>
				<Appointments>
					<AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
					<AppointmentsQuantity>05</AppointmentsQuantity>
				</Appointments>

				{isLoading ? (
					<Load />
				) : (
					<FlatList
						data={cars}
						keyExtractor={(item) => item.id}
						showsVerticalScrollIndicator={false}
						renderItem={({ item }) => <Car data={item.car} />}
					/>
				)}
			</Content>
		</Container>
	);
}
