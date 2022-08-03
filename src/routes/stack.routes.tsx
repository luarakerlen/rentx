import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
	CarDetails,
	Home,
	Scheduling,
	SchedulingComplete,
	SchedulingDetails,
} from '../screens';

const { Navigator, Screen } = createNativeStackNavigator();

export function StackRoutes() {
	return (
		<Navigator screenOptions={{
      headerShown: false,
    }}>
			<Screen name='Home' component={Home} />
			<Screen name='CarDetails' component={CarDetails} />
			<Screen name='Scheduling' component={Scheduling} />
			<Screen name='SchedulingDetails' component={SchedulingDetails} />
			<Screen name='SchedulingComplete' component={SchedulingComplete} />
		</Navigator>
	);
}
