import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import KitchenSink from './src/screens/KitchenSink'

const App = () => {
  return (
    <SafeAreaProvider>
      <KitchenSink />
    </SafeAreaProvider>
  )
}

export default App
