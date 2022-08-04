import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
	CarDetails,
	Home,
	MyCars,
	Scheduling,
	SchedulingComplete,
	SchedulingDetails,
	Splash,
} from '../screens';

const { Navigator, Screen } = createNativeStackNavigator();

export function StackRoutes() {
	return (
		<Navigator
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName='Splash'
		>
			<Screen name='Splash' component={Splash} />
			<Screen name='Home' component={Home} />
			<Screen name='CarDetails' component={CarDetails} />
			<Screen name='Scheduling' component={Scheduling} />
			<Screen name='SchedulingDetails' component={SchedulingDetails} />
			<Screen name='SchedulingComplete' component={SchedulingComplete} />
			<Screen name='MyCars' component={MyCars} />
		</Navigator>
	);
}
