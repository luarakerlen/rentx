import React from 'react';
import { BackButton, ImageSlider } from '../../components';

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
} from './styles';

export function CarDetails() {
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

				<About>
					Este é automóvel desportivo. Surgiu do lendário touro de lide
					indultado na praça Real Maestranza de Sevilla. É um belíssimo carro
					para quem gosta de acelerar.
				</About>
			</Content>
		</Container>
	);
}
