import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, MyCars } from '../screens';
import { AppStackRoutes } from './app.stack.routes';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
	return (
		<Navigator
		screenOptions={{
			headerShown: false,
		}}>
			<Screen name='Home' component={AppStackRoutes} />
			<Screen name='MyCars' component={MyCars} />
			{/* <Screen name='Profile' component={Profile} /> */}
		</Navigator>
	);
}
