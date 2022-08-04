import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Title } from './styles';

interface Props extends RectButtonProps {
	title: string;
	color?: string;
	enable?: boolean;
}

export function Button({ title, color, enabled = true, ...rest }: Props) {
	return (
		<Container
			{...rest}
			color={color}
			enabled={enabled}
			style={{
				opacity: enabled ? 1 : 0.5,
			}}
		>
			<Title>{title}</Title>
		</Container>
	);
}
