import React from 'react';
import { APP_ROUTES } from '../constants/routes';
import SplashScreen from '../screens/SplashScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import BottomTabNavigation from './BottomTabNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { strings } from '../localization/localization';
import { APP_THEME } from '../constants/theme';
import CardScreens from '../screens/CardScreens';
import TestScreens from '../screens/TestScreens';
import EditProfileScreen from '../screens/EditProfileScreen';
import SameCardScreen from '../screens/SameCardScreen';
import EnterTextTest from '../screens/EnterTextTest';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {

    const routes = [
        {
            name: APP_ROUTES.SPLASH_SCREEN,
            component: SplashScreen,
            options: {
                headerShown: false,
            },
        },
        {
            name: APP_ROUTES.REGISTRATION_SCREEN,
            component: RegistrationScreen,
            options: {
                headerShown: false,
            }
        },
        {
            name: APP_ROUTES.BOTTOM_TAB,
            component: BottomTabNavigation,
            options: {
                headerShown: false,
            },
        },
        {
            name: APP_ROUTES.CARD_SCREEM,
            component: CardScreens,
            options: {
                title: '',
            },
        },
        {
            name: APP_ROUTES.TEST_SCREEN,
            component: TestScreens,
            options: {
                title: '',
            },
        },
        {
            name: APP_ROUTES.SAME_CARD_SCREEN,
            component: SameCardScreen,
            options: {
                title: '',
            },
        },
        {
            name: APP_ROUTES.EDIT_PROFILE_SCREEN,
            component: EditProfileScreen,
            options: {
                title: '',
            },
        },
        {
            name: APP_ROUTES.ENTER_TEXT_TEST,
            component: EnterTextTest,
            options: {
                title: '',
            },
        },
    ];


    return (
        <NavigationContainer>
            <Stack.Navigator theme={APP_THEME} screenOptions={{
                headerTitleAlign: 'center',
                headerBackTitleVisible: false,
            }}>
                {routes?.map((route, routeIndex) => {
                    return <Stack.Screen key={routeIndex} {...route} />
                })}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigation;
