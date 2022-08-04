import React, { useEffect, useState } from 'react';
import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';

import { Container } from './styles';

export function MyCars() {
	const [cars, setCars] = useState<CarDTO[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchCars() {
			try {
				const response = await api.get(`/schedules_byuser?user_id=1`);
				setCars(response.data);
			} catch (error) {
				console.log('erro ao listar agendamentos', error);
			} finally {
				setIsLoading(false)
			}
		}
		
		fetchCars();
	}, []);

	return <Container></Container>;
}
