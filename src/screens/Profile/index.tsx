import React, { useState } from 'react';
import {
	Keyboard,
	KeyboardAvoidingView,
	StatusBar,
	TouchableWithoutFeedback,
} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../hooks/auth';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import { BackButton, Input, PasswordInput } from '../../components';

import {
	Container,
	Header,
	HeaderTop,
	HeaderTitle,
	LogoutButton,
	PhotoContainer,
	Photo,
	PhotoButton,
	Content,
	Options,
	Option,
	OptionTitle,
	Section,
} from './styles';

export function Profile() {
	const theme = useTheme();
	const { user } = useAuth();

	const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
	const [name, setName] = useState(user.name);
	const [avatar, setAvatar] = useState(user.avatar);
	const [driverLicense, setDriverLicense] = useState(user.driver_license);

	function handleLogout() {}

	function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
		setOption(optionSelected);
	}

	async function handleAvatarSelect() {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 4],
			quality: 1,
		});

		if (result.cancelled) {
			return;
		}

		if (result.uri) {
			setAvatar(result.uri);
		}
	}

	return (
		<KeyboardAvoidingView behavior='position' enabled>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
							{!!avatar && (
								<Photo
									source={{
										uri: avatar,
									}}
								/>
							)}
							<PhotoButton onPress={handleAvatarSelect}>
								<Feather name='camera' size={24} color={theme.colors.shape} />
							</PhotoButton>
						</PhotoContainer>
					</Header>

					<Content
						style={{
							marginBottom: useBottomTabBarHeight(),
						}}
					>
						<Options>
							<Option
								onPress={() => handleOptionChange('dataEdit')}
								active={option === 'dataEdit'}
							>
								<OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
							</Option>
							<Option
								onPress={() => handleOptionChange('passwordEdit')}
								active={option === 'passwordEdit'}
							>
								<OptionTitle active={option === 'passwordEdit'}>
									Trocar senha
								</OptionTitle>
							</Option>
						</Options>

						{option === 'dataEdit' ? (
							<Section>
								<Input
									iconName='user'
									placeholder='Nome'
									autoCapitalize='words'
									autoCorrect={false}
									defaultValue={user.name}
									onChangeText={setName}
								/>
								<Input
									iconName='mail'
									editable={false}
									defaultValue={user.email}
								/>
								<Input
									iconName='credit-card'
									placeholder='CNH'
									keyboardType='numeric'
									defaultValue={user.driver_license}
									onChangeText={setDriverLicense}
								/>
							</Section>
						) : (
							<Section>
								<PasswordInput iconName='lock' placeholder='Senha atual' />
								<PasswordInput iconName='lock' placeholder='Nova senha' />
								<PasswordInput iconName='lock' placeholder='Repetir senha' />
							</Section>
						)}
					</Content>
				</Container>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}
