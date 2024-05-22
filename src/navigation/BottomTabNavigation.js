import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { APP_ROUTES } from '../constants/routes'
import MainScreen from '../screens/MainScreen'
import ProfileScreen from '../screens/ProfileScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { IconMain, IconProfile } from '../assets/icons/icons'
import { APP_COLORS } from '../constants/colors'
import { strings } from '../localization/localization'

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {

    const routes = [
        {
            name: APP_ROUTES.MAIN_SCREEN,
            component: MainScreen,
            options: {
                tabBarIcon: ({ focused }) => (
                    <IconMain
                        color={focused ? APP_COLORS.PRIMARY_COLOR : APP_COLORS.DIACTIVE_COLOR}
                    />
                ),
                tabBarLabel: strings['Главная'],
                
            }
        },
        {
            name: APP_ROUTES.PROFILE_SCREEN,
            component: ProfileScreen,
            options: {
                tabBarIcon: ({ focused }) => (
                    <IconProfile
                        color={focused ? APP_COLORS.PRIMARY_COLOR : APP_COLORS.DIACTIVE_COLOR}
                    />
                ),
                tabBarLabel: strings['Профиль']
            }
        },
    ]

    return (
        <Tab.Navigator screenOptions={{
            tabBarHideOnKeyboard: true,
            tabBarStyle: {
                backgroundColor: APP_COLORS.BACKGROUND,
                borderTopColor: APP_COLORS.BORDER,
                height: Platform.OS === 'ios' ? bottom + 64 : 64,
            },
            tabBarLabelStyle: { paddingBottom: 10 },
            headerShadowVisible: false,
            title: '',
            tabBarActiveTintColor: APP_COLORS.PRIMARY_COLOR,
            tabBarInactiveTintColor: APP_COLORS.DIACTIVE_COLOR,
            headerTitleAlign: 'center',
            headerShown: false,
        }}>
            {routes?.map((route, routeIndex) => {
                return <Tab.Screen key={routeIndex} {...route} />
            })}
        </Tab.Navigator>
    )
}

export default BottomTabNavigation

const styles = StyleSheet.create({})