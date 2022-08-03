import React from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components';

import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';

export function Home() {
	const carData = {
		brand: 'audi',
		name: 'RS 5 Coupé',
		rent: {
			period: 'Ao dia',
			price: 120,
		},
		thumbnail:
			'https://www.pngarts.com/files/3/Audi-Transparent-Background-PNG.png',
	};

	const navigation = useNavigation<any>();

	function handleCarDetails() {
		navigation.navigate('CarDetails')
	}

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
					<TotalCars>Total de 12 carros</TotalCars>
				</HeaderContent>
			</Header>
			<CarList
				data={[1, 2, 3, 4, 5, 6, 7]}
				keyExtractor={(item) => String(item)}
				renderItem={({ item }) => <Car data={carData} onPress={handleCarDetails} />}
			/>
		</Container>
	);
}
