import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components';

import { Container, Header, HeaderContent, TotalCars } from './styles';

export function Home() {
	const carData1 = {
		brand: 'audi',
		name: 'RS 5 Coupé',
		rent: {
			period: 'Ao dia',
			price: 120,
		},
		thumbnail:
			'https://www.pngarts.com/files/3/Audi-Transparent-Background-PNG.png',
	};

	const carData2 = {
		brand: 'porsche',
		name: 'Panamera',
		rent: {
			period: 'Ao dia',
			price: 340,
		},
		thumbnail:
			'https://www.webmotors.com.br/imagens/prod/348928/PORSCHE_PANAMERA_2.9_V6_EHYBRID_4_PLATINUM_EDITION_PDK_34892815305718989.webp?s=fill&w=130&h=97&q=70&t=true)',
	};

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
			<Car data={carData1} />
			<Car data={carData2} />
		</Container>
	);
}
