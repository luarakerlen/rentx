import React from 'react';

import { Container } from './styles';

interface Props {
	active: boolean;
}

export function Bullet({ active }: Props) {
	return <Container active={active}></Container>;
}
