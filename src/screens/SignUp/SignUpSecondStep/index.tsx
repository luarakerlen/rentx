import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
	Keyboard,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton, Bullet, Button, PasswordInput } from '../../../components';

import {
	Container,
	Form,
	FormTitle,
	Header,
	Steps,
	Subtitle,
	Title,
} from './styles';

export function SignUpSecondStep() {
	const theme = useTheme();
	const navigation = useNavigation()

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
						<PasswordInput iconName='lock' placeholder='Senha' />
						<PasswordInput iconName='lock' placeholder='Repetir senha' />
					</Form>

					<Button title='Cadastrar' color={theme.colors.success} />
				</Container>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}
