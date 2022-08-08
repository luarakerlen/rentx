import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
	Alert,
	Keyboard,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from 'styled-components';

import { BackButton, Bullet, Button, PasswordInput } from '../../../components';
import { api } from '../../../services/api';

import {
	Container,
	Form,
	FormTitle,
	Header,
	Steps,
	Subtitle,
	Title,
} from './styles';

interface Params {
	user: {
		name: string;
		email: string;
		driverLicense: string;
	};
}

export function SignUpSecondStep() {
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');

	const theme = useTheme();
	const navigation = useNavigation<any>();
	const route = useRoute();

	const { user } = route.params as Params;

	async function handleRegister() {
		if (!password || !passwordConfirm) {
			return Alert.alert('Opa!', 'Informe a senha e a confirmação');
		}

		if (password !== passwordConfirm) {
			return Alert.alert('Opa!', 'As senhas devem ser iguais');
		}

		await api
			.post('/users', {
				name: user.name,
				email: user.email,
				driver_license: user.driverLicense,
				password,
			})
			.then(() => {
				navigation.navigate('Confirmation', {
					title: 'Conta criada!',
					message: `Agora é só fazer login\ne aproveitar.`,
					nextScreenRoute: 'SignIn',
				});
			})
			.catch(() => {
				Alert.alert('Opa!', 'Não foi possível cadastrar');
			});
	}

	return (
		<KeyboardAvoidingView behavior='position' enabled>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<Container>
					<Header>
						<BackButton />
						<Steps>
							<Bullet />
							<Bullet />
						</Steps>
					</Header>

					<Title>
						Crie sua{'\n'}
						conta
					</Title>
					<Subtitle>
						Faça seu cadastro de{'\n'}
						forma rápida e fácil.
					</Subtitle>

					<Form>
						<FormTitle>2. Senha</FormTitle>
						<PasswordInput
							iconName='lock'
							placeholder='Senha'
							onChangeText={setPassword}
							value={password}
						/>
						<PasswordInput
							iconName='lock'
							placeholder='Repetir senha'
							onChangeText={setPasswordConfirm}
							value={passwordConfirm}
						/>
					</Form>

					<Button
						title='Cadastrar'
						color={theme.colors.success}
						onPress={handleRegister}
					/>
				</Container>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}
