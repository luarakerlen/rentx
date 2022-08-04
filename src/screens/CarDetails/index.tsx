import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Accessory, BackButton, Button, ImageSlider } from '../../components';

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
	About,
	Accessories,
	Footer,
} from './styles';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils';

interface Params {
	car: CarDTO;
}

export function CarDetails() {
	const navigation = useNavigation<any>();
	const route = useRoute();
	const { car } = route.params as Params;

	function handleChangeRentalPeriod() {
		navigation.navigate('Scheduling', { car });
	}

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
				<About>{car.about}</About>
			</Content>

			<Footer>
				<Button
					title='Escolher período do aluguel'
					onPress={handleChangeRentalPeriod}
				/>
			</Footer>
		</Container>
	);
}
