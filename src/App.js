/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-02 11:13
 */
import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Provider } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import store from './stores/index'
import NavigationBar from './components/NavigationBar'
import Icons from './components/Icons'
import { COLORS_WHITE } from './configs'
import HeaderTitle, { TAB_BUTTON_WIDTH } from './components/HeaderTitle'
import { HeadLeftBackButton, HeadRightBackButton } from './components/HeadBackButtons'
/** pages */
import Home from './pages/Home'
import Profile from './pages/Profile'
import Detail from './pages/Detail'
import Settings from './pages/Settings'
import DLSelection from './pages/DLSelection'
import DLSorting from './pages/DLSorting'
import Search from './pages/Search'
import Favorite from './pages/Favorite'

const Stack = createStackNavigator()

export default class App extends Component {
    constructor (props) {
        super(props)
        // disable warning
        console.disableYellowBox = true
    }

    handleHomeOptions ({ navigation, route }) {
        return {
            title: 'Github',
            headerLeft: () => {
                return <TouchableOpacity
                    style={styles.tabButtonWrapper}
                    onPress={_ => navigation.navigate('Settings')}
                >
                    <Icons
                        name="setting"
                        style={styles.tabButtonIcon}
                    />
                </TouchableOpacity>
            },
            headerRight: () => {
                return <TouchableOpacity
                    style={{
                        height: '100%',
                        width: TAB_BUTTON_WIDTH,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={_ => navigation.navigate('Search')}
                >
                    <Icons
                        name="search"
                        style={{ color: '#fff', fontSize: 24, opacity: 0.4 }}
                    />
                </TouchableOpacity>
            }
        }
    }

    handleDetailOptions ({ navigation, route }) {
        let title = null
        let params = route.params || {}
        if (route.name === 'Detail') {
            title = params.headerTitle || params.title || null
        }
        return {
            headerTitle () {
                return <HeaderTitle title={title}/>
            },
            headerBackTitleVisible: false,
            headerLeft: () => {
                return <HeadLeftBackButton navigation={navigation} route={route}/>
            },
            headerRight: () => {
                return <HeadRightBackButton navigation={navigation} route={route}/>
            }
        }
    }

    handleDLOptions ({ route }) {
        let title = route.params.headerTitle
        return {
            headerTitle () {
                return <HeaderTitle title={title}/>
            },
            headerBackTitleVisible: false
        }
    }

    render () {
        return (
            <Provider store={store}>
                <NavigationBar>
                    <Stack.Navigator
                        initialRouteName="Home"
                        screenOptions={{gestureEnabled: false}}
                    >
                        <Stack.Screen
                            name="Home"
                            component={Home}
                            options={this.handleHomeOptions}
                        />
                        <Stack.Screen name="Profile" component={Profile}/>
                        <Stack.Screen
                            name="Detail"
                            component={Detail}
                            options={this.handleDetailOptions}
                        />
                        <Stack.Screen name="Settings" component={Settings}/>
                        <Stack.Screen
                            name="DLSelection"
                            component={DLSelection}
                            options={this.handleDLOptions}
                        />
                        <Stack.Screen
                            name="DLSorting"
                            component={DLSorting}
                            options={this.handleDLOptions}
                        />
                        <Stack.Screen name="Search" component={Search}/>
                        <Stack.Screen name="Favorite" component={Favorite} options={this.handleDLOptions}/>
                    </Stack.Navigator>
                </NavigationBar>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    tabButtonWrapper: {
        height: '100%',
        width: TAB_BUTTON_WIDTH,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabButtonIcon: {
        color: COLORS_WHITE,
        fontSize: 24,
        opacity: 0.4
    }
})