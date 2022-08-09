import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import { BackButton } from '../../components';

import {
	Container,
	Header,
	HeaderTop,
	HeaderTitle,
	LogoutButton,
	PhotoContainer,
	Photo,
	PhotoButton,
} from './styles';

export function Profile() {
	const theme = useTheme();

	function handleLogout() {}

	return (
		<Container>
			<StatusBar
				barStyle='light-content'
				translucent
				backgroundColor='transparent'
			/>
			<Header>
				<HeaderTop>
					<BackButton color={theme.colors.shape} />
					<HeaderTitle>Editar Perfil</HeaderTitle>
					<LogoutButton onPress={handleLogout}>
						<Feather name='power' size={24} color={theme.colors.shape} />
					</LogoutButton>
				</HeaderTop>

				<PhotoContainer>
					<Photo source={{uri: 'https://avatars.githubusercontent.com/u/26902816?v=4'}}/>
					<PhotoButton onPress={() => {}}>
						<Feather name='camera' size={24} color={theme.colors.shape}/>
					</PhotoButton>
				</PhotoContainer>
			</Header>
		</Container>
	);
}
