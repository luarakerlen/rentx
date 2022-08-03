import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Accessory, BackButton, Button, ImageSlider } from '../../components';

import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';

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

export function CarDetails() {
	const navigation = useNavigation<any>();

	function handleChangeRentalPeriod() {
		navigation.navigate('Scheduling');
	}

	return (
		<Container>
			<Header>
				<BackButton onPress={() => {}} />
			</Header>

			<CarImages>
				<ImageSlider
					imagesUrl={[
						'https://www.pngarts.com/files/3/Audi-Transparent-Background-PNG.png',
					]}
				/>
			</CarImages>

			<Content>
				<Details>
					<Description>
						<Brand>Lamburghini</Brand>
						<Name>Huracan</Name>
					</Description>

					<Rent>
						<Period>Ao dia</Period>
						<Price>R$ 580</Price>
					</Rent>
				</Details>

				<Accessories>
					<Accessory name='380Km/h' icon={speedSvg} />
					<Accessory name='3.2s' icon={accelerationSvg} />
					<Accessory name='800 HP' icon={forceSvg} />
					<Accessory name='Gasolina' icon={gasolineSvg} />
					<Accessory name='Auto' icon={exchangeSvg} />
					<Accessory name='2 pessoas' icon={peopleSvg} />
				</Accessories>

				<About>
					Este é automóvel desportivo. Surgiu do lendário touro de lide
					indultado na praça Real Maestranza de Sevilla. É um belíssimo carro
					para quem gosta de acelerar.
				</About>
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
