import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
	CarDetails,
	Home,
	Scheduling,
	Confirmation,
	SchedulingDetails,
} from '../screens';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppStackRoutes() {
	return (
		<Navigator
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName='Home'
		>
			<Screen name='Home' component={Home} />
			<Screen name='CarDetails' component={CarDetails} />
			<Screen name='Scheduling' component={Scheduling} />
			<Screen name='SchedulingDetails' component={SchedulingDetails} />
			<Screen name='Confirmation' component={Confirmation} />
		</Navigator>
	);
}
