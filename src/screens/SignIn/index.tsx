import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
	StatusBar,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
} from 'react-native';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';
import { Button, Input, PasswordInput } from '../../components';
import { useAuth } from '../../hooks/auth';

import { Container, Footer, Form, Header, SubTitle, Title } from './styles';

export function SignIn() {
	const theme = useTheme();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigation = useNavigation<any>();
	const { signIn } = useAuth();

	async function handleSignIn() {
		try {
			const schema = Yup.object().shape({
				password: Yup.string().required('A senha é obrigatória'),
				email: Yup.string()
					.required('E-mail obrigatório!')
					.email('Digite um e-mail válido'),
			});

			await schema.validate({ email, password });

			signIn({ email, password });
		} catch (error) {
			if (error instanceof Yup.ValidationError) {
				Alert.alert('Opa', error.message);
			} else {
				Alert.alert(
					'Erro na autenticação',
					'Ocorreu um erro ao fazer login. Verifique as credenciais'
				);
			}
		}
	}

	function handleNewAccount() {
		navigation.navigate('SignUpFirstStep');
	}

	return (
		<KeyboardAvoidingView behavior='position' enabled>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<Container>
					<StatusBar
						barStyle='dark-content'
						translucent
						backgroundColor='transparent'
					/>
					<Header>
						<Title>
							Estamos{'\n'}
							quase lá.
						</Title>
						<SubTitle>
							Faça seu login para começar{'\n'}
							uma experiência incrível.
						</SubTitle>
					</Header>

					<Form>
						<Input
							iconName='mail'
							placeholder='E-mail'
							keyboardType='email-address'
							autoCorrect={false}
							autoCapitalize='none'
							onChangeText={setEmail}
							value={email}
						/>
						<PasswordInput
							iconName='lock'
							placeholder='Senha'
							onChangeText={setPassword}
							value={password}
						/>
					</Form>

					<Footer>
						<Button
							title='Login'
							onPress={handleSignIn}
							enabled={true}
							isLoading={false}
						/>
						<Button
							title='Criar conta gratuita'
							color={theme.colors.background_secondary}
							onPress={handleNewAccount}
							enabled={true}
							isLoading={false}
							light
						/>
					</Footer>
				</Container>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}
