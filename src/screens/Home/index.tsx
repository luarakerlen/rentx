import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

import { api } from '../../services/api';
import Logo from '../../assets/logo.svg';
import { Car, Load } from '../../components';

import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';
import { CarDTO } from '../../dtos/CarDTO';

export function Home() {
	const [cars, setCars] = useState<CarDTO[]>([] as CarDTO[]);
	const [isLoading, setIsLoading] = useState(true);

	const navigation = useNavigation<any>();

	function handleCarDetails(car: CarDTO) {
		navigation.navigate('CarDetails', { car });
	}

	useEffect(() => {
		async function fetchCars() {
			try {
				const response = await api.get('/cars');
				setCars(response.data);
			} catch (error) {
				console.log('erro fetchCars: ', error);
			} finally {
				setIsLoading(false);
			}
		}

		fetchCars();
	}, []);

	return (
		<Container>
			<StatusBar
				barStyle='light-content'
				backgroundColor='transparent'
				translucent
			/>
			<Header>
				<HeaderContent>
					<Logo width={RFValue(108)} height={RFValue(12)} />
					<TotalCars>{`Total de ${cars.length} carros`}</TotalCars>
				</HeaderContent>
			</Header>
			{isLoading ? (
				<Load />
			) : (
				<CarList
					data={cars}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<Car data={item} onPress={() => handleCarDetails(item)} />
					)}
				/>
			)}
		</Container>
	);
}
