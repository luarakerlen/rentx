import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../hooks/auth';
import { AuthRoutes } from './auth.routes';
import { AppStackRoutes } from './app.stack.routes';
import { AppTabRoutes } from './app.tab.routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LoadAnimation } from '../components';

export function Routes() {
	const { user, loading } = useAuth();

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			{loading ? (
				<LoadAnimation />
			) : (
				<NavigationContainer>
					{user.id ? <AppTabRoutes /> : <AuthRoutes />}
				</NavigationContainer>
			)}
		</GestureHandlerRootView>
	);
}
