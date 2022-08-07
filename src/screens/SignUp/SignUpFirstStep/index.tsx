import React from 'react';
import {
	Keyboard,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
} from 'react-native';
import { BackButton, Bullet, Button, Input } from '../../../components';

import {
	Container,
	Form,
	FormTitle,
	Header,
	Steps,
	Subtitle,
	Title,
} from './styles';

export function SignUpFirstStep() {
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
						<FormTitle>1. Dados</FormTitle>
						<Input iconName='user' placeholder='Nome' />
						<Input
							iconName='mail'
							placeholder='E-mail'
							keyboardType='email-address'
						/>
						<Input
							iconName='credit-card'
							placeholder='CNH'
							keyboardType='numeric'
						/>
					</Form>

					<Button title='Próximo' />
				</Container>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}
