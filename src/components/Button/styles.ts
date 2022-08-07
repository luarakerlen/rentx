import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface ButtonProps {
	color: string | undefined;
}

interface ButtonTextProps {
	light: boolean;
}

export const Container = styled(RectButton)<ButtonProps>`
	margin-bottom: 8px;
	width: 100%;
	padding: 19px;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme, color }) =>
		color ? color : theme.colors.main};
`;

export const Title = styled.Text<ButtonTextProps>`
	font-family: ${({ theme }) => theme.fonts.primary_500};
	color: ${({ theme, light }) =>
		light ? theme.colors.header : theme.colors.shape};
	font-size: ${RFValue(15)}px;
`;
