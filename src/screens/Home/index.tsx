import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';

import Animated, {
	useAnimatedStyle,
	useSharedValue,
	useAnimatedGestureHandler,
	withSpring,
} from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import { api } from '../../services/api';
import Logo from '../../assets/logo.svg';
import { Car, Load } from '../../components';

import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';
import { CarDTO } from '../../dtos/CarDTO';
import { useTheme } from 'styled-components';

export function Home() {
	const theme = useTheme();

	const [cars, setCars] = useState<CarDTO[]>([] as CarDTO[]);
	const [isLoading, setIsLoading] = useState(true);

	const navigation = useNavigation<any>();

	const positionY = useSharedValue(0);
	const positionX = useSharedValue(0);

	const myCarsButtonStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: positionX.value },
				{ translateY: positionY.value },
			],
		};
	});

	const onGestureEvent = useAnimatedGestureHandler({
		onStart(_, ctx: any) {
			ctx.positionX = positionX.value;
			ctx.positionY = positionY.value;
		},

		onActive(event, ctx: any) {
			positionX.value = ctx.positionX + event.translationX;
			positionY.value = ctx.positionY + event.translationY;
		},

		onEnd() {
			positionX.value = withSpring(0);
			positionY.value = withSpring(0);
		},
	});

	function handleCarDetails(car: CarDTO) {
		navigation.navigate('CarDetails', { car });
	}

	function handleOpenMyCars() {
		navigation.navigate('MyCars');
	}

	useEffect(() => {
		async function fetchCars() {
			try {
				const response = await api.get('/cars');
				setCars(response.data);
			} catch (error) {
				console.log('erro fetchCars: ', error);
			} finally {
				setIsLoading(false);
			}
		}

		fetchCars();
	}, []);

	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', () => {
			return true;
		});
	}, []);

	return (
		<Container>
			<StatusBar
				barStyle='light-content'
				backgroundColor='transparent'
				translucent
			/>
			<Header>
				<HeaderContent>
					<Logo width={RFValue(108)} height={RFValue(12)} />
					{!isLoading && (
						<TotalCars>{`Total de ${cars.length} carros`}</TotalCars>
					)}
				</HeaderContent>
			</Header>
			{isLoading ? (
				<Load />
			) : (
				<CarList
					data={cars}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<Car data={item} onPress={() => handleCarDetails(item)} />
					)}
				/>
			)}

			<PanGestureHandler onGestureEvent={onGestureEvent}>
				<Animated.View
					style={[
						myCarsButtonStyle,
						{
							position: 'absolute',
							bottom: 13,
							right: 22,
						},
					]}
				>
					<ButtonAnimated
						onPress={handleOpenMyCars}
						style={[styles.button, { backgroundColor: theme.colors.main }]}
					>
						<Ionicons
							name='ios-car-sport'
							size={32}
							color={theme.colors.shape}
						/>
					</ButtonAnimated>
				</Animated.View>
			</PanGestureHandler>
		</Container>
	);
}

const styles = StyleSheet.create({
	button: {
		width: 60,
		height: 60,
		borderRadius: 30,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
