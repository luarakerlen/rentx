import React, { useState } from 'react';
import {
	StatusBar,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';
import { useTheme } from 'styled-components';
import { Button, Input, PasswordInput } from '../../components';

import { Container, Footer, Form, Header, SubTitle, Title } from './styles';

export function SignIn() {
	const theme = useTheme();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

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
							onPress={() => {}}
							enabled={false}
							isLoading={false}
						/>
						<Button
							title='Criar conta gratuita'
							color={theme.colors.background_secondary}
							onPress={() => {}}
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
