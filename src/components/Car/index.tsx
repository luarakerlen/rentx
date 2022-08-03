import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import GasolineSvg from '../../assets/gasoline.svg';
import { CarDTO } from '../../dtos/CarDTO';

import {
	About,
	Brand,
	CarImage,
	Container,
	Details,
	Name,
	Period,
	Price,
	Rent,
	Type,
} from './styles';

interface Props extends RectButtonProps {
	data: CarDTO;
}

export function Car({ data, ...rest }: Props) {
	return (
		<Container {...rest}>
			<Details>
				<Brand>{data.brand}</Brand>
				<Name>{data.name}</Name>

				<About>
					<Rent>
						<Period>{data.rent.period}</Period>
						<Price>{`R$ ${data.rent.price}`}</Price>
					</Rent>

					<Type>
						<GasolineSvg />
					</Type>
				</About>
			</Details>

			<CarImage
				source={{
					uri: data.thumbnail,
				}}
				resizeMode='contain'
			/>
		</Container>
	);
}
