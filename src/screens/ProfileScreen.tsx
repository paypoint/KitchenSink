import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.cnt}>
      <Text>ProfileScreen</Text>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  cnt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  }
})