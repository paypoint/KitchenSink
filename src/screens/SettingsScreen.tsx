import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { AppText } from '../components/AppText'
import { TopBar } from '../components/topbar/TopBar'

const SettingsScreen = () => {
    const navigation = useNavigation<DrawerNavigationProp<any>>()

    return (
        <SafeAreaView style={styles.container}>
            <TopBar
                title='Settings'
                onBack={() => navigation.goBack()}
            />
            <View style={styles.content}>
                <AppText>SettingsScreen</AppText>
            </View>
        </SafeAreaView>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})