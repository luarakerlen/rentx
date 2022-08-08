import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
	Confirmation,
	SignIn,
	SignUpFirstStep,
	SignUpSecondStep,
	Splash,
} from '../screens';

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
	return (
		<Navigator
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName='Splash'
		>
			<Screen name='Splash' component={Splash} />
			<Screen name='SignIn' component={SignIn} />
			<Screen name='SignUpFirstStep' component={SignUpFirstStep} />
			<Screen name='SignUpSecondStep' component={SignUpSecondStep} />
			<Screen name='Confirmation' component={Confirmation} />
		</Navigator>
	);
}
