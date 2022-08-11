import React, { useEffect, useState } from 'react';
import { Button, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';
import { database } from '../../database';
import { Car as ModelCar } from '../../database/model/car';

// import Animated, {
// 	useAnimatedStyle,
// 	useSharedValue,
// 	useAnimatedGestureHandler,
// 	withSpring,
// } from 'react-native-reanimated';

// const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import { api } from '../../services/api';
import Logo from '../../assets/logo.svg';
import { Car, LoadAnimation } from '../../components';

import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';
import { CarDTO } from '../../dtos/CarDTO';

export function Home() {
	const [cars, setCars] = useState<ModelCar[]>([] as ModelCar[]);
	const [isLoading, setIsLoading] = useState(true);

	const netInfo = useNetInfo();
	const navigation = useNavigation<any>();

	// const theme = useTheme();

	// const positionY = useSharedValue(0);
	// const positionX = useSharedValue(0);

	// const myCarsButtonStyle = useAnimatedStyle(() => {
	// 	return {
	// 		transform: [
	// 			{ translateX: positionX.value },
	// 			{ translateY: positionY.value },
	// 		],
	// 	};
	// });

	// const onGestureEvent = useAnimatedGestureHandler({
	// 	onStart(_, ctx: any) {
	// 		ctx.positionX = positionX.value;
	// 		ctx.positionY = positionY.value;
	// 	},

	// 	onActive(event, ctx: any) {
	// 		positionX.value = ctx.positionX + event.translationX;
	// 		positionY.value = ctx.positionY + event.translationY;
	// 	},

	// 	onEnd() {
	// 		positionX.value = withSpring(0);
	// 		positionY.value = withSpring(0);
	// 	},
	// });

	// function handleOpenMyCars() {
	// 	navigation.navigate('MyCars');
	// }

	function handleCarDetails(car: CarDTO) {
		navigation.navigate('CarDetails', { car });
	}

	async function offlineSynchronize() {
		await synchronize({
			database,
			pullChanges: async ({ lastPulledAt }) => {
				const response = await api.get(
					`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
				);

				const { changes, latestVersion } = response.data;
				return { changes, timestamp: latestVersion };
			},
			pushChanges: async ({ changes }) => {
				const user = changes.users;
				if (user.updated.length > 0) {
          await api.post('/users/sync', user);
        }
			},
		});
	}

	useEffect(() => {
		let isMounted = true;

		async function fetchCars() {
			try {
				const carCollection = database.get<ModelCar>('cars');
				const cars = await carCollection.query().fetch();

				if (isMounted) {
					setCars(cars);
				}
			} catch (error) {
				console.log('erro fetchCars: ', error);
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		}

		fetchCars();
		return () => {
			isMounted = false;
		};
	}, []);

	useEffect(() => {
		if(netInfo.isConnected === true) {
			offlineSynchronize()
		}
	}, [netInfo.isConnected])

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
				<LoadAnimation />
			) : (
				<CarList
					data={cars}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<Car data={item} onPress={() => handleCarDetails(item)} />
					)}
				/>
			)}

			{/* BOTÃO FLUTUANTE ANIMADO */}
			{/* <PanGestureHandler onGestureEvent={onGestureEvent}>
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
			</PanGestureHandler> */}
		</Container>
	);
}

// const styles = StyleSheet.create({
// 	button: {
// 		width: 60,
// 		height: 60,
// 		borderRadius: 30,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 	},
// });
