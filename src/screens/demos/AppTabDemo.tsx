import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppTabView } from '../../components/tabs/AppTabView'

import HomeScreen from '../HomeScreen'
import ProfileScreen from '../ProfileScreen'

const AppTabDemo = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppTabView
                tabs={[
                    { key: "tab1", title: "Home", component: HomeScreen },
                    { key: "tab2", title: "Profile", component: ProfileScreen },
                ]}
            />
        </SafeAreaView>

    )
}

export default AppTabDemo

const styles = StyleSheet.create({})