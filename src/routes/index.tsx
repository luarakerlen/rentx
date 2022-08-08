import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../hooks/auth';
import { AuthRoutes } from './auth.routes';
import { AppStackRoutes } from './app.stack.routes';
import { AppTabRoutes } from './app.tab.routes';

export function Routes() {
	const {user} = useAuth()
	
	return (
		<NavigationContainer>
			{user ? <AppTabRoutes /> : <AuthRoutes/>}
		</NavigationContainer>
	);
}
