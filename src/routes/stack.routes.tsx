import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
	CarDetails,
	Home,
	MyCars,
	Scheduling,
	SchedulingComplete,
	SchedulingDetails,
	SignIn,
	SignUpFirstStep,
	SignUpSecondStep,
	Splash,
} from '../screens';

const { Navigator, Screen } = createNativeStackNavigator();

export function StackRoutes() {
	return (
		<Navigator
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName='SignIn'
		>
			<Screen name='SignIn' component={SignIn} />
			<Screen name='SignUpFirstStep' component={SignUpFirstStep} />
			<Screen name='SignUpSecondStep' component={SignUpSecondStep} />
			<Screen
				name='Home'
				component={Home}
				options={{
					gestureEnabled: false,
				}}
			/>
			<Screen name='CarDetails' component={CarDetails} />
			<Screen name='Scheduling' component={Scheduling} />
			<Screen name='SchedulingDetails' component={SchedulingDetails} />
			<Screen name='SchedulingComplete' component={SchedulingComplete} />
			<Screen name='MyCars' component={MyCars} />
		</Navigator>
	);
}
