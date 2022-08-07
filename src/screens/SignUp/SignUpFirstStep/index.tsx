import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
	Alert,
	Keyboard,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
} from 'react-native';
import * as Yup from 'yup';

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
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [driverLicense, setDriverLicense] = useState('');

	const navigation = useNavigation<any>();

	async function handleNextStep() {
		try {
			const schema = Yup.object().shape({
				driverLicense: Yup.string().required('A CNH é obrigatória'),
				email: Yup.string()
					.required('O e-mail é obrigatório')
					.email('Digite um e-mail válido'),
				name: Yup.string().required('O nome é obrigatório'),
			});

			const data = { name, email, driverLicense };
			await schema.validate(data);

			navigation.navigate('SignUpSecondStep', { user: data });
		} catch (error) {
			if (error instanceof Yup.ValidationError) {
				return Alert.alert('Opa!', error.message);
			} else {
				Alert.alert('Erro!', 'Ocorreu um erro. Tente novamente.');
			}
		}
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
						<FormTitle>1. Dados</FormTitle>
						<Input
							iconName='user'
							placeholder='Nome'
							onChangeText={setName}
							value={name}
						/>
						<Input
							iconName='mail'
							placeholder='E-mail'
							keyboardType='email-address'
							autoCapitalize='none'
							onChangeText={setEmail}
							value={email}
						/>
						<Input
							iconName='credit-card'
							placeholder='CNH'
							keyboardType='numeric'
							onChangeText={setDriverLicense}
							value={driverLicense}
						/>
					</Form>

					<Button title='Próximo' onPress={handleNextStep} />
				</Container>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}
