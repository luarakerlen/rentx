import React, { useState } from 'react';
import {
	Alert,
	Keyboard,
	KeyboardAvoidingView,
	StatusBar,
	TouchableWithoutFeedback,
} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../hooks/auth';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import { BackButton, Button, Input, PasswordInput } from '../../components';

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
	const { user, signOut, updateUser } = useAuth();

	const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
	const [name, setName] = useState(user.name);
	const [avatar, setAvatar] = useState(user.avatar);
	const [driverLicense, setDriverLicense] = useState(user.driver_license);

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

	async function handleProfileUpdate() {
		try {
			const schema = Yup.object().shape({
				driverLicense: Yup.string().required('A CNH é obrigatória'),
				name: Yup.string().required('O nome é obrigatório'),
			});

			const data = { name, driverLicense };
			await schema.validate(data);

			await updateUser({
				id: user.id,
				user_id: user.user_id,
				email: user.email,
				name,
				driver_license: driverLicense,
				avatar,
				token: user.token,
			});

			Alert.alert('Atualizar perfil', 'Perfil atualizado');
		} catch (error) {
			if (error instanceof Yup.ValidationError) {
				Alert.alert('Opa!', error.message);
			} else {
				Alert.alert('Atualizar perfil', 'Não foi possível atualizar o perfil');
			}
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
							<LogoutButton onPress={signOut}>
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

						<Button title='Salvar alterações' onPress={handleProfileUpdate} />
					</Content>
				</Container>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}
