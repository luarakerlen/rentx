import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Container, IconContainer, InputText } from './styles';
import { useTheme } from 'styled-components';
import { BorderlessButton } from 'react-native-gesture-handler';

interface Props extends TextInputProps {
	iconName: React.ComponentProps<typeof Feather>['name'];
}

export function PasswordInput({ iconName, ...rest }: Props) {
	const theme = useTheme();

	const [isPasswordVisible, setIsPasswordVisible] = useState(true);

	function handlePasswordVisibilityChange() {
		setIsPasswordVisible((prevState) => !prevState);
	}

	return (
		<Container>
			<IconContainer>
				<Feather name={iconName} size={24} color={theme.colors.text_detail} />
			</IconContainer>
			<InputText {...rest} secureTextEntry={isPasswordVisible} />

			<BorderlessButton onPress={handlePasswordVisibilityChange}>
				<IconContainer>
					<Feather
						name={isPasswordVisible ? 'eye' : 'eye-off'}
						size={24}
						color={theme.colors.text_detail}
					/>
				</IconContainer>
			</BorderlessButton>
		</Container>
	);
}
