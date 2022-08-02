import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	background-color: ${({theme}) => theme.colors.background_secondary};
`;

export const Header = styled.View`
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
`;